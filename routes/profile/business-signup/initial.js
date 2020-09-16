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
    router.post("/", (req, res) => {

        const { username, job_title, category } = req.body;

        const unique = uuidv4();

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {

                if (!user.businessData) {
                    user["businessData"] = {
                        job_postings: [{
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            title: job_title,
                            category,
                            id: unique
                        }]
                    }
                    user.businessSignupPageCompleted = 1;
                } else {
                    user.businessData.job_postings.push({
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        title: job_title,
                        category,
                        id: unique
                    });

                    user.businessSignupPageCompleted = 1;
                }

                collection.save(user);

                res.json({
                    message: "Successfully updated account!",
                    user,
                    id: unique
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