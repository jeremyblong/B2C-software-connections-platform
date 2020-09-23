const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { note, username, priority } = req.body;

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (!user) {
                res.json({
                    message: "An error occurred... please try this action again at a later point"
                })
            } else {

                const generatedID = uuidv4();

                if (!user.personal_notes) {
                    user["personal_notes"] = [{
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        id: generatedID,
                        note,
                        priority
                    }]
                } else {
                    user.personal_notes.push({
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        id: generatedID,
                        note,
                        priority
                    })
                }

                collection.save(user);

                res.json({
                    message: "Successfully posted a new note!",
                    user
                })
            }
        }).catch((err) => {

            console.log(err);

            res.json({
                err,
                message: "An error occurred..."
            })
        })
    });
});

module.exports = router;