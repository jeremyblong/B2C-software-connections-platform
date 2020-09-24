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

        const { unique_id } = req.body;

        const collection = db.collection("users");

        collection.findOne({ unique_id }).then((user) => {
            if (user) {
                
                if (!user.page_views) {
                    user["page_views"] = 1;
                } else {
                    user.page_views = user.page_views + 1;
                }

                collection.save(user);

                res.json({
                    message: "Updated Page View Count!",
                    user
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