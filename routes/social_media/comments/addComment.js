const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const request = require('request');

// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { unique_id, contact_email, public_name, message, selected_image_data, poster, other_user, indexxxxx } = req.body;

        const collection = db.collection("users");

        collection.find({ username: { $in: [ poster, other_user ] }}).toArray((err, results) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Error occurred...",
                    err
                })
            } else {
                for (let indexxxx = 0; indexxxx < results.length; indexxxx++) {
                    const specific_user = results[indexxxx];
                    
                    if (specific_user.username === poster) {
                        // this is the user that is LOGGED-IN
                        console.log("do nothing!", specific_user);
                    }

                    if (specific_user.username === other_user) {

                        let special = null;
                        
                        // this is the OTHER user...
                        console.log("executing logic - actual logic.", specific_user);
                        for (let idx = 0; idx < specific_user.profilePics.length; idx++) {

                            const profile_pic = specific_user.profilePics[idx];
                            
                            if (profile_pic.id === selected_image_data.id) {
                                console.log("profile pic match!", profile_pic);
                                
                                if (profile_pic.comments) {

                                    special = profile_pic.id

                                    profile_pic.comments.push({
                                        id: uuidv4(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        author: poster,
                                        related_picture_id: profile_pic.id,
                                        replies: [],
                                        preferred_name: public_name,
                                        message, 
                                        contact: contact_email
                                    })
                                } else {
                                    special = profile_pic.id

                                    profile_pic["comments"] = [{
                                        id: uuidv4(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        author: poster,
                                        related_picture_id: profile_pic.id,
                                        replies: [],
                                        preferred_name: public_name,
                                        message, 
                                        contact: contact_email
                                    }]
                                }
                            }
                        }
                        if (specific_user.notifications) {
                            specific_user.notifications.push({
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                action_taker: poster,
                                action_specific: "commented on one of your profile pictures!",
                                picture_commented_id: selected_image_data.id,
                                freelancer_profile_id: specific_user.unique_id,
                                index: indexxxxx
                            })
                        } else {
                            specific_user["notifications"] = [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                action_taker: poster,
                                action_specific: "commented on one of your profile pictures!",
                                picture_commented_id: selected_image_data.id,
                                freelancer_profile_id: specific_user.unique_id,
                                index: indexxxxx
                            }];
                        }
                        collection.save(specific_user);

                        res.json({
                            message: "Updated database comments successfully!",
                            user: specific_user,
                            current_update: specific_user.profilePics[indexxxxx],
                            picture_identifier: special
                        })
                    }
                }
            }
        })
    });
});

module.exports = router;