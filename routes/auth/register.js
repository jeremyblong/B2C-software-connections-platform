const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
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
const StreamChat = require('stream-chat').StreamChat;
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const gemshire = require("../../main.js");
const bcrypt = require("bcrypt");
const axios = require("axios");

const accountSid = 'AC3ef6c21bae251cb9f4677c85e600c2ac';
const authToken = '4a60ae3bfbfc6089b45b654e6138beee';
const client = require('twilio')(accountSid, authToken);


const clientStream = new StreamChat('52zfrbfbqu6r', '2edjpqxk42vkxwjf22n73v5camaj66rmb5ykrz9uywt7bc2b86wedwb8qkt7tftv');
     

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

        const tokenStreamChat = clientStream.createToken(username);

        const key = ec.genKeyPair();

		const publicKey = key.getPublic("hex");
		const privateKey = key.getPrivate("hex");

		console.log("private key is the ", privateKey);

		console.log("public key is ", publicKey);

        const UserData = new User({
            username: username.trim(),
            accountType: accountType.trim(),
            password: password.trim(),
            email: email.toLowerCase().trim(),
            experience: experience.trim(),
            // phoneNumber: phoneNumber.replace(/[- )(]/g,''),
            avatar: generatedID,
            completed_signup: false,
            profilePics: [{
                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                picture: generatedID,
                poster: username,
                id: uuidv4()
            }],
            unique_id: uuidv4(),
            phoneNumber: phoneNumber.trim(),
            get_stream_token: tokenStreamChat,
            blockPublicKey: publicKey,
            blockPrivateKey: privateKey
        });

        const port = req.app.get("PORT");

        console.log("PORTTTTT :", port);
        
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
                    client.verify.services.create({friendlyName: 'My Verify Service'})
                      .then(service => {
                          console.log(service.sid);

                          client.verify.services(service.sid)
                            .verifications
                            .create({to: `+1${phoneNumber}`, channel: 'sms'})
                            .then(async (verification) => {
                                
                                console.log(verification.status);

                                app.set('serviceSid', service.sid); 

                                axios.post(`http://localhost:${port}/transaction/broadcast`, {
                                    amount: 35, 
                                    sender: "00", 
                                    recipient: publicKey
                                }).then(async (resp) => {
                                    console.log(resp);
                                    if (resp) {
                                        axios.get(`http://localhost:${port}/mine`).then((feedback) => {
                                            if (feedback) {
                                                console.log(feedback.data);
                                            }
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                        

                                        // s3 bucket here...
                                        res.json({
                                            message: "Successfully registered!",
                                            data,
                                            image: generatedID,
                                            sid: service.sid
                                        })
        
                                        await clientStream.setUser(
                                            {
                                                id: username,
                                                name: username,
                                                image: `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${generatedID}`,
                                            },
                                            tokenStreamChat,
                                        );
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            });
                    });
                });
            }
        })
    });
});

module.exports = router;
                