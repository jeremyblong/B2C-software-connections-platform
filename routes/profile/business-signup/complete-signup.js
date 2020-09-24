const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { username, action_data_id, action_data } = req.body;

        const collection = db.collection("users");

        console.log("REQ.body ----- ", req.body);

        const generatedID = uuidv4();

        collection.findOne({ username }).then((user) => {
            if (user) {

                const first = user.businessData.job_postings[0];

                user.completed_signup = true;

                if (!user.notifications) {
                    user["notifications"] = [{
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        application_id_linked: generatedID,
                        action: action_data,
                        action_taker: username,
                        action_specific: "posted a new job upon signing up!",
                        related_job: action_data_id
                    }]
                } else {
                    user.notifications.push({
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        application_id_linked: generatedID,
                        action: action_data,
                        action_taker: username,
                        action_specific: "posted a new job upon signing up!",
                        related_job: action_data_id
                    });
                }

                collection.save(user);

                res.json({
                    message: "Successfully registered user and posted job!",
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