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

        const trimmedEmail = email.toLowerCase().trim();

        const collection = db.collection("users");

        collection.findOne({ email: trimmedEmail }).then((user) => {
            if (user) {
                res.json({
                    message: "Email is already taken!"
                })
            } else {
                res.json({
                    message: "Email is AVALIABLE..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;
                