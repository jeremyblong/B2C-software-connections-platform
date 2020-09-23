const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const StreamChat = require('stream-chat').StreamChat;
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

const client = new StreamChat('52zfrbfbqu6r', '2edjpqxk42vkxwjf22n73v5camaj66rmb5ykrz9uywt7bc2b86wedwb8qkt7tftv');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { username, otherUser, message_subject, message } = req.body;

        const generatedID = uuidv4();

        const collection = db.collection("users");

        collection.findOne({ username }).then(async (user) => {
            if (user) {

                const conversation = client.channel('messaging', generatedID, {
                    name: message_subject,
                    image: 'http://bit.ly/2O35mws',
                    members: [username, otherUser],
                    created_by: {
                        name: username,
                        id: generatedID
                    }
                });

                if (!user.messaging) {
                    user["messaging"] = {
                        channels: [{
                            channel_name: generatedID,
                            users: [username, otherUser],
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            id: uuidv4(),
                            message_subject
                        }]
                    };
                } else {
                    user.messaging.channels.push({
                        channel_name: generatedID,
                        users: [username, otherUser],
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        id: uuidv4(),
                        message_subject
                    });
                }

                await conversation.create();

                await conversation.sendMessage({
                    text: `Initial Message... ${message}`,
                    user: {
                        name: username,
                        id: uuidv4()
                    }
                });

                collection.save(user);

                res.json({
                    message: "Successfully generated channel!"
                })
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