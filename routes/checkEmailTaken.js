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

        const { email } = req.body;

        const collection = db.collection("users");

        collection.findOne({ email: email.toLowerCase().trim() }).then((user) => {
            console.log(user);
            if (user) {
                res.json({
                    message: "Email is already taken..."
                })
            } else {
                console.log("NO user found.");
                
                res.json({
                    message: "NO user found with that email is registered."
                })
            }
        });
    });
});

module.exports = router;