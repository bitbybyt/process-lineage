import React, { Component } from 'react';
import { getOrder } from '../services/httpServices';

class Order extends Component {
	state = {
		order: [],
	};

	async componentDidMount() {
		const { data: order } = await getOrder();
		this.setState({ order });
	}

	render() {
		return (
			<table className='table'>
				<thead>
					<tr>
						<th>orderID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{this.state.order.map((order) => (
						<tr key={order._id}>
							<td>{order._id}</td>
							<td>{order.customer.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default Order;
