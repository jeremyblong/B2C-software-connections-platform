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

        const { username, firstName, lastName, email } = req.body;

        const collection = db.collection("users");

        if (firstName && lastName && username && email && req.body.checked) {

            const { checked } = req.body;
            // user selected a change in account type
            const trimmedEmail = email.toLowerCase().trim();

            collection.findOne({ username }).then((user) => {
                
                if (!user.firstName) {
                    user["firstName"] = firstName;
                } else {
                    user.firstName = firstName;
                }
                if (!user.lastName) {
                    user["lastName"] = lastName;
                } else {
                    user.lastName = lastName;
                }
                user.email = email;
                user.accountType = checked;

                console.log("CHECKED RESULTS :", user);

                collection.save(user);

                res.json({
                    message: "Successfully updated information!",
                    user
                })
            }).catch((err) => {
                console.log(err);
            })
        } else if (firstName && lastName && email && username) {
            // user did NOT change account type...
            const trimmedEmail = email.toLowerCase().trim();

            collection.findOne({ username }).then((user) => {
                
                if (!user.firstName) {
                    user["firstName"] = firstName;
                } else {
                    user.firstName = firstName;
                }
                if (!user.lastName) {
                    user["lastName"] = lastName;
                } else {
                    user.lastName = lastName
                }
                user.email = email;

                console.log("UN-CHECKED RESULTS :", user);
                collection.save(user);

                res.json({
                    message: "Successfully updated information!",
                    user
                })
            }).catch((err) => {
                console.log(err);
            })
        }   
    });
});

module.exports = router;
                