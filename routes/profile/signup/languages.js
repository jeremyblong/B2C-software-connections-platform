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

        const { username, native, secondary } = req.body;

        const collection = db.collection("users");

        console.log("req.body ---- :", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {

                console.log("user ---- :", user);

                user.freelancerData.native_english_language = native;
                user.freelancerData.secondary_languages = secondary;

                user.currentSignupPageCompleted = 5;

                collection.save(user);

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