const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const moment = require("moment");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post('/', (req, res) => {

		const { username, users_to_update, response, related_job, signed_in, action_data, application_id_linked } = req.body;

		console.log("setDeniedOtherApplications req.body.... :", req.body);

	    const collection = db.collection("users");

	    collection.find({ username: { $in: users_to_update }}).toArray((err, users) => {
			if (err) {
				console.log("err", err);
			} else {
				console.log("END RESULT........................", users);

				for (let indxxx = 0; indxxx < users.length; indxxx++) {
					const user = users[indxxx];
					
					for (let index = 0; index < user.submitted_applications.length; index++) {
						const application = user.submitted_applications[index];
						
						if (application.related_to === related_job && application.accepted !== "DENIED/DECLINED") {
							
							console.log("related_job related_job related_job related_job related_job :", application);

							application.accepted = "DENIED/DECLINED";
						}
					}

					if (user.notifications) {
						user.notifications.push({
							date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
							application_id_linked,
							action: action_data,
							action_taker: signed_in,
							action_specific: "did not select your application at this current point in time...",
							related_job: related_job
						})
						collection.save(user);
					} else {
						user["notifications"] = [{
							date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
							application_id_linked,
							action: action_data,
							action_taker: signed_in,
							action_specific: "did not select your application at this current point in time...",
							related_job: related_job
						}]
						collection.save(user);
					}
					collection.save(user);
				}

				res.json({
					message: "Successfully updated users application status and made appropriate changes!"
				})
			}
        });
	});
});

module.exports = router;