const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { username } = req.body;

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {
                if (user.active_jobs) {
                    res.json({
                        message: "Successfully located user and found active jobs!",
                        active_jobs: user.active_jobs,
                        user
                    })
                } else {
                    res.json({
                        message: "Successfully located user and found active jobs!",
                        active_jobs: [],
                        user
                    })
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