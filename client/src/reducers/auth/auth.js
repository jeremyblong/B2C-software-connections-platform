import { AUTH, FORCE } from "../../actions/types.js";

const initialState = {
	authenticated: {
		email: "",
		username: ""
	},
	forced: false
}
 
export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH: 
			return {
				...state,
				authenticated: action.payload
			}
		case FORCE: 
			return {
				...state,
				forced: action.payload
			}
		default: 
			return state;
	}
}