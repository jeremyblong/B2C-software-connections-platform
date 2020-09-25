const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-west-1.wasabisys.com');
const fs = require("fs");

const accessKeyId = 'J4FR4IVQL0CV0DFTMYBJ';
const secretAccessKey = 'wuUJoRXlWkSpVfPusz5XEf3ijhgvRtbwXc4oFofP';

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: 'us-west-1',
	accessKeyId,
	secretAccessKey
});


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { 
            length_of_project, 
            type_of_dev, 
            poster_location, 
            experience_level, 
            who_can_see, 
            applicant_amount_earned, 
            applicant_success_score, 
            number_of_freelancers, 
            pay_rate, 
            pay_type, 
            talent_type, 
            description, 
            deviceType, 
            platform, 
            web_server_types, 
            database_types, 
            programming_languages, 
            business_size, 
            country, 
            timezone_or_state, 
            preselected, 
            additional_skills, 
            username,
            title, 
            files
        } = req.body;

        const generatedID = uuidv4();

        console.log(req.body);

        const collection = db.collection("users");

	    collection.findOne({ username }).then((user) => {
	    	if (user) {

                if (user.businessData.job_postings) {
                    // IF business job postings exists run this and then run the below chunk IF and only if files are sent too...
                    if (files) {

                        let filesArray = [];
                        
                        for (let index = 0; index < files.length; index++) {

                            const secondaryGeneratedID = uuidv4();

                            const file = files[index];

                            filesArray.push({
                                title: file.title,
                                picture: secondaryGeneratedID
                            });
                            
                            // console.log("file", file);

                            const request = new Promise(function(resolve, reject) {
                                fs.writeFile(`./documents/pdf/${secondaryGeneratedID}`, file.picture64, { encoding: 'base64' }, (err) => {
                                    console.log('File created');
                                    resolve();
                                });
                            });
                             
                            request.then((result) => {
                                fs.readFile(`./documents/pdf/${secondaryGeneratedID}`, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    } // Something went wrong!
                                    
                                    
                                    s3.putObject({
                                        Body: data,
                                        Bucket: "software-gateway-platform",
                                        Key: secondaryGeneratedID
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

                        user.businessData.job_postings.push({
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            title,
                            category: type_of_dev,
                            id: generatedID,
                            description,
                            attachedFiles: filesArray,
                            questions_for_applicant: preselected,
                            length_of_project,
                            platform,
                            database_types,
                            web_server_types,
                            business_size,
                            additional_skills,
                            experience_level, 
                            location_preference: country,
                            preferred_state_timezone: timezone_or_state,
                            visibility: {
                                amount_of_freelancers_required: number_of_freelancers,
                                visibility: who_can_see,
                                minimum_success_score: applicant_success_score,
                                minimum_amount_earned: applicant_amount_earned,
                                agency_or_individual: talent_type
                            },
                            billing: {
                                pay: pay_rate,
                                rate: pay_type,
                                currency: "USD"
                            },
                            programming_languages
                        })

                        collection.save(user);
                    } else {
                        // no files exist
                        user.businessData.job_postings.push({
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            title,
                            category: type_of_dev,
                            id: generatedID,
                            description,
                            attachedFiles: [],
                            questions_for_applicant: preselected,
                            length_of_project,
                            platform,
                            database_types,
                            web_server_types,
                            business_size,
                            additional_skills,
                            experience_level, 
                            location_preference: country,
                            preferred_state_timezone: timezone_or_state,
                            visibility: {
                                amount_of_freelancers_required: number_of_freelancers,
                                visibility: who_can_see,
                                minimum_success_score: applicant_success_score,
                                minimum_amount_earned: applicant_amount_earned,
                                agency_or_individual: talent_type
                            },
                            billing: {
                                pay: pay_rate,
                                rate: pay_type,
                                currency: "USD"
                            },
                            programming_languages
                        })
                        collection.save(user);
                    }
                    // already exists with this specific user!                    
                } else {
                    // create new businessData posting array - NOT existant
                    if (files) {
                        
                        let filesArray = [];

                        for (let index = 0; index < files.length; index++) {

                            const thirGeneratedID = uuidv4();

                            const file = files[index];

                            filesArray.push({
                                title: file.title,
                                picture: thirGeneratedID
                            });
                            
                            // console.log("file", file);

                            const request = new Promise(function(resolve, reject) {
                                fs.writeFile(`./documents/pdf/${thirGeneratedID}`, file.picture64, { encoding: 'base64' }, (err) => {
                                    console.log('File created');
                                    resolve();
                                });
                            });
                             
                            request.then((result) => {
                                fs.readFile(`./documents/pdf/${thirGeneratedID}`, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    } // Something went wrong!
                                    
                                    
                                    s3.putObject({
                                        Body: data,
                                        Bucket: "software-gateway-platform",
                                        Key: thirGeneratedID
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
                        user["businessData"] = {
                            job_postings: [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                title,
                                category: type_of_dev,
                                id: generatedID,
                                description,
                                attachedFiles: filesArray,
                                questions_for_applicant: preselected,
                                length_of_project,
                                platform,
                                database_types,
                                web_server_types,
                                business_size,
                                additional_skills,
                                experience_level, 
                                location_preference: country,
                                preferred_state_timezone: timezone_or_state,
                                visibility: {
                                    amount_of_freelancers_required: number_of_freelancers,
                                    visibility: who_can_see,
                                    minimum_success_score: applicant_success_score,
                                    minimum_amount_earned: applicant_amount_earned,
                                    agency_or_individual: talent_type
                                },
                                billing: {
                                    pay: pay_rate,
                                    rate: pay_type,
                                    currency: "USD"
                                },
                                programming_languages
                            }]
                        }
                        collection.save(user);
                    } else {
                        // no files exist...
                        user["businessData"] = {
                            job_postings: [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                title,
                                category: type_of_dev,
                                id: generatedID,
                                description,
                                attachedFiles: [],
                                questions_for_applicant: preselected,
                                length_of_project,
                                platform,
                                database_types,
                                web_server_types,
                                business_size,
                                additional_skills,
                                experience_level, 
                                location_preference: country,
                                preferred_state_timezone: timezone_or_state,
                                visibility: {
                                    amount_of_freelancers_required: number_of_freelancers,
                                    visibility: who_can_see,
                                    minimum_success_score: applicant_success_score,
                                    minimum_amount_earned: applicant_amount_earned,
                                    agency_or_individual: talent_type
                                },
                                billing: {
                                    pay: pay_rate,
                                    rate: pay_type,
                                    currency: "USD"
                                },
                                programming_languages
                            }]
                        }
                        collection.save(user);
                    }
                }
                
                res.json({
                    message: "ALL logic was executed successfully!",
                    user
                })
            } else {
                res.json({
                    message: "Could NOT find any user by that username"
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