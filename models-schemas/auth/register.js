const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	country: {
		type: String
	},
	phoneNumber: {
		type: String
    },
    profilePics: {
        type: Array
    },
    avatar: {
        type: String
    },
    zipCode: {
        type: String
    },
    message: {
        type: String
    },
    lastName: {
        type: String
    }
});

module.exports = User = mongoose.model("user", UserSchema);