const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const User = require("../../schemas/auth/register.js");
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-west-1.wasabisys.com');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

const accessKeyId = 'J4FR4IVQL0CV0DFTMYBJ';
const secretAccessKey = 'wuUJoRXlWkSpVfPusz5XEf3ijhgvRtbwXc4oFofP';

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: 'us-west-1',
	accessKeyId,
	secretAccessKey
});


// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const generatedID = uuidv4();

        const collection = db.collection("users");

        const { email, accountType, password, username, experience, phoneNumber, avatar } = req.body;

        console.log(req.body);

        const bufferImage = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ""),'base64');

        const UserData = new User({
            username: username.trim(),
            accountType: accountType.trim(),
            password: password.trim(),
            email: email.toLowerCase().trim(),
            experience: experience.trim(),
            // phoneNumber: phoneNumber.replace(/[- )(]/g,''),
            avatar: generatedID,
            profilePics: [{
                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                picture: generatedID,
                poster: username,
                id: uuidv4()
            }],
            phoneNumber: phoneNumber.trim()
        });
        
        UserData.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                s3.putObject({
                    Body: bufferImage,
                    Bucket: "software-gateway-platform",
                    Key: generatedID,
                    ContentEncoding: 'base64'
                }, (errorr, dataaa) => {
                    if (errorr) {
                       console.log(errorr);
                    }
                    console.log(dataaa);
                    res.json({
                        message: "Successfully registered!",
                        data,
                        image: generatedID
                    })
                });
            }
        })
    });
});

module.exports = router;
                