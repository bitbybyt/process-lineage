import React, { Component } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { getCompany, getUser } from '../services/httpServices';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.css';
import './assets/css/templatemo-lava.css';
//import './assets/css/owl-carousel.css';
import './assets/css/login.css';
import back from './assets/images/back.jpg';
import './css/track.css';

class Login extends Component {
	state = {
		company: [],
		data: { username: '', password: '', currentcompany: {} },
	};
	async componentDidMount() {
		const { data: company } = await getCompany();
		this.setState({ company });
	}

	handleChange = async (e) => {
		//this.setState({ currentcompany: event.target.value });
		const companyID = e.target.value;
		//console.log(companyID);
		const company = this.state.company.filter(
			(company) => company._id === companyID
		);
		//console.log(company[0]);
		const data = { ...this.state.data };
		//console.log(data);
		data.currentcompany = company[0];
		await this.setState({ data });
		//console.log(this.state.data);
	};
	handleInputChange = async (e) => {
		const data = { ...this.state.data };
		data[e.target.name] = e.target.value;
		await this.setState({ data });
		//console.log(this.state.data);
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = this.state;
			console.log(data);
			const { data: jwt } = await getUser(
				data.username,
				data.password,
				data.currentcompany
			);
			console.log('logged in');
			console.log('jwt' + jwt);
			localStorage.setItem('token', jwt);
			this.props.history.push('/DashBoard');
			//window.location = '/DashBoard';
			//console.log(event.cancelable);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = ex.response.data;
				//console.log('error' + errors);
				alert(errors);
			}
		}
	};

	render() {
		return (
			<React.Fragment>
				<div>
					{/* ***** Welcome Area Start ***** */}
					<div className='welcome-area' id='welcome'>
						{/* ***** Header Text Start ***** */}
						<div className='header-text'>
							<div className='container'>
								<div className='row'>
									<div className='wrapper fadeInDown'>
										<div id='formContent'>
											{/* Tabs Titles */}
											<h3 className='active'> LOGIN </h3>

											{/* Login Form */}
											<form onSubmit={this.handleSubmit}>
												<img src={back} />
												<input
													type='text'
													id='login'
													name='username'
													placeholder='username'
													onChange={this.handleInputChange}
													required
												/>
												<input
													type='password'
													id='password'
													name='password'
													placeholder='password'
													onChange={this.handleInputChange}
													required
												/>

												<div className='input-group mx-auto organization'>
													<div className='input-group-prepend'></div>
													<select
														className='custom-select'
														id='inputGroupSelect01'
														onChange={this.handleChange}
														required>
														{/* <option selected>Organization</option>
														<option value='1'>Dell</option>
														<option value='2'>Two</option>
														<option value='3'>Three</option> */}
														<option selected disabled>
															Organization
														</option>
														{this.state.company.map((company) => (
															<option
																key={company._id}
																value={company._id}
																className='dropdown-item'
																href='#'>
																{company.name}
															</option>
														))}
													</select>
												</div>
												<input type='submit' value='Log In' />
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* ***** Header Text End ***** */}
					</div>
					{/* ***** Welcome Area End ***** */}
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
