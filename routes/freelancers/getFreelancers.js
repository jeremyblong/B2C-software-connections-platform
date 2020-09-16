const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const collection = db.collection("users");

        const finalArr = [];

        collection.find({ accountType: "freelancer" }).toArray((err, result) => {
            if (err) {
                console.log(err);
                
                res.json({
                    message: "An error occurred... please try this action again at a later point"
                })
            } 
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                
                delete element.password;

                finalArr.push(element);

                console.log("element", element);
            }
            console.log("result :", result);

            res.json({
                message: "Successfully gathered freelancers!",
                users: finalArr
            })
        })
    });
});

module.exports = router;
                