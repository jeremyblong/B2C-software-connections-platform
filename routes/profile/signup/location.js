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
    router.post("/", (req, res) => {

        const { username, typeOfResidence, country, housingExtension, street, zipcode, state, city } = req.body;

        const collection = db.collection("users");

        console.log("req.body ---- :", req.body);

        collection.findOne({ username }).then((user) => {
            if (user) {
                console.log("user ---- :", user);
                
                if (!user.freelancerData.location) {
                    user.freelancerData["location"] = {
                        type_of_residence: typeOfResidence, 
                        country, 
                        housing_ext: housingExtension, 
                        street, 
                        zip_code: zipcode, 
                        state, 
                        city
                    }
                } else {
                    user.freelancerData.location = {
                        type_of_residence: typeOfResidence, 
                        country, 
                        housing_ext: housingExtension, 
                        street, 
                        zip_code: zipcode, 
                        state, 
                        city
                    }
                }
                user.currentSignupPageCompleted = 7;
                
                user["completed_signup"] = true;

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