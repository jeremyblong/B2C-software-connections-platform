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
    router.put("/", (req, res) => {

        const { comment_id, visited_user_id, picture_id } = req.body;

        const collection = db.collection("users");

        collection.findOne({ "profilePics.id": picture_id }).then((user) => {
            if (user) {

                // console.log("MATCH.... USER: ", user);

                for (let index = 0; index < user.profilePics.length; index++) {
                    const profile_picture = user.profilePics[index];
                    
                    for (let idxxxx = 0; idxxxx < profile_picture.comments.length; idxxxx++) {
                        const comment = profile_picture.comments[idxxxx];
                        
                        for (let idx = 0; idx < comment.replies.length; idx++) {
                            const element = comment.replies[idx];

                            if (element.id === comment_id) {
                                console.log("NESTED MATCH........:", element);

                                comment.replies.splice(idx, 1);

                                res.json({
                                    message: "Successfully removed selected NESTED comment!",
                                    changes: profile_picture
                                })
                            }
                            
                        }
                    }
                    collection.save(profile_picture);
                }

                // for (let index = 0; index < user.profilePics.length; index++) {
                //     const profile_picture = user.profilePics[index];
                //     for (let indexxx = 0; indexxx < profile_picture.comments.length; indexxx++) {
                //         const comment = profile_picture.comments[indexxx];
                //         if (comment.id === comment_id) {
                //             console.log("COMMENT MATCH!", comment);
                //             profile_picture.comments.splice(indexxx, 1);
                //             console.log("AFTER SPLICE.... ", profile_picture);

                            // res.json({
                            //     message: "Successfully removed selected comment!",
                            //     changes: profile_picture
                            // })
                //         }
                //     }
                // }
                // collection.save(user);
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
