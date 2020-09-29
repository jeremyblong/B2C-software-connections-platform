const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const fetch = require('node-fetch');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { response, other_user, current_user, related_job, action_data, signed_in, application_id_linked } = req.body;

        const collection = db.collection("users");
        
        console.log("req.body", req.body);

        collection.find({ username: { $in: [ current_user, other_user ] }}).toArray((err, results) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {

                const pending_updated_users = [];

                const newResponseArray = [];

                for (let indexxxxx = 0; indexxxxx < results.length; indexxxxx++) {
                    const specific_user = results[indexxxxx];

                    if (specific_user.username == other_user) {
                        // this is the applicant and/or OTHER user...

                        for (let innnnndex = 0; innnnndex < specific_user.submitted_applications.length; innnnndex++) {
                            const application_inner = specific_user.submitted_applications[innnnndex];
                            
                            if (application_inner.id === response.id) {
                                console.log("VAULLLLLLLLLLLLAHHHHHHHHH application_inner-----", application_inner);
                                // set applications status to "active"
                                application_inner.accepted = true;
                                
                                collection.save(specific_user);
                            }
                            // collection.save(specific_user);
                        }

                        if (specific_user.notifications) {
                            specific_user.notifications.push({
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                application_id_linked,
                                action: action_data,
                                action_taker: signed_in,
                                action_specific: "SELECTED you to be the developer for a job you applied for...!",
                                related_job: related_job
                            })
                            collection.save(specific_user);
                        } else {
                            specific_user["notifications"] = [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                application_id_linked,
                                action: action_data,
                                action_taker: signed_in,
                                action_specific: "SELECTED you to be the developer for a job you applied for...!",
                                related_job: related_job
                            }]
                            collection.save(specific_user);
                        }

                        const body = { id: related_job };
 
                        fetch('http://localhost:5000/gather/posted/job/by/id/specific/job', {
                                method: 'post',
                                body:    JSON.stringify(body),
                                headers: { 'Content-Type': 'application/json' },
                            }).then(res => res.json())
                        .then(json => {
                                // console.log("json", json.job_data.billing);

                                if (specific_user.active_jobs) {
                                    specific_user.active_jobs.push({
                                        start_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        contract_between: [other_user, current_user],
                                        related_job_id: related_job,
                                        billing: json.job_data.billing,
                                        active: true,
                                        initial_data: response
                                    });
                                    collection.save(specific_user);
                                } else {
                                    specific_user["active_jobs"] = [{
                                        start_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        contract_between: [other_user, current_user],
                                        related_job_id: related_job,
                                        billing: json.job_data.billing,
                                        active: true,
                                        initial_data: response
                                    }];
                                    collection.save(specific_user);
                                }

                                // console.log('THE APPLICANT USER:', specific_user);
                        });

                        collection.save(specific_user);
                    }

                    if (specific_user.username === current_user) {
                        // this is our signed in user 

                        const body = { id: related_job };
 
                        fetch('http://localhost:5000/gather/posted/job/by/id/specific/job', {
                                method: 'post',
                                body:    JSON.stringify(body),
                                headers: { 'Content-Type': 'application/json' },
                            }).then(res => res.json())
                        .then(json => {
                                console.log("json", json.job_data.billing);

                                if (specific_user.active_jobs) {
                                    specific_user.active_jobs.push({
                                        start_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        contract_between: [other_user, current_user],
                                        related_job_id: related_job,
                                        billing: json.job_data.billing,
                                        active: true,
                                        initial_data: response
                                    })
                                    collection.save(specific_user);
                                } else {
                                    specific_user["active_jobs"] = [{
                                        start_date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        contract_between: [other_user, current_user],
                                        related_job_id: related_job,
                                        billing: json.job_data.billing,
                                        active: true,
                                        initial_data: response
                                    }]
                                    collection.save(specific_user);
                                }
                        });

                        for (let xxxx = 0; xxxx < specific_user.businessData.job_postings.length; xxxx++) {
                            const job_posting = specific_user.businessData.job_postings[xxxx];

                            // console.log('job_posting', job_posting);
                            
                            if (job_posting.id === related_job) {
                                
                                job_posting.responses.filter((item) => {
                                    if (item.id === response.id) {

                                        console.log("itemmmmmmmmm :", item);

                                        item.accepted = true;

                                        newResponseArray.push(item);
                                    } else {
                                        pending_updated_users.push(item);
                                    }
                                });

                                job_posting.responses = newResponseArray;

                                collection.save(specific_user);
                            }

                            // console.log("JOB_POSTINGGGGGGGGGGGG :", job_posting, newResponseArray);
                        }

                        for (let inddddeexxx = 0; inddddeexxx < specific_user.received_applications.length; inddddeexxx++) {
                            const application_signed = specific_user.received_applications[inddddeexxx];
                            
                            if (application_signed.related_to === related_job && application_signed.sender === other_user) {
                                application_signed.accepted = true;

                                collection.save(specific_user);
                            }
                        }
                        
                    }
                }
                res.json({
                    message: "Successfully started project between BOTH users!",
                    new_responses: newResponseArray
                })
                // console.log("pending_updated_users", pending_updated_users);
            }
        });
    });
});

module.exports = router;