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

        const { username, job_posting } = req.body;

        console.log("req.body add bookmark... :", req.body);

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {

                console.log("FOUND USER - bookmarkJob... !!! :", user);

                if (user.business_bookmarks) {
                    
                } else {
                    user["business_bookmarks"] = [{

                    }]
                }

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