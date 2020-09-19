const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { username, selected, selection, id } = req.body;

		console.log("req.body ---- :", req.body);

	    const collection = db.collection("users");

	    collection.findOne({ username }).then((user) => {
	    	if (user) {

                if (!selected) {

                    const targeted = user.businessData.job_postings;
                    
                    const first = user.businessData.job_postings[0];

                    for (let index = 0; index < targeted.length; index++) {
                        const custom = targeted[index];

                        if (first.id === id) {

                            console.log("MATCH!... :", custom);

                            custom["length_of_project"] = selection;   

                            user.businessSignupPageCompleted = 3;

                        }
                    }

                    collection.save(user);

                    res.json({
                        message: "Updated information and user account is current!",
                        user
                    })
                } else {
                    let selectedArray = [];

                    for (let index = 0; index < selected.length; index++) {
                        const element = selected[index];
                        
                        selectedArray.push(element.title);
                        console.log("selected element ----- ", element);
                    }

                    const target = user.businessData.job_postings;

                    for (let indexxx = 0; indexxx < target.length; indexxx++) {
                        const picked = target[indexxx];
                        
                        if (picked.id === id) {
                            console.log("match! ----- ", picked);

                            picked["questions_for_applicant"] = selectedArray;
                            picked["length_of_project"] = selection; 

                            user.businessSignupPageCompleted = 3;
                        }
                    }

                    collection.save(user);

                    res.json({
                        message: "Updated information and user account is current!",
                        user
                    })
                }
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
                