const request = require('request');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


// need to fix how many times res.json is sent - can't send multiple headers
mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {

        const { username, job } = req.body;

        const collection = db.collection("users");

        console.log("req.body ---- :", req.body);

        request(
            {
              url: 'https://api.foursquare.com/v2/venues/explore',
              method: 'GET',
              qs: {
                client_id: 'USLFPFYJGIIE1KELH3LPBKSQBQD4IIR35F5EEDAH2RFZ4DTU',
                client_secret: '30YFHWUVXWHW0AVNVMYSF1ZPSWRYTM1WJGPBPE2DU3AOKRAM',
                ll: '40.7243,-74.0018',
                query: 'street',
                v: '20180323',
                limit: 1,
              },
            },(err, res, body) => {
              if (err) {
                console.error(err);
              } else {
                console.log("BODY..... :", body);
                response.send(body);
              }
            }
        );
    });
});

module.exports = router;
