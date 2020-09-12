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

        const { username, tags, subsets, serviceOffered } = req.body;

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {
                console.log("user ---- :", user);
                if (!user.freelancerData) {
                    user["freelancerData"] = {
                        skills: tags, 
                        types_of_dev: subsets, 
                        main_service_offered: serviceOffered
                    }
                    user.currentSignupPageCompleted = 1;

                    res.json({
                        message: "Successfully updated profile information!",
                        user
                    })  
                    // save updated data
                    collection.save(user);

                } else {
                    user.freelancerData.skills = tags;
                    user.freelancerData.types_of_dev = subsets;
                    user.freelancerData.main_service_offered = serviceOffered;
                    user.currentSignupPageCompleted = 1;


                    res.json({
                        message: "Successfully updated profile information!",
                        user
                    });
                    // save udpated data
                    collection.save(user);
                }
                
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