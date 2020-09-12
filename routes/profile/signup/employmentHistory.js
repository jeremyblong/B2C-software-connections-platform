const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { 
            company_name, 
            location_city, 
            country, 
            technical_title, 
            employment_start_date, 
            employment_end_date, 
            currently_employed, 
            description, 
            username
        } = req.body;

        console.log("Req.body... :", req.body);

        const collection = db.collection("users");

        collection.findOne({ username }).then((user) => {
            if (user) {

                console.log("user ---- :", user);

                if (!user.freelancerData.employment_history) {
                    user.freelancerData["employment_history"] = [{
                        company_name, 
                        location_city, 
                        country, 
                        technical_title, 
                        employment_start_date: moment(employment_start_date).format("YYYY-MM-DD"), 
                        employment_end_date: moment(employment_end_date).format("YYYY-MM-DD"), 
                        currently_employed, 
                        description 
                    }]
                } else {
                    user.freelancerData.employment_history.push({
                        company_name, 
                        location_city, 
                        country, 
                        technical_title, 
                        employment_start_date: moment(employment_start_date).format("YYYY-MM-DD"), 
                        employment_end_date: moment(employment_end_date).format("YYYY-MM-DD"), 
                        currently_employed, 
                        description 
                    })
                }

                user.currentSignupPageCompleted = 4;

                collection.save(user);

                res.json({
                    message: "Successfully updated account!",
                    user
                })
            } else {
                console.log("NO user found.");
                res.json({
                    message: "NO user found."
                })
            }
        })
    });
});

module.exports = router;