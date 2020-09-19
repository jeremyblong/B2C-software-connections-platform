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

        console.log("REQ.body ----- ", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {

                const first = user.businessData.job_postings[0];

                user.completed_signup = true;

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