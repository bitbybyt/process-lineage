import React, { Component } from 'react';
import { getFactory } from '../services/httpServices';
class Factory extends Component {
	state = {
		factory: [],
	};

	async componentDidMount() {
		const { data: factory } = await getFactory();
		console.log(factory);
		this.setState({ factory });
	}
	render() {
		return (
			<table className='table'>
				<thead>
					<tr>
						<th>factoryID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{this.state.factory.map((factory) => (
						<tr key={factory._id}>
							<td>{factory._id}</td>
							<td>{factory.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default Factory;
