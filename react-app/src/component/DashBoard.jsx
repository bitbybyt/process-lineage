import React, { Component, forwardRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getCompany, getProduct, getBill } from '../services/httpServices';
import './css/sb-admin-2.min.css';
import './css/sb-admin-2.css';
import './css/track.css';
import './vendor/fontawesome-free/css/all.min.css';
import undraw_profile from './img/undraw_profile.svg';
import bottleneck from './img/blue1.jpg';
import moment from 'moment';
import { getCompanyBill } from './../services/httpServices';
class DashBoard extends Component {
	state = {
		product: [],
		company: [],
		bill: [],
		currentproduct: null,
		currentbill: null,
		currentcompany: {},
		user: {},
		currenttime: '',
	};
	async componentDidMount() {
		//const { currentcompany, currentproduct } = this.state;
		const { data: company } = await getCompany();
		this.setState({ company });
		const { data: bill } = await getBill();
		this.setState({ bill: [{ _id: '', name: '' }, ...bill] });
		//console.log(bill);
		const { data: product } = await getProduct();
		this.setState({ product: [{ _id: '', name: '' }, ...product] });
		//this.setState({ currentproduct: product[0] });
		//if (currentcompany) this.setState({ product, currentproduct: product[0] });
		try {
			const jwt = await localStorage.getItem('token');
			const user = jwtDecode(jwt);
			this.setState({ user, currentcompany: user.currentcompany });
			console.log(user.currentcompany);
			// this.setState({ bill: this.state.currentcompany.bills });
			// console.log(this.state.bill);
		} catch (err) {}
	}
	handleTime = async (e) => {
		const currenttime = e.target.value;
		await this.setState({ currenttime });
		//console.log(this.state.currenttime);
		//console.log(this.state.bill);
		//console.log(this.state.currentcompany);
		await this.setState({
			bill: [{ _id: '', name: '' }],
		});
		const { data: biller } = await getCompanyBill(
			this.state.currentcompany._id,
			this.state.currenttime
		);
		//console.log(typeof biller);
		await this.setState({
			bill: [{ _id: '', name: '' }, ...biller],
			product: [{ _id: '', name: '' }],
			currentproduct: null,
		});
		console.log(this.state.bill);
	};
	handlebill = async (e) => {
		const billID = e.target.value;
		const bill = this.state.bill.filter((bill) => bill._id === billID);
		await this.setState({ currentbill: bill[0] });
		console.log(this.state.currentbill);
		await this.setState({
			product: [{ _id: '', name: '' }, ...this.state.currentbill.sub],
		});
		console.log(this.state.product);
	};

	handleproduct = async (e) => {
		const productID = e.target.value;
		const product = this.state.product.filter(
			(product) => product._id === productID
		);
		await this.setState({ currentproduct: product[0] });
		console.log(this.state.currentproduct);
	};
	//
	// handlecompany = async (company) => {
	// 	await this.setState({
	// 		currentcompany: company,
	// 		product: [{ _id: '', name: '' }, ...company.products],
	// 	});
	// 	console.log(this.state.currentcompany, this.state.product);
	// };
	render() {
		const { currentproduct } = this.state;
		var next;
		function category(category, fail1, pending1, active1, complete1) {
			console.log(category);
			if (currentproduct) {
				const process = currentproduct.process;
				console.log(process);
				const activity = process.filter(
					(process) => process.category === category
				);
				const fail = activity.filter((activity) => activity.state === 'fail');
				console.log(fail);
				const complete = activity.filter(
					(activity) => activity.state === 'complete'
				);
				console.log(complete);
				if (fail.length !== 0) {
					console.log('fail');
					next = 'fail';
					console.log('nextsteps : ', next);
					//icon = 'fa-ban';
					return fail1;
				} else if (activity[0].state === 'pending') {
					console.log('pending');
					next = 'pending';
					console.log('nextsteps : ', next);

					//icon = 'fa-step-forward';

					return pending1;
				} else if (complete.length === activity.length) {
					console.log('complete');
					next = 'complete';
					//icon = 'fa-check';
					console.log('nextsteps : ', next);

					return complete1;
				} else {
					console.log('lastone');
					next = 'active';
					console.log('nextsteps : ', next);
					return active1;
				}
			}
			return complete1;
		}

		return (
			<React.Fragment>
				<div id='page-top'>
					{/* Page Wrapper */}
					<div id='wrapper'>
						{/* Sidebar */}
						<ul
							className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
							id='accordionSidebar'>
							{/* Sidebar - Brand */}
							<a
								className='sidebar-brand d-flex align-items-center justify-content-center'
								href='#'>
								<div className='sidebar-brand-icon rotate-n-15'>
									<i className='fas fa-chart-bar'></i>
									{/*i className="fas fa-laugh-wink"></i*/}
								</div>
								<div className='sidebar-brand-text mx-3'>Lineager</div>
							</a>

							{/* Divider */}
							<hr className='sidebar-divider my-0' />

							{/* Nav Item - Dashboard */}
							<li className='nav-item active'>
								<a className='nav-link' href='index.html'>
									<i className='fas fa-fw fa-tachometer-alt'></i>
									<span>Dashboard</span>
								</a>
							</li>

							{/* Divider */}
							{/*hr className="sidebar-divider"*/}
							<hr className='sidebar-divider my-0' />

							{/* Heading */}
							{/*div className="sidebar-heading">
                                Interface
                            </div*/}

							{/* Nav Item - Pages Collapse Menu */}
							{/*li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="true" aria-controls="collapseTwo">
                                    <i className="fas fa-fw fa-cog"></i>
                                    <span>Components</span>
                                </a>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Custom Components:</h6>
                                        <a className="collapse-item" href="buttons.html">Buttons</a>
                                        <a className="collapse-item" href="cards.html">Cards</a>
                                    </div>
                                </div>
                            </li*/}

							{/* Nav Item - Utilities Collapse Menu */}
							<li className='nav-item'>
								<a
									className='nav-link collapsed'
									href='#'
									data-toggle='collapse'
									data-target='#collapseUtilities'
									aria-expanded='true'
									aria-controls='collapseUtilities'>
									<i className='fas fa-fw fa-wrench'></i>
									<span>Services</span>
								</a>
								<div
									id='collapseUtilities'
									className='collapse show'
									aria-labelledby='headingUtilities'
									data-parent='#accordionSidebar'>
									<div className='bg-white py-2 collapse-inner rounded'>
										<h6 className='collapse-header'>Company:</h6>
										<div className='collapse-item active'>
											{this.state.currentcompany.name}
										</div>
										{/* {this.state.company.map((company) => (
											<div
												className={
													this.state.currentcompany === company
														? 'collapse-item active'
														: 'collapse-item'
												}
												onClick={() => this.handlecompany(company)}>
												{company.name}
											</div>
										))} */}
									</div>
								</div>
							</li>

							{/* Divider */}
							<hr className='sidebar-divider' />

							{/* Heading */}
							{/*div className="sidebar-heading">
                                Addons
                            </div*/}

							{/* Nav Item - Pages Collapse Menu */}
							{/*li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                    aria-expanded="true" aria-controls="collapsePages">
                                    <i className="fas fa-fw fa-folder"></i>
                                    <span>Pages</span>
                                </a>
                                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Login Screens:</h6>
                                        <a className="collapse-item" href="login.html">Login</a>
                                        <a className="collapse-item" href="register.html">Register</a>
                                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                                        <div className="collapse-divider"></div>
                                        <h6 className="collapse-header">Other Pages:</h6>
                                        <a className="collapse-item" href="404.html">404 Page</a>
                                        <a className="collapse-item" href="blank.html">Blank Page</a>
                                    </div>
                                </div>
                            </li*/}

							{/* Nav Item - Charts */}
							{/*li className="nav-item">
                                <a className="nav-link" href="charts.html">
                                    <i className="fas fa-fw fa-chart-area"></i>
                                    <span>Charts</span></a>
                            </li*/}

							{/* Nav Item - Tables */}
							{/*li className="nav-item">
                                <a className="nav-link" href="tables.html">
                                    <i className="fas fa-fw fa-table"></i>
                                    <span>Tables</span></a>
                            </li*/}

							{/* Divider */}
							{/*hr className="sidebar-divider d-none d-md-block"*/}

							{/* Sidebar Toggler (Sidebar)
							<div className='text-center d-none d-md-inline'>
								<button
									className='rounded-circle bproduct-0'
									id='sidebarToggle'></button>
							</div> */}
						</ul>
						{/* End of Sidebar */}

						{/* Content Wrapper */}
						<div id='content-wrapper' className='d-flex flex-column'>
							{/* Main Content */}
							<div id='content'>
								{/* Topbar */}
								<nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
									{/* Sidebar Toggle (Topbar) */}
									<button
										id='sidebarToggleTop'
										className='btn btn-link d-md-none rounded-circle mr-3'>
										<i className='fa fa-bars'></i>
									</button>

									{/* Topbar Search */}
									<div className='container'>
										<select
											onChange={this.handlebill}
											className='browser-default custom-select custom-select-sm mb-3'
											style={{ width: '200px' }}>
											{this.state.bill.map((bill) => (
												<option
													key={bill._id}
													value={bill._id}
													className='dropdown-item'
													href='#'>
													{bill.customerName}
												</option>
											))}
										</select>
									</div>

									{/* Topbar Navbar */}
									<ul className='navbar-nav ml-auto'>

										<div className='container'>
											<select
												onChange={this.handleTime}
												value={this.state.currenttime}
												className='browser-default custom-select custom-select-sm mb-3'
												style={{ width: '200px' }}>
												{/*{this.state.product.map((product) => (
												<option
													key={product._id}
													value={product._id}
													className='dropdown-item'
													href='#'
													>
													{product.name}
												</option>
											))}*/}
												<option value='' disabled></option>
												<option value='1'>Today</option>
												<option value='2'>This week</option>
												<option value='3'>This Month</option>
												<option value='4'>All Records</option>
											</select>
										</div>

										<div className='topbar-divider d-none d-sm-block'></div>

										{/* Nav Item - User Information */}
										<li className='nav-item dropdown no-arrow'>
											<a
												className='nav-link dropdown-toggle'
												href='#'
												id='userDropdown'
												role='button'
												data-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'>
												<span className='mr-2 d-none d-lg-inline text-gray-600 small'>
													{this.state.user.username}
												</span>
												<img
													className='img-profile rounded-circle'
													src={undraw_profile}
												/>
											</a>
											{/* Dropdown - User Information */}
											<div
												className='dropdown-menu dropdown-menu-right shadow animated--grow-in'
												aria-labelledby='userDropdown'>
												<a className='dropdown-item' href='#'>
													<i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
													Profile
												</a>
												<a className='dropdown-item' href='#'>
													<i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
													Settings
												</a>
												<div className='dropdown-divider'></div>
												<a
													className='dropdown-item'
													href='#'
													data-toggle='modal'
													data-target='#logoutModal'>
													<i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
													Logout
												</a>
											</div>
										</li>
									</ul>
								</nav>
								{/* End of Topbar */}

								{/* Begin Page Content */}
								<div className='container-fluid'>
									{/* Page Heading */}
									<div className='d-sm-flex align-items-center justify-content-between mb-4'>
										<h1 className='h3 mb-0 text-gray-800'>Dashboard</h1>
										{/*<a
											href='#'
											className='d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm'>
											<i className='fas fa-download fa-sm text-white-50'></i>{' '}
											product
										</a>*/}
									</div>

									{/* Content Row */}
									<div className='row'>
										{/* Earnings (Monthly) Card Example */}
										<div className='col-xl-3 col-md-6 mb-4'>
											<div className='card border-left-primary shadow h-100 py-2'>
												<div className='card-body'>
													<div className='row no-gutters align-items-center'>
														<div className='col mr-2'>
															<div className='text-xs font-weight-bold text-primary text-uppercase mb-1'>
																Bill Reference
															</div>
															<div className='h5 mb-0 font-weight-bold text-gray-800'>
																--
															</div>
														</div>
														<div className='col-auto'>
															<i className='fas fa-calendar fa-2x text-gray-300'></i>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Earnings (Monthly) Card Example */}
										<div className='col-xl-3 col-md-6 mb-4'>
											<div className='card border-left-success shadow h-100 py-2'>
												<div className='card-body'>
													<div className='row no-gutters align-items-center'>
														<div className='col mr-2'>
															<div className='text-xs font-weight-bold text-success text-uppercase mb-1'>
																Current State
															</div>
															<div className='h5 mb-0 font-weight-bold text-gray-800'>
																{this.state.currentproduct && this.state.currentproduct.status}
															</div>
														</div>
														<div className='col-auto'>
															<i className='fas fa-dollar-sign fa-2x text-gray-300'></i>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Earnings (Monthly) Card Example */}
										<div className='col-xl-3 col-md-6 mb-4'>
											<div className='card border-left-info shadow h-100 py-2'>
												<div className='card-body'>
													<div className='row no-gutters align-items-center'>
														<div className='col mr-2'>
															<div className='text-xs font-weight-bold text-info text-uppercase mb-1'>
																Success Percentage
															</div>
															<div className='row no-gutters align-items-center'>
																<div className='col-auto'>
																	<div className='h5 mb-0 mr-3 font-weight-bold text-gray-800'>
																		---
																	</div>
																</div>
																{/*<div className='col'>
																	<div className='progress progress-sm mr-2'>
																		<div
																			className='progress-bar bg-info'
																			role='progressbar'
																			style={{ width: '50%' }}
																			aria-valuenow='50'
																			aria-valuemin='0'
																			aria-valuemax='100'></div>
																	</div>
																</div>*/}
															</div>
														</div>
														<div className='col-auto'>
															<i className='fas fa-clipboard-list fa-2x text-gray-300'></i>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Pending Requests Card Example */}
										<div className='col-xl-3 col-md-6 mb-4'>
											<div className='card border-left-warning shadow h-100 py-2'>
												<div className='card-body'>
													<div className='row no-gutters align-items-center'>
														<div className='col mr-2'>
															<div className='text-xs font-weight-bold text-warning text-uppercase mb-1'>
																Estimated Time
															</div>
															<div className='h5 mb-0 font-weight-bold text-gray-800'>
																--
															</div>
														</div>
														<div className='col-auto'>
															<i className='fas fa-comments fa-2x text-gray-300'></i>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Content Row */}

									{/*div className="row"*/}

									{/* Area Chart */}
									{/*div className="col-12">
                                            <div className="card shadow mb-4"*/}
									{/* Card Header - Dropdown */}
									{/*div
                                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                    <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                                    <div className="dropdown no-arrow">
                                                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                            aria-labelledby="dropdownMenuLink">
                                                            <div className="dropdown-header">Dropdown Header:</div>
                                                            <a className="dropdown-item" href="#">Action</a>
                                                            <a className="dropdown-item" href="#">Another action</a>
                                                            <div className="dropdown-divider"></div>
                                                            <a className="dropdown-item" href="#">Something else here</a>
                                                        </div>
                                                    </div>
                                                </div*/}
									{/* Card Body */}
									{/*div className="card-body">
                                                    <div className="chart-area"*/}
									{/* <canvas id="myAreaChart"></canvas> */}

									{/*div id="container">
                                                            
                                                            <div id="sub-container">
                                                                <span className="text-success"><i className="fa fa-3x fa-check" aria-hidden="true"></i></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style="width: 100%;" aria-valuenow="1" aria-valuemin="0" aria-valuemax="1"></div>
                                                                </div>
                                                                <div className="container">Type Anything Here, and here is something long!</div>
                                                            </div>
                                                            <div id="sub-container">
                                                                <span className="text-info"><i className="fas fa-caret-square-right fa-3x" aria-hidden="true"></i></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" style="width: 100%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1"></div>
                                                                </div>
                                                            </div>
                                                            <div id="sub-container">
                                                                <span className=""><i className="fa fa-3x fa-minus-square" aria-hidden="true"></i></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar progress-bar-animated" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1"></div>
                                                                </div>
                                                            </div>
                                                            <div id="sub-container">
                                                                <span className=""><i className="fa fa-3x fa-minus-square" aria-hidden="true"></i></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar progress-bar-animated" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1"></div>
                                                                </div>
                                                            </div>
                                                            <div id="sub-container">
                                                                <span className=""><i className="fa fa-3x fa-minus-square" aria-hidden="true"></i></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar progress-bar-animated" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div*/}

									{/*Illustrations*/}
									<div className='container prog'>
										<select
											onChange={this.handleproduct}
											className='browser-default custom-select custom-select-sm mb-3'
											style={{ width: '80%' }}>
											{this.state.product.map((product) => (
												<option
													key={product._id}
													value={product._id}
													className='dropdown-item'
													href='#'>
													{product.name}
												</option>
											))}
											{/* <option value='' disabled></option>
												<option value='1'>one</option>
												<option value='2'>two</option>
												<option value='3'>Three</option> */}
										</select>
									</div>
									<div className='card shadow mb-4'>
										<div className='card-header py-3'>
											<h5 className='m-0 font-weight-bold text-primary'>
												Progress
												<span class='badge badge-pill badge-secondary'>
													On Time
												</span>{' '}
												{/*to display ontime/fail/delayed*/}
											</h5>
										</div>
										<div className='card-body custom-height'>
											<div id='container'>
												<div id='sub-container'>
													<span className='text-success'>
														<i
															className='fa fa-3x fa-check'
															aria-hidden='true'></i>
													</span>
													<div className='progress'>
														<div
															className='progress-bar progress-bar-striped bg-success progress-bar-animated'
															style={{ width: '100%' }}
															aria-valuenow='1'
															aria-valuemin='0'
															aria-valuemax='1'></div>
													</div>

													<div className='container'>
														{/* Collapsable Card Example*/}
														<div className='card shadow mb-4'>
															{/* Card Header - Accordion */}
															<a
																href='#collapseCardExample1'
																className='d-block card-header py-3'
																data-toggle='collapse'
																role='button'
																aria-expanded='false'
																aria-controls='collapseCardExample1'>
																<h6 className='m-0 font-weight-bold text-primary'>
																	Order Recieved
																</h6>
															</a>
															{/* Card Content - Collapse */}
															<div
																className='collapse multi-collapse show'
																id='collapseCardExample1'>
																<div className='card-body'>
																	<strong>Estimated Time:</strong> 10:00 <br />
																	<strong>Time Taken:</strong> 12:00
																</div>
															</div>
														</div>
													</div>
												</div>
												<div id='sub-container'>
													<span
														className={`${category(
															'decision',
															'text-danger',
															'',
															'text-info',
															'text-success'
														)}`}>
														<i
															className={`fa fa-3x ${category(
																'decision',
																'fa-ban',
																'fa-minus-square',
																'fa-step-forward',
																'fa-check'
															)}`}
															aria-hidden='true'></i>
													</span>
													<div className='progress'>
														<div
															style={{ width: '100%' }}
															className={`progress-bar progress-bar-striped ${category(
																'decision',
																'bg-danger',
																'bg-transparent',
																'bg-info',
																'bg-success'
															)} progress-bar-animated`}
															aria-valuenow='1'
															aria-valuemin='0'
															aria-valuemax='1'></div>
													</div>

													<div className='container'>
														{/* Collapsable Card Example*/}
														<div className='card shadow mb-4'>
															{/* Card Header - Accordion */}
															<a
																href='#collapseCardExample1'
																className='d-block card-header py-3'
																data-toggle='collapse'
																role='button'
																aria-expanded='false'
																aria-controls='collapseCardExample1'>
																<h6 className='m-0 font-weight-bold text-primary'>
																	Decision
																</h6>
															</a>
															{/* Card Content - Collapse */}
															<div
																className='collapse multi-collapse show'
																id='collapseCardExample1'>
																{this.state.currentproduct &&
																	this.state.currentproduct.process.map(
																		(process) => {
																			//TODO: implement time exceeded yellow color
																			if (
																				process.category === 'decision' &&
																				process.state === 'complete'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-success border border-success rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			} else if (
																				process.category === 'decision' &&
																				process.state === 'active'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-info border border-info rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			} else if (
																				process.category === 'decision' &&
																				process.state === 'fail'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-danger border border-danger rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			} else if (
																				process.category === 'decision'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-muted border border-muted rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			}
																		}
																	)}
															</div>
														</div>
													</div>
												</div>

												<div id='sub-container'>
													<span
														className={
															next === 'complete'
																? ` ${category(
																		'activity',
																		'text-danger',
																		'',
																		'text-info',
																		'text-success'
																  )}`
																: next === 'pending' || next === 'active'
																? (next = 'pending')
																: 'text-danger'
														}>
														<i
															className={`fa fa-3x ${
																next === 'complete'
																	? ` ${category(
																			'activity',
																			'fa-ban',
																			'fa-minus-square',
																			'fa-step-forward',
																			'fa-check'
																	  )}`
																	: next === 'pending'
																	? 'fa-minus-square'
																	: next === 'active'
																	? 'fa-step-forward'
																	: 'fa-ban'
															}`}
															aria-hidden='true'></i>
													</span>
													<div className='progress'>
														<div
															className={`progress-bar progress-bar-striped ${
																next === 'complete'
																	? ` ${category(
																			'activity',
																			'bg-danger',
																			'bg-transparent',
																			'bg-info',
																			'bg-success'
																	  )} `
																	: next === 'pending'
																	? 'bg-transparent'
																	: next === 'active'
																	? 'bg-info'
																	: 'bg-danger'
															} progress-bar-animated`}
															style={{ width: '100%' }}
															aria-valuenow='1'
															aria-valuemin='0'
															aria-valuemax='1'></div>
													</div>

													<div className='container'>
														{/* Collapsable Card Example*/}
														<div className='card shadow mb-4'>
															{/* Card Header - Accordion */}
															<a
																href='#collapseCardExample1'
																className='d-block card-header py-3'
																data-toggle='collapse'
																role='button'
																aria-expanded='false'
																aria-controls='collapseCardExample1'>
																<h6 className='m-0 font-weight-bold text-primary'>
																	Activity
																</h6>
															</a>
															{/* Card Content - Collapse */}
															<div
																className='collapse multi-collapse show'
																id='collapseCardExample1'>
																{this.state.currentproduct &&
																	this.state.currentproduct.process.map(
																		(process) => {
																			//TODO: implement time exceeded yellow color
																			if (
																				process.category === 'activity' &&
																				process.state === 'complete'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-success border border-success rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			} else if (
																				process.category === 'activity' &&
																				process.state === 'active'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-info border border-info rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			} else if (
																				process.category === 'activity' &&
																				process.state === 'fail'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-danger border border-danger rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			} else if (
																				process.category === 'activity'
																			) {
																				return (
																					<div className='pro-list'>
																						<div className='text-muted border border-muted rounded pl md-2 my-3 mx-3 py-3 px-3'>
																							{process.processName}
																						</div>
																					</div>
																				);
																			}
																		}
																	)}
															</div>
														</div>
													</div>
												</div>
												<div id='sub-container'>
													<span
														className={
															next === 'complete'
																? 'text-success'
																: next === 'pending' || next === 'active'
																? ''
																: 'text-danger'
														}>
														<i
															//className='fa fa-3x fa-minus-square'
															className={`fa fa-3x ${
																next === 'complete'
																	? 'fa-check'
																	: next === 'pending' || next === 'active'
																	? 'fa-minus-square'
																	: 'fa-ban'
															}`}
															aria-hidden='true'></i>
													</span>

													<div className='progress'>
														<div
															//className='progress-bar progress-bar-striped bg-success progress-bar-animated'

															className={`progress-bar progress-bar-striped ${
																next === 'complete'
																	? 'bg-success'
																	: next === 'pending' || next === 'active'
																	? 'bg-transparent'
																	: 'bg-danger'
															} progress-bar-animated`}
															style={{ width: '100%' }}
															aria-valuenow='1'
															aria-valuemin='0'
															aria-valuemax='1'></div>
													</div>

													<div className='container'>
														{/* Collapsable Card Example*/}
														<div className='card shadow mb-4'>
															{/* Card Header - Accordion */}
															<a
																href='#collapseCardExample1'
																className='d-block card-header py-3'
																data-toggle='collapse'
																role='button'
																aria-expanded='false'
																aria-controls='collapseCardExample1'>
																<h6 className='m-0 font-weight-bold text-primary'>
																	Order Completion
																</h6>
															</a>
															{/* Card Content - Collapse */}
															<div
																className='collapse multi-collapse show'
																id='collapseCardExample1'>
																<div className='card-body'>
																	<strong>Estimated Time:</strong> 10:00 <br />
																	<strong>Time Taken:</strong> 12:00
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='row'>
										<div className='flip-card'>
											<div className='flip-card-inner'>
												<div className='flip-card-front'>
													<img className='bottle' src={bottleneck} />
												</div>
												<div className='flip-card-back'>
													<h1>Failed Process</h1>
													<p className='cardin1'>Architect & Engineer</p>
													<p className='cardin1'>We love that guy</p>
												</div>
											</div>
										</div>
										<div className='flip-card'>
											<div className='flip-card-inner'>
												<div className='flip-card-front'>
													<img className='bottle' src={bottleneck} />
												</div>
												<div className='flip-card-back'>
													<h1>Overhead Optimization</h1>
													<p className='cardin2'>Architect & Engineer</p>
													<p className='cardin2'>We love that guy</p>
												</div>
											</div>
										</div>
										<div className='flip-card'>
											<div className='flip-card-inner'>
												<div className='flip-card-front'>
													<img className='bottle' src={bottleneck} />
												</div>
												<div className='flip-card-back'>
													<h1>Delayed Process</h1>
													<p className='cardin3'>Architect & Engineer</p>
													<p className='cardin3'>We love that guy</p>
												</div>
											</div>
										</div>
									</div>
									{/* TODO: here ends */}

									{/* Content Row */}
									<div className='row'>
										{/* Content Column */}
										<div className='col-lg-6 mb-4'>
											{/* Project Card Example */}
											<div className='card shadow mb-4'>
												<div className='card-header py-3'>
													<h6 className='m-0 font-weight-bold text-primary'>
														BOTTLENECKS
													</h6>
												</div>

												<div className='card-body'>
													<h4 className='small font-weight-bold'>
														Server Migration{' '}
														<span className='float-right'>20%</span>
													</h4>
													<div className='progress mb-4'>
														<div
															className='progress-bar bg-danger'
															role='progressbar'
															style={{ width: '20%' }}
															aria-valuenow='20'
															aria-valuemin='0'
															aria-valuemax='100'></div>
													</div>
													<h4 className='small font-weight-bold'>
														Sales Tracking{' '}
														<span className='float-right'>40%</span>
													</h4>
													<div className='progress mb-4'>
														<div
															className='progress-bar bg-warning'
															role='progressbar'
															style={{ width: ' 40%' }}
															aria-valuenow='40'
															aria-valuemin='0'
															aria-valuemax='100'></div>
													</div>
													<h4 className='small font-weight-bold'>
														Customer Database{' '}
														<span className='float-right'>60%</span>
													</h4>
													<div className='progress mb-4'>
														<div
															className='progress-bar'
															role='progressbar'
															style={{ width: '60%' }}
															aria-valuenow='60'
															aria-valuemin='0'
															aria-valuemax='100'></div>
													</div>
													<h4 className='small font-weight-bold'>
														Payout Details{' '}
														<span className='float-right'>80%</span>
													</h4>
													<div className='progress mb-4'>
														<div
															className='progress-bar bg-info'
															role='progressbar'
															style={{ width: '80%' }}
															aria-valuenow='80'
															aria-valuemin='0'
															aria-valuemax='100'></div>
													</div>
													<h4 className='small font-weight-bold'>
														Account Setup{' '}
														<span className='float-right'>Complete!</span>
													</h4>
													<div className='progress'>
														<div
															className='progress-bar bg-success'
															role='progressbar'
															style={{ width: '100%' }}
															aria-valuenow='100'
															aria-valuemin='0'
															aria-valuemax='100'></div>
													</div>
												</div>
											</div>
										</div>

										{/* Donut Chart */}
										<div className='col-lg-6 mb-4'>
											<div className='card shadow mb-4'>
												{/* Card Header - Dropdown */}
												<div className='card-header py-3'>
													<h6 className='m-0 font-weight-bold text-primary'>
														Donut Chart
													</h6>
												</div>
												{/* Card Body */}
												<div className='card-body'>
													<div className='chart-pie pt-4'>
														<canvas id='myPieChart'></canvas>
													</div>
													<br />
													<hr />
													Styling for the donut chart can be found in the
													<code>/js/demo/chart-pie-demo.js</code> file.
												</div>
											</div>
										</div>
									</div>

									{/* Color System */}
									{/*div className="row">
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-primary text-white shadow">
                                                        <div className="card-body">
                                                            Primary
                                                            <div className="text-white-50 small">#4e73df</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-success text-white shadow">
                                                        <div className="card-body">
                                                            Success
                                                            <div className="text-white-50 small">#1cc88a</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-info text-white shadow">
                                                        <div className="card-body">
                                                            Info
                                                            <div className="text-white-50 small">#36b9cc</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-warning text-white shadow">
                                                        <div className="card-body">
                                                            Warning
                                                            <div className="text-white-50 small">#f6c23e</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-danger text-white shadow">
                                                        <div className="card-body">
                                                            Danger
                                                            <div className="text-white-50 small">#e74a3b</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-secondary text-white shadow">
                                                        <div className="card-body">
                                                            Secondary
                                                            <div className="text-white-50 small">#858796</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-light text-black shadow">
                                                        <div className="card-body">
                                                            Light
                                                            <div className="text-black-50 small">#f8f9fc</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-4">
                                                    <div className="card bg-dark text-white shadow">
                                                        <div className="card-body">
                                                            Dark
                                                            <div className="text-white-50 small">#5a5c69</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="col-lg-12 mb-4"*/}

									{/* Illustrations */}
									{/*div className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;"
                                                            src="img/undraw_posting_photo.svg" alt="">
                                                    </div>
                                                    <p>Add some quality, svg illustrations to your project courtesy of <a
                                                            target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a
                                                        constantly updated collection of beautiful svg images that you can use
                                                        completely free and without attribution!</p>
                                                    <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on
                                                        unDraw &rarr;</a>
                                                </div>
                                                </div*/}

									{/* Approach */}
									{/*div className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                                                </div>
                                                <div className="card-body">
                                                    <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in product to reduce
                                                        CSS bloat and poor page performance. Custom CSS classes are used to create
                                                        custom components and custom utility classes.</p>
                                                    <p className="mb-0">Before working with this theme, you should become familiar with the
                                                        Bootstrap framework, especially the utility classes.</p>
                                                </div>
                                        
                                        </div>
                                    </div*/}
								</div>
								{/* /.container-fluid */}
							</div>
							{/* End of Main Content */}

							{/* Footer */}
							<footer className='sticky-footer bg-white'>
								<div className='container my-auto'>
									<div className='copyright text-center my-auto'>
										<span>Copyright &copy; Your Website 2020</span>
									</div>
								</div>
							</footer>
							{/* End of Footer */}
						</div>
						{/* End of Content Wrapper */}
					</div>
					{/* End of Page Wrapper */}

					{/* Scroll to Top Button*/}
					<a className='scroll-to-top rounded' href='#page-top'>
						<i className='fas fa-angle-up'></i>
					</a>

					{/* Logout Modal*/}
					<div
						className='modal fade'
						id='logoutModal'
						tabIndex='-1'
						role='dialog'
						aria-labelledby='exampleModalLabel'
						aria-hidden='true'>
						<div className='modal-dialog' role='document'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title' id='exampleModalLabel'>
										Ready to Leave?
									</h5>
									<button
										className='close'
										type='button'
										data-dismiss='modal'
										aria-label='Close'>
										<span aria-hidden='true'>×</span>
									</button>
								</div>
								<div className='modal-body'>
									Select "Logout" below if you are ready to end your current
									session.
								</div>
								<div className='modal-footer'>
									<button
										className='btn btn-secondary'
										type='button'
										data-dismiss='modal'>
										Cancel
									</button>
									<a class='btn btn-primary' href='/login'>
										Logout
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DashBoard;
