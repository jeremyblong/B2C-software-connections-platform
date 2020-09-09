const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { username } = req.body;

		console.log(req.body);

	    const collection = db.collection("users");

	    collection.findOne({ username }).then((user) => {
	    	if (user) {
                res.json({
                    message: "Found Specific User!",
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