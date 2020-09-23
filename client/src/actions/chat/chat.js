import { TOKEN } from "../types.js";

export const saveGetStreamToken = (item) => {
	return {
		type: "TOKEN",
		payload: item
	}
}