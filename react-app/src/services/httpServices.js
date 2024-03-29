import axios from 'axios';
export function getProduct() {
	return axios.get('http://localhost:5000/api/product');
}
export function getCompany() {
	return axios.get('http://localhost:5000/api/company');
}
export async function getUser(username, password, currentcompany) {
	return await axios.post('http://localhost:5000/api/user', {
		username,
		password,
		currentcompany,
	});
}
export function getBill() {
	return axios.get('http://localhost:5000/api/bill');
}
export function getCompanyBill(currentcompanyID, sel) {
	return axios.get(
		`http://localhost:5000/api/company/bill/${currentcompanyID}/${sel}`
	);
}

export function getEachTime(currentproductID, i) {
	return axios.get(
		`http://localhost:5000/api/product/eachTime/${currentproductID}/${i}`
	);
}
export function getTillTime(currentproductID, i) {
	return axios.get(
		`http://localhost:5000/api/product/tillTime/${currentproductID}/${i}`
	);
}
export function getPropagationTime(currentproductID, i) {
	return axios.get(
		`http://localhost:5000/api/product/propagationTime/${currentproductID}`
	);
}
export function getAllTillTime(currentproductname, i) {
	return axios.get(
		`http://localhost:5000/api/product/allTillTime/${currentproductname}/${i}`
	);
}
export function getAllEachTime(currentproductname, i) {
	return axios.get(
		`http://localhost:5000/api/product/allEachTime/${currentproductname}/${i}`
	);
}
