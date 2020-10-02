const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const OpenTok = require("opentok");
const opentok = new OpenTok(config.get("vontageAPIKey"), config.get("vontageAPISecret"));

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { meeting_name, username } = req.body;
           
        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {
                console.log("user", user); 
                
                
                let sessionId;
                
                opentok.createSession({mediaMode:"routed"}, function(error, session) {
                  if (error) {
                    console.log("Error creating session:", error)
                  } else {
                    sessionId = session.sessionId;
                    console.log("Session ID: " + sessionId);
                  }
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;