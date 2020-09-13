const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { username, job } = req.body;

        const collection = db.collection("users");

        console.log("req.body ---- :", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {
                console.log("user ---- :", user);
                let history = user.freelancerData.employment_history;

                for (let i = 0; i < history.length; i++) {
                    const element = history[i];

                    if (_.isEqual(job, element)) {
                        console.log("EQUAL!", element);
                        history.splice(i, 1);
                    } else {
                        console.log("NOT EQUAL.")
                    }
                }
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