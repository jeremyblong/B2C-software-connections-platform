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

        const { username, introduction } = req.body;

        const collection = db.collection("users");

        collection.findOneAndUpdate({ username }, { $set: { introduction }}, (err, doc) => {
            if (err) {
                console.log(err);
                res.json({
                    message: "Err...",
                    err
                })
            }
            if (doc) {
                console.log("doc .... :", doc);

                res.json({
                    message: "Successfully saved changes!",
                    doc
                })
            }
        })
    });
});

module.exports = router;
                