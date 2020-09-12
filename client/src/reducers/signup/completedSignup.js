import { SIGNED_UP_OR_NOT } from "../../actions/types.js";

const initialState = {
    signup_completed: false
}
 
export default (state = initialState, action) => {
	switch (action.type) {
		case SIGNED_UP_OR_NOT: 
			return {
				...state,
				signup_completed: action.payload
			}
		default: 
			return state;
	}
}