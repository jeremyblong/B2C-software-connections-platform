const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
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

        const { base64, username } = req.body;

        collection.findOne({ username }).then((user) => {
            if (user) {
                
                const bufferImage = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""),'base64');

                user.profilePics.push({
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    picture: generatedID,
                    poster: username,
                    id: uuidv4()
                })

                s3.putObject({
                    Body: bufferImage,
                    Bucket: "software-gateway-platform",
                    Key: generatedID,
                    ContentEncoding: 'base64'
                }, (errorr, dataaa) => {
                    if (errorr) {
                        console.log(errorr);
                    }

                    collection.save(user);
                    
                    res.json({
                        message: "Successfully uploaded new photo!",
                        image: generatedID
                    })
                });
            } else {
                res.json({
                    message: "Could NOT locate any users with this field."
                })
            }
        }).catch((err) => {
            console.log(err);
            res.json({
                err
            })
        })

    });
});

module.exports = router;
                