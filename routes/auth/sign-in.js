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

                    // const timestamp = Number(moment().add('1h').format('X'));
                    
                    // const tokenStreamChat = client.createToken(user.username);

                    // const headers = 
                    //     "Content-Type": "application/x-www-form-urlencoded"
                    // };

                    // const client_id = "jBocGwHNIoZNr01wPHtQhtxIgyXLAgos";

                    // const client_secret = "Z7E2vf0ACR1fGYIR";

                    // let options = {
                    //     uri: 'https://test.api.amadeus.com/v1/security/oauth2/token',
                    //     method: 'POST',
                    //     headers,
                    //     json: true,
                    //     form: {
                    //         "grant_type": "client_credentials",
                    //         "client_id": client_id,
                    //         "client_secret": client_secret
                    //     }
                    // };

                    // request(options, (err, response, body) => {
                    //     if (err) {
                    //         console.log(err);
                    //         res.json({
                    //             err
                    //         })
                    //     }
                    //     // if (response.statusCode === 200) {
                    //         console.log("response :", response);
                    //         console.log("body", body);

                    //         const token = jwt.sign({
                    //             sub: user._id,
                    //             username: user.username
                    //           }, user.email, { expiresIn: "3 hours" });
                    //         res.json({
                    //             message: "User FOUND!",
                    //             user,
                    //             token,
                    //             access_token: body.access_token
                    //         })
                    //     // }
                    // })
                    const token = jwt.sign({
                        sub: user._id,
                        username: user.username
                      }, user.email, { expiresIn: "3 hours" });
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
                