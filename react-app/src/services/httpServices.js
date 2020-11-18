import axios from 'axios';
export function getProduct() {
	return axios.get('http://localhost:5000/api/product');
}
export function getCompany() {
	return axios.get('http://localhost:5000/api/company');
}
