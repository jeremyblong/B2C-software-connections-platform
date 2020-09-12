import { AUTH } from "../../actions/types.js";

const initialState = {
	authenticated: {
		email: "",
		username: ""
	}
}
 
export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH: 
			return {
				...state,
				authenticated: action.payload
			}
		default: 
			return state;
	}
}