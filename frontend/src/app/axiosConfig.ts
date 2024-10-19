import axios from "axios";

const api = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	baseURL: process.env.API_BASE_URL as string
});

export default api;
