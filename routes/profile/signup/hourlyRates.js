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

        const { username, hourly } = req.body;

        const collection = db.collection("users");

        console.log("req.body ---- :", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {

                if (!user.hourlyRate) {
                    user["hourlyRate"] = hourly;
                } else {
                    user.hourlyRate = hourly;
                }

                if (!user.hourlyCurrency) {
                    user["hourlyCurrency"] = "USD";
                } else {
                    user.hourlyCurrency = "USD";
                }

                user.currentSignupPageCompleted = 6;

                collection.save(user);

                console.log("user ---- :", user);

                res.json({
                    message: "Successfully updated account!",
                    user
                })
            } else {
                console.log("NO user found.");
                res.json({
                    message: "NO user found."
                })
            }
        })
    });
});

module.exports = router;