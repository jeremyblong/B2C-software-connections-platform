const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-west-1.wasabisys.com');
const base64 = require('base64topdf');


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

        const { username, files, id, description } = req.body;

        const collection = db.collection("users");

        // console.log("Req.body ---- ", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {

                const target = user.businessData.job_postings;

                let filesArray = [];

                const first = user.businessData.job_postings[0];

                for (let i = 0; i < target.length; i++) {

                    const element = target[i];
        
                    if (first.id === id) {

                        console.log("match.")

                        for (let index = 0; index < files.length; index++) {

                            const generatedID = uuidv4();

                            const file = files[index];

                            filesArray.push({
                                title: file.title,
                                picture: generatedID
                            });
                            
                            // console.log("file", file);

                            const request = new Promise(function(resolve, reject) {
                                fs.writeFile(`./documents/pdf/${generatedID}`, file.picture64, { encoding: 'base64' }, (err) => {
                                    console.log('File created');
                                    resolve();
                                });
                            });
                             
                            request.then((result) => {
                                fs.readFile(`./documents/pdf/${generatedID}`, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    } // Something went wrong!
                                    
                                    
                                    s3.putObject({
                                        Body: data,
                                        Bucket: "software-gateway-platform",
                                        Key: generatedID
                                    }, (errorr, dataaa) => {
                                        if (errorr) {
                                           console.log(errorr);
                                        }
                                        console.log(dataaa);
                                    });
                                });
                            }, (error) => {
                               //handle
                               console.log(error);
                            });
                        }
                        
                        element.description = description;
                        element.attachedFiles = filesArray;
                        user.businessSignupPageCompleted = 2;
                        
                    } 
                }

                collection.save(user);

                res.json({
                    message: "Successfully updated account!",
                    user
                })
            } else {
                console.log("NO user found.");
                
                res.json({
                    message: "NO user found."
                })
            }
        });
    });
});

module.exports = router;