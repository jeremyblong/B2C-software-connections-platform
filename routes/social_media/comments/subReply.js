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

        const { unique_id, index, poster, other_user, comment_id, public_name, contact_email, message, selected_image_data } = req.body;

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
                        // this is the OTHER user...
                        console.log("executing logic - actual logic.", specific_user);

                        for (let xx = 0; xx < specific_user.profilePics.length; xx++) {
                            const profile_picture = specific_user.profilePics[xx];

                            if (profile_picture.id === selected_image_data.id) {
                                console.log("we have a profile picture match!", profile_picture);
                                // loop through comments on this profile picture match....
                                for (let idxxx = 0; idxxx < profile_picture.comments.length; idxxx++) {

                                    const commenttt = profile_picture.comments[idxxx];

                                    if (commenttt.id === comment_id) {
                                        console.log("comment specific MATCH :) ----- :", commenttt);
                                        commenttt.replies.push({
                                            id: uuidv4(),
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            author: poster,
                                            related_picture_id: profile_picture.id,
                                            preferred_name: public_name,
                                            message, 
                                            contact: contact_email
                                        })                                        
                                    }
                                }
                            }
                        }
                        collection.save(specific_user);

                        res.json({
                            message: "Successfully updated comment thread and posted new sub reply!",
                            current_update: specific_user.profilePics[index],
                        })
                    }
                }
            }
        })
    });
});

module.exports = router;