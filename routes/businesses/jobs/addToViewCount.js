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

        const { id } = req.body;

        const collection = db.collection("users");

        collection.findOne({ "businessData.job_postings.id": id }).then((user) => {
            if (user) {
                console.log("FOUND VIEW COUNT USER!!! :", user);

                const target = user.businessData.job_postings;

                for (let index = 0; index < target.length; index++) {
                    const job = target[index];
                    if (job.id === id) {
                        console.log("job match! ~~~ :", job);

                        if (job.view_count) {
                            job.view_count += 1;
                        } else {
                            job["view_count"] = 1;
                        }
                    }
                }

                if (user.job_posting_combined_count) {
                    user.job_posting_combined_count += 1;
                } else {
                    user["job_posting_combined_count"] = 1;
                }

                collection.save(user);

                res.json({
                    message: "Found Specific User!",
                    user
                })
            } else {
                res.json({
                    message: "Couldn't find user..."
                })                
            }
        }).catch((err) => {
            res.json({
                message: "Critical error occurred...",
                err
            })
        })
    });
});

module.exports = router;