const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { username_authenticated_user, username_application, id_application, response_id, action_data } = req.body;

        console.log(req.body);

        const generatedID = uuidv4();

        const collection = db.collection("users");
        // { "businessData.job_postings.id": id_application }
        collection.find({ username: { $in: [ username_authenticated_user, username_application ] }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "An error occurred...",
                    err
                })
            } else {

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    
                    if (user.username === username_authenticated_user) {
                        // console.log("logged-in user data --- :", user);

                        const target = user.businessData.job_postings;

                        for (let index = 0; index < target.length; index++) {
                            const job = target[index];

                            if (job.id === id_application) {
                                console.log("job!", job);

                                for (let indexx = 0; indexx < job.responses.length; indexx++) {
                                    const responseee = job.responses[indexx];
                                    
                                    if (responseee.id === response_id) {
                                        job.responses.splice(indexx, 1);

                                        collection.save(user);
                                    }
                                }
                                console.log("job responess : ", job.responses);
                            }
                            
                        }
                        if (user.received_applications) {
                            for (let indy = 0; indy < user.received_applications.length; indy++) {
                                const application = user.received_applications[indy];
                                if (application.id === response_id) {
                                    user.received_applications.splice(indy, 1);

                                    collection.save(user);
                                }
                            }  
                        } 
                        collection.save(user);
                        // end of authenticated user section
                    }

                    if (user.username === username_application) {
                        // console.log("applicants user --- :", user);
                        if (user.submitted_applications) {
                            for (let idx = 0; idx < user.submitted_applications.length; idx++) {
                                const submitted_app = user.submitted_applications[idx];
                                
                                if (submitted_app.id === response_id) {
                                    // application - matching.... do logic below...
                                    console.log("matching application :", submitted_app);
                                    // change boolean to string of declined to display on client-side
                                    submitted_app.accepted = "DENIED/DECLINED";

                                    collection.save(user);
                                }
                            }
                        }
                        if (!user.notifications) {
                            user["notifications"] = [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                application_id_linked: response_id,
                                action: action_data,
                                action_taker: username_authenticated_user,
                                action_specific: "did not select your application at this current point in time...",
                                related_job: id_application
                            }]
                            collection.save(user);
                        } else {
                            user.notifications.push({
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                application_id_linked: response_id,
                                action: action_data,
                                action_taker: username_authenticated_user,
                                action_specific: "did not select your application at this current point in time...",
                                related_job: id_application
                            });
                            collection.save(user);
                        }

                        
                    }
                }

                res.json({
                    message: "Found and removed selected response!"
                })
            } 
        });
    });
});

module.exports = router;

// for (let indexxx = 0; indexxx < target.length; indexxx++) {
//     const job = target[indexxx];

//     // all logic should go in here... this is the matched application
//     if (job.id === id_application) {
//         // map over responses to remove selected applicant 
//         console.log("job", job);

//         for (let idx = 0; idx < job.responses.length; idx++) {
//             const job_response = job.responses[idx];
            
//             if (job_response.id === response_id) {
//                 // console.log("job_response", job_response);

//                 job.responses.splice(idx, 1);
//             }
//             console.log("responses.... :", job.responses)
//         }
//         // do NOT go outside this scope with ANY logic
//     }
// }

// for (let indexx = 0; indexx < user.received_application.length; indexx++) {
//     const application = user.received_application[indexx];
    
//     if (application.id === response_id) {
//         console.log("application MATCH :", application);
//     }
// }