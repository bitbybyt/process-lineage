import axios from 'axios';
export function getFactory() {
	return axios.get('http://localhost:5000/api/factory');
}
export function getOrder() {
	return axios.get('http://localhost:5000/api/order');
}
