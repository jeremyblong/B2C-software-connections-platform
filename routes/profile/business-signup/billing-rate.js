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

        const { username, fixed_project_cost, hourly_project_cost } = req.body;

        const collection = db.collection("users");

        console.log("REQ.body ----- ", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {

                const first = user.businessData.job_postings[0];

                if (fixed_project_cost) {
                    first["billing"] = {
                        pay: fixed_project_cost,
                        rate: "FIXED",
                        currency: "USD"
                    }
                } else if (hourly_project_cost) {
                    first["billing"] = {
                        pay: hourly_project_cost,
                        rate: "HOURLY",
                        currency: "USD"
                    }
                }

                user.businessSignupPageCompleted = 7;

                collection.save(user);

                res.json({
                    message: "Successfully edited and posted new information to users profile!",
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