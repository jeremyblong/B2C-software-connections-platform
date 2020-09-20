const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { username } = req.body;

        const collection = db.collection("users");

        const jobArr = [];

        collection.find({
            $and: [
                { completed_signup: true },
                { accountType: "business" }
            ]}).toArray((err, users) => {
            if (err) {
                console.log(err);
                
                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {

                for (let index = 0; index < users.length; index++) {
                    const element = users[index];

                    if (element.businessData && (element.businessData.job_postings)) {
                        for (let i = 0; i < element.businessData.job_postings.length; i++) {
                            const job = element.businessData.job_postings[i];
                            jobArr.push(job);
                        }
                    }
                }
                // console.log("jobarr", jobArr);

                res.json({
                    jobs: jobArr,
                    message: "Successfully found specific users!"
                })
            }
        });
    });
});

module.exports = router;

