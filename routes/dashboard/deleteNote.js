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
    router.put("/", (req, res) => {

        const { username, note } = req.body;

        const collection = db.collection("users");

        console.log(req.body);

        collection.findOne({ username }).then((user) => {
            if (!user) {
                res.json({
                    message: "An error occurred... please try this action again at a later point"
                })
            } else {

                for (let index = 0; index < user.personal_notes.length; index++) {
                    const element = user.personal_notes[index];

                    if (element.id === note.id) {
                        user.personal_notes.splice(index, 1);
                    }
                    
                }

                collection.save(user);
                
                res.json({
                    message: "Successfully deleted your selected note!",
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