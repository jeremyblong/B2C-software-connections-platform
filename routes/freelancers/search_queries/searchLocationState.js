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

        const { state } = req.body;

        const collection = db.collection("users");

        const finalArr = [];

        collection.find({ "freelancerData.location.state": state }).toArray((err, result) => {
            if (err) {
                console.log(err);
                
                res.json({
                    message: "An error occurred... please try this action again at a later point"
                })
            } else {
                console.log("result", result);

                res.json({
                    message: "Successfully found some users with that location!",
                    users: result
                })
            }
        })
    });
});

module.exports = router;