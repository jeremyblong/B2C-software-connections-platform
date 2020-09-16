const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String
	},
	accountType: {
		type: String
	},
	password: {
		type: String
	},
	username: {
		type: String
	},
	experience: {
		type: String
    },
    phoneNumber: {
        type: String
    },
    avatar: {
        type: String
    },
    profilePics: {
        type: Array
	},
	completed_signup: {
		type: Boolean
	},
	unique_id: {
		type: String
	}
});

module.exports = User = mongoose.model("user", UserSchema);

