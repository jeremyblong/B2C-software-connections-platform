const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');

const accountSid = 'AC3ef6c21bae251cb9f4677c85e600c2ac';
const authToken = '4a60ae3bfbfc6089b45b654e6138beee';
const client = require('twilio')(accountSid, authToken);

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { username, code, phoneNumber, sid } = req.body;

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {
                client.verify.services(sid)
                    .verificationChecks
                        .create({to: `+1${phoneNumber}`, code })
                            .then(verification_check => {
                                if (verification_check.status === "approved") {
                                    res.json({
                                        message: "SUCCESS!",
                                        approved: verification_check.status
                                    })
                            } else {
                                res.json({
                                    message: "ERROR... Please check your code and try again.",
                                    approved: verification_check.status
                                })
                            }
                            console.log("verification_check.status :", verification_check.status)
                    }).catch((err) => {
                        console.log(err);
                });
            } else {
                console.log("NO user found.");
                res.json({
                    message: "NO user found."
                })
            }
        });
    });
});

module.exports = router;