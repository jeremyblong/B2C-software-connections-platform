const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

        const { username, type_of_development, platform, database_types, web_server_types, business_size, additional_skills, id, experience_level, programming_languages } = req.body;
    
		console.log("REQUEST BODY :", req.body);

	    const collection = db.collection("users");

	    collection.findOne({ username }).then((user) => {
	    	if (user) {

                const target = user.businessData.job_postings;

                const first = user.businessData.job_postings[0];

                for (let index = 0; index < target.length; index++) {
                    const element = target[index];
                    // take first item because this uses is currently registering and only one job posting can exist
                    if (first.id === id) {
                        
                        console.log("match!", element);

                        if (type_of_development) {
                            element["type_of_development"] = type_of_development;
                        }
                        if (platform) {
                            element["platform"] = platform;
                        } 
                        if (database_types) {
                            element["database_types"] = database_types;
                        }
                        if (web_server_types) {
                            element["web_server_types"] = web_server_types;
                        }
                        if (business_size) {
                            element["business_size"] = business_size;
                        } 
                        if (additional_skills) {
                            element["additional_skills"] = additional_skills;
                        }
                        if (experience_level) {
                            element["experience_level"] = experience_level;
                        }
                        if (programming_languages) {
                            element["programming_languages"] = programming_languages;
                        }

                        user.businessSignupPageCompleted = 4;
                    }
                }

                collection.save(user);

                res.json({
                    message: "Found and updated the desired user account!",
                    user
                })
            } else {
                res.json({
                    message: "Could NOT find any user by that username"
                })
            }
	    }).catch((err) => {
            console.log(err);
            res.json({
                err
            })
	    })
	});
});

module.exports = router;