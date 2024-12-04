import axios from "axios";

const api = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	baseURL: process.env.API_BASE_URL as string,
	withCredentials: true
});

// api.interceptors.request.use(function(config) {
// 	// console.log("config:", config);
// 	return config
// })

export default api;
