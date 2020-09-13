import { AUTH, FORCE } from "../types.js";

export const authentication = (item) => {
	return {
		type: "AUTH",
		payload: item
	}
}

export const forceSignup = (item) => {
	return {
		type: "FORCE",
		payload: item
	}
}
