const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const StreamChat = require('stream-chat').StreamChat;

const client = new StreamChat('52zfrbfbqu6r', '2edjpqxk42vkxwjf22n73v5camaj66rmb5ykrz9uywt7bc2b86wedwb8qkt7tftv');


// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        client.disconnect();

        res.json({
            message: "Successfully disconnected from chat!"
        })
    });
});

module.exports = router;