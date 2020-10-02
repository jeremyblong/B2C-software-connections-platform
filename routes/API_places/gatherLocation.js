const request = require('request');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const algoliasearch = require('algoliasearch');
const places = algoliasearch.initPlaces('plQYSC0SKL1W', '25eed220e2ba5812b5496ddc2340c555');
  
// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {
  
            const { location } = req.body;
  
            const collection = db.collection("users");
  
            console.log("req.body ---- :", req.body);

            const params = {
                type: "city",
                query: location
            }
  
            places.search(params, function(err, responseee) {
                if (err) {
                    console.log("err", err);

                    throw err;
                }
                console.log("responseee", responseee);

                response.send(responseee);
            });
    });
});
  
module.exports = router;
  