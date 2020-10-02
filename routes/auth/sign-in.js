const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const request = require("request");
const moment = require("moment");
const StreamChat = require('stream-chat').StreamChat;
const { v4: uuidv4 } = require('uuid');
const OpenTok = require("opentok");
const opentok = new OpenTok(config.get("vontageAPIKey"), config.get("vontageAPISecret"));
const flash = require('connect-flash');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const gemshire = require("../../main.js");
const bcrypt = require("bcrypt");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { email, password } = req.body;

        const collection = db.collection("users");

        const trimmedEmail = email.toLowerCase().trim();

        collection.findOne({ email: trimmedEmail }).then((user) => {
            console.log(user);
            if (user) {
                if (user.email === email.toLowerCase().trim() && user.password === password) {

                    const client = new StreamChat('52zfrbfbqu6r', '2edjpqxk42vkxwjf22n73v5camaj66rmb5ykrz9uywt7bc2b86wedwb8qkt7tftv');

                    const identity = user.username;

                    const generatedID = uuidv4();

                    let sessionId;

                    opentok.createSession({}, function(error, session) {
                        if (error) {
                            console.log("Error creating session:", error)
                        } else {
                            sessionId = session.sessionId;

                            console.log("Session ID: " + sessionId);

                            const tokennnn = opentok.generateToken(sessionId);

                            if (user.opentok_data) {

                                user.opentok_data.token = tokennnn;
                                user.opentok_data.sessionId = sessionId;

                                collection.save(user);
                            } else {

                                user["opentok_data"] = {
                                    token: tokennnn,
                                    sessionId
                                };

                                collection.save(user);
                            }
                        }
                    });

                    if (!user.blockPublicKey && !user.blockPrivateKey) {
                        const key = ec.genKeyPair();
                        
                        // generate blockchain private and public keys for the crypto network later in the application
                        const publicKey = key.getPublic("hex");
                        const privateKey = key.getPrivate("hex");

                        console.log("private key is the ", privateKey);

                        console.log("public key is ", publicKey);

                        user["blockPublicKey"] = publicKey;
                        user["blockPrivateKey"] = privateKey;

                        collection.save(user);
                    } 

                    const token = jwt.sign({
                        sub: user._id,
                        username: user.username
                    }, user.email, { expiresIn: "3 hours" });

                    req.flash('username', user.username);


                    res.json({
                        message: "User FOUND!",
                        user,
                        token,
                        getStreamToken: user.get_stream_token
                    })
                } else {
                    res.json({
                        message: "Password/email did match our records..."
                    })
                }
            } else {
                res.json({
                    message: "Could NOT find user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;
                