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

        const { username, location, country, state } = req.body;

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {

                const first = user.businessData.job_postings[0];

                first["location_preference"] = location;

                if (country) {
                    first["preferred_country"] = country;
                }
                if (state) {
                    first["preferred_state_timezone"] = state;
                }

                user.businessSignupPageCompleted = 5;

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