const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { stream, username } = req.body;
           
        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {
                console.log("user", user); 
            
                if (user.active_streams_invited) {
                    user.active_streams_invited = stream;
                } else {
                    user["active_streams_invited"] = stream;
                }
                collection.save(user);
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;