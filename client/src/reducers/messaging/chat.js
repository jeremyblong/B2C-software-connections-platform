import { TOKEN } from "../../actions/types.js";

const initialState = {

};
 
export default (state = initialState, action) => {
	switch (action.type) {
		case TOKEN: 
			return {
				...state,
				getStreamToken: action.payload
			}
		default: 
			return state;
	}
}