import { SIGNED_UP_OR_NOT, SAVE_CURRENT_ID } from "../../actions/types.js";

const initialState = {
	signup_completed: false,
	id: ""
}
 
export default (state = initialState, action) => {
	switch (action.type) {
		case SIGNED_UP_OR_NOT: 
			return {
				...state,
				signup_completed: action.payload
			}
		case SAVE_CURRENT_ID: 
			return {
				...state,
				id: action.payload
			}
		default: 
			return state;
	}
}