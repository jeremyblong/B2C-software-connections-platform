const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
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

        const {  intro, cover_letter_note, files, otherUser, username, passed_id, firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, action_data } = req.body;

        const collection = db.collection("users");

        console.log("req.body------- :", req.body);

        const generatedID = uuidv4();

        collection.find({ username: { $in: [ username, otherUser ] }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    err,
                    message: "An error occurred..."
                })
            } else {

                const filesArray = [];

                console.log("users !!! ------ :", users);

                for (let index = 0; index < users.length; index++) {
                    const element = users[index];
                    
                    if (element.username === username) {

                        console.log("logged in user... :", element);

                        if (files) {
                            for (let index = 0; index < files.length; index++) {

                                const generatedPictureID = uuidv4();

                                const individual = files[index];

                                console.log("Individual file :", individual);
                                
                                filesArray.push({
                                    title: individual.title,
                                    picture: generatedPictureID
                                });
                                
                                // console.log("file", file);
    
                                const request = new Promise(function(resolve, reject) {
                                    fs.writeFile(`./documents/pdf/${generatedPictureID}`, individual.picture64, { encoding: 'base64' }, (err) => {
                                        console.log('File created');
                                        resolve();
                                    });
                                });
                                 
                                request.then((result) => {
                                    fs.readFile(`./documents/pdf/${generatedPictureID}`, (err, data) => {
                                        if (err) {
                                            console.log(err);
                                            throw err;
                                        } // Something went wrong!
                                        
                                        
                                        s3.putObject({
                                            Body: data,
                                            Bucket: "software-gateway-platform",
                                            Key: generatedPictureID
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
                            if (!element.submitted_applications) {
                                element["submitted_applications"] = [{
                                    title: intro,
                                    cover_letter_message: cover_letter_note,
                                    sender: username,
                                    related_to: passed_id,
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    attachedFiles: filesArray,
                                    accepted: false,
                                    firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                    secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                    thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                    fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                    fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                                }];

                                collection.save(element);
                            } else {
                                element.submitted_applications.push({
                                    title: intro,
                                    cover_letter_message: cover_letter_note,
                                    sender: username,
                                    related_to: passed_id,
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    attachedFiles: filesArray,
                                    accepted: false,
                                    firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                    secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                    thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                    fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                    fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                                });

                                collection.save(element);
                            }

                            if (!element.notifications) {
                                element["notifications"] = [{
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    application_id_linked: generatedID,
                                    action: action_data,
                                    action_taker: username,
                                    action_specific: "applied for a job!",
                                    related_job: action_data.listing_id
                                }];
                                collection.save(element);
                            } else {
                                element.notifications.push({
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    application_id_linked: generatedID,
                                    action: action_data,
                                    action_taker: username,
                                    action_specific: "applied for a job!",
                                    related_job: action_data.listing_id
                                });
                                collection.save(element);
                            }

                            // collection.save(element);
                            
                        } else {
                            if (!element.submitted_applications) {
                                element["submitted_applications"] = [{
                                    title: intro,
                                    cover_letter_message: cover_letter_note,
                                    sender: username,
                                    related_to: passed_id,
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    attachedFiles: filesArray,
                                    accepted: false,
                                    firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                    secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                    thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                    fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                    fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                                }]
                                collection.save(element);
                            } else {
                                element.submitted_applications.push({
                                    title: intro,
                                    cover_letter_message: cover_letter_note,
                                    sender: username,
                                    related_to: passed_id,
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    attachedFiles: filesArray,
                                    accepted: false,
                                    firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                    secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                    thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                    fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                    fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                                });

                                collection.save(element);
                            }

                            if (element.notifications) {
                                element.notifications.push({
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    application_id_linked: generatedID,
                                    action: action_data,
                                    action_taker: username,
                                    action_specific: "applied for a job!",
                                    related_job: action_data.listing_id
                                });
                                collection.save(element);
                                
                            } else {
                                element["notifications"] = [{
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    application_id_linked: generatedID,
                                    action: action_data,
                                    action_taker: username,
                                    action_specific: "applied for a job!",
                                    related_job: action_data.listing_id
                                }];
                                collection.save(element);
                            }

                            collection.save(element);
                        }

                        collection.save(element);
                    } 
                    if (element.username === otherUser) {

                        console.log("OTHER user... :", element);

                        for (let indexxxx = 0; indexxxx < element.businessData.job_postings.length; indexxxx++) {
                            const job = element.businessData.job_postings[indexxxx];

                            if (job.id === passed_id) {
                                console.log("JOB", job);

                                if (!job.responses) {
                                    job["responses"] = [{
                                        title: intro,
                                        cover_letter_message: cover_letter_note,
                                        attachedFiles: filesArray,
                                        sender: username,
                                        id: generatedID,
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        accepted: false,
                                        firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                        secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                        thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                        fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                        fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                                    }]
                                    collection.save(element);
                                } else {
                                    job.responses.push({
                                        title: intro,
                                        cover_letter_message: cover_letter_note,
                                        attachedFiles: filesArray,
                                        sender: username,
                                        id: generatedID,
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        accepted: false,
                                        firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                        secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                        thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                        fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                        fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                                    });

                                    collection.save(element);
                                }
                            }
                            
                        }
                        if (!element.received_applications) {
                            element["received_applications"] = [{
                                title: intro,
                                cover_letter_message: cover_letter_note,
                                sender: username,
                                id: generatedID,
                                related_to: passed_id,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                attachedFiles: filesArray,
                                accepted: false,
                                firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                            }]
                            collection.save(element);
                        } else {
                            element.received_applications.push({
                                title: intro,
                                cover_letter_message: cover_letter_note,
                                sender: username,
                                id: generatedID,
                                related_to: passed_id,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                attachedFiles: filesArray,
                                accepted: false,
                                firstQuestion: firstQuestion !== null ? firstQuestion : null,
                                secondQuestion: secondQuestion !== null ? secondQuestion : null, 
                                thirdQuestion: thirdQuestion !== null ? thirdQuestion : null,
                                fourthQuestion: fourthQuestion !== null ? fourthQuestion : null, 
                                fifthQuestion: fifthQuestion !== null ? fifthQuestion : null
                            })
                            collection.save(element);
                        }

                        if (!element.notifications) {
                            element["notifications"] = [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                application_id_linked: generatedID,
                                action: action_data,
                                action_taker: username,
                                action_specific: "applied for one of your posted jobs!",
                                related_job: action_data.listing_id
                            }];

                            collection.save(element);
                        } else {
                            element.notifications.push({
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                application_id_linked: generatedID,
                                action: action_data,
                                action_taker: username,
                                action_specific: "applied for one of your posted jobs!",
                                related_job: action_data.listing_id
                            });
                            collection.save(element);
                        }
                        collection.save(element);
                    }
                }

                res.json({
                    message: "Found and updated appropriate users!",
                    users
                })
            }
        })
    });
});

module.exports = router;