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
                console.log("FOUND!!! :", user);

                for (let indexxx = 0; indexxx < user.businessData.job_postings.length; indexxx++) {
                    const job = user.businessData.job_postings[indexxx];
                    
                    console.log("job --- :", job);

                    if (job.id === id) {
                        res.json({
                            message: "Found Specific User!",
                            job_data: job
                        })
                    }
                } 
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