import React, { Component, forwardRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {
	getCompany,
	getProduct,
	getBill,
	getEachTime,
	getTillTime,
	getPropagationTime,
	getCompanyBill,
	getAllEachTime,
	getAllTillTime,
} from '../services/httpServices';
import './css/sb-admin-2.min.css';
import './css/sb-admin-2.css';
import './css/track.css';
import './vendor/fontawesome-free/css/all.min.css';
import undraw_profile from './img/undraw_profile.svg';
import bottleneck from './img/blue1.jpg';
import bottleneck1 from './img/bn1.jpeg';
import bottleneck2 from './img/bn2.jpeg';
import bottleneck3 from './img/bn3.jpeg';
import moment from 'moment';

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
		each: {},
		till: 0,
		tillall: 0,
		propagationdelay: [],
		eachall: {},
		bar: 'NA',
		cnt: 0,
		success: 0,
		failprocessname: '',
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
		this.setState({ cnt: 0 });
		this.setState({ bar: 'NA' });
		this.setState({ propagationdelay: [] });
		// this.setState({each: new Array()});
		// this.setState({eachall: new Array()});
		// this.setState({delayed: []});
		const productID = e.target.value;
		const product = this.state.product.filter(
			(product) => product._id === productID
		);
		console.log(product);
		await this.setState({ currentproduct: product[0] });
		console.log(this.state.currentproduct);

		const process = this.state.currentproduct.process;
		const complete = process.filter((process) => process.state === 'complete');
		let x = complete.length;
		let { data: each } = await getEachTime(this.state.currentproduct._id, x);
		this.setState({ each });
		console.log('each:' + each);
		// console.log(typeof each);
		const { data: eachall } = await getAllEachTime(
			this.state.currentproduct.name,
			x
		);
		console.log('eachall:' + eachall);
		// console.log(typeof eachall);
		this.setState({ eachall });
		// let res=[];
		// for(let i in each) {

		// 	if(this.state.each[i]<=this.state.eachall[i]) {
		// 		res.push(0) //0 for on-time
		// 	} else {res.push(1)} //1 for delay
		// }
		// this.setState({ delayed: res });
		// console.log('delay:' + delayed);
		const { data: propagationdelay } = await getPropagationTime(
			this.state.currentproduct._id
		);
		this.setState({ propagationdelay });
		console.log('propagationdelay:' + propagationdelay);

		let len = this.state.currentproduct.process.length;
		len-=1;
		let { data: tillTime } = await getTillTime(
			this.state.currentproduct._id,
			len
		);
		this.setState({till: tillTime});

		let { data: allTillTime } = await getAllTillTime(
			this.state.currentproduct.name,
			len
		);
		this.setState({tillall: allTillTime});


		if (this.state.currentproduct.status === 'fail')
			this.setState({ bar: 'fail' });
		else if (this.state.currentproduct.status === 'complete') {
			let i = this.state.currentproduct.process.length;
			i -= 1;
			// const tillTime = 1;
			let { data: tillTime } = await getTillTime(
				this.state.currentproduct._id,
				i
			);
			// this.setState({till: tillTime});
			tillTime = parseInt(tillTime);
			// const allTillTime = 2;
			let { data: allTillTime } = await getAllTillTime(
				this.state.currentproduct.name,
				i
			);
			allTillTime = parseInt(allTillTime);
			// this.setState({tillall: allTillTime});
			if (tillTime <= allTillTime) {
				this.setState({ bar: 'completed on time' });
			} else this.setState({ bar: 'delayed complete' });
		} else if (this.state.currentproduct.status === 'active') {
			let i = this.state.currentproduct.process.filter(
				(process) => process.status === 'complete'
			).length;
			// const tillTime = 1;
			let { data: tillTime } = await getTillTime(
				this.state.currentproduct._id,
				i
			);
			tillTime = parseInt(tillTime);
			// const allTillTime = 2;
			let { data: allTillTime } = await getAllTillTime(
				this.state.currentproduct.name,
				i
			);
			allTillTime = parseInt(allTillTime);
			if (tillTime <= allTillTime) {
				this.setState({ bar: 'ontime' });
			} else this.setState({ bar: 'being delayed' });
		}
		//success percentage
		const total = this.state.currentcompany.products.filter(
			(product) => product.name === this.state.currentproduct.name
		);
		const compy = total.filter((product) => product.status === 'complete');
		const faily = total.filter((product) => product.status === 'complete');
		console.log(total, total.length);
		console.log(compy, compy.length);
		const success = (compy.length / (compy.length + faily.length)) * 100;
		console.log(success);
		((total.length+compy.length) === 0) ? this.setState({ success: 0 }) : this.setState({ success });
		//fail process
		if (this.state.currentproduct.status === 'fail') {
			const failprocess = this.state.currentproduct.process.filter(
				(process) => process.state === 'fail'
			);
			this.setState({ failprocessname: failprocess[0].processName });
		} else {
			this.setState({ failprocessname: 'No Fail' });
		}
		console.log(this.state.failprocessname);
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
		var cnnt = -1;
		// var timevar = this.state.tillTime
		// console.log('timevar:' + timevar + currentproduct);
		// const prop = parseInt(this.state.propagationdelay[1]);
		// this.state.currentproduct && console.log(this.state.currentproduct.process[prop].processName);

		function category(category, fail1, pending1, active1, complete1) {
			// console.log(category);
			if (currentproduct) {
				const process = currentproduct.process;
				// console.log(process);
				const activity = process.filter(
					(process) => process.category === category
				);
				const fail = activity.filter((activity) => activity.state === 'fail');
				// console.log(fail);
				const complete = activity.filter(
					(activity) => activity.state === 'complete'
				);
				// console.log(complete);
				if (fail.length !== 0) {
					// console.log('fail');
					next = 'fail';
					// console.log('nextsteps : ', next);
					return fail1;
				} else if (activity[0].state === 'pending') {
					// console.log('pending');
					next = 'pending';
					// console.log('nextsteps : ', next);

					return pending1;
				} else if (complete.length === activity.length) {
					// console.log('complete');
					next = 'complete';
					// console.log('nextsteps : ', next);

					return complete1;
				} else {
					// console.log('lastone');
					next = 'active';
					// console.log('nextsteps : ', next);
					return active1;
				}
			}
			return complete1;
		}
		function mili(milisec) {
			if (currentproduct) {
				const intime = currentproduct.process[0].inTime;
				const date = new Date(intime);
				console.log(date);
				const intimemilisec = date.getTime();
				const sum = intimemilisec + milisec;
				const sumdate = new Date(sum);
				console.log(sumdate);
				const sumtime = sumdate.toISOString();
				console.log(sumtime);
				return sumtime;
			}
		}

		function displayDate(currproduct) {
			const product=currproduct;
			// this.state.currentproduct.process[0].time.inTime
			// var today = new Date();
			var date = new Date(product.process[0].time.inTime);
			// console.log('today', date);
			var dd = date.getDate();
			var mm = date.getMonth()+1; 
			var yyyy = date.getFullYear();
			if(dd<10) {dd='0'+dd;}
			if(mm<10) {mm='0'+mm;} 
			date = dd+'-'+mm+'-'+yyyy;
			// console.log('date', date);
			return date;
			
		}

		function displayTime(currproduct) {
			const product=currproduct;
			// this.state.currentproduct.process[0].time.inTime
			// var today = new Date();
			var time = new Date(product.process[0].time.inTime);
			// console.log('today', time);
			var hh = time.getHours();
			var mm = time.getMinutes(); 
			var ss = time.getSeconds();
			if(hh<10) {hh='0'+hh;}
			if(mm<10) {mm='0'+mm;}
			if(ss<10) {ss='0'+ss;}
			time = hh+':'+mm+':'+ss;
			// console.log('time', time);
			return time;
			
		}

		function displayDateTime(currproduct, t) {
			const product=currproduct;
			
			var date = new Date(product.process[0].time.inTime); 
			const input = parseInt(t);
			date.setTime(date.getTime() + (input));
			
			var dd = date.getDate();
			var mmm = date.getMonth()+1; 
			var yyyy = date.getFullYear();
			var hh = date.getHours();
			var mm = date.getMinutes(); 
			var ss = date.getSeconds();
			if(dd<10) {dd='0'+dd;}
			if(mmm<10) {mmm='0'+mmm;}
			if(hh<10) {hh='0'+hh;}
			if(mm<10) {mm='0'+mm;}
			if(ss<10) {ss='0'+ss;}

			date = dd+'-'+mmm+'-'+yyyy+' | '+hh+':'+mm+':'+ss;
			// console.log('date', date);
			return date;
			
		}

		function displaycomplete(curr,one, two) {
			if(currentproduct) {
				if(currentproduct.status !== 'fail') {
					if(currentproduct.status === 'complete') {
						return(
							<div>
								<strong>Delivered on:</strong>
								<br/>{displayDateTime(curr, two)}
							</div>
						)
					}else {
						return(
							<div>
								<strong>Expected Delivery:</strong>
								<br/>{displayDateTime(curr, one)}
							</div>	
						)
					}
					
				} else {
					return(
						<div>
							<strong>FAILED :(</strong>
						</div>
					)
				}
			}
		}

		function delayshow(curr, e, ea) {
			if(currentproduct) {
				const res = [];
				for(let i=0;i<e.length;i++) {
					if(e[i]>ea[i]) {
						res.push(<div className="border rounded pl md-2 my-2 mx-2 py-2 px-2">{curr.process[i].processName}</div>)
					} 
				}

				return res;
			}
		}

		function overhead(propdelay) {
			const process = currentproduct.process;
			let pr=parseInt(propdelay[1]);
			let one;
			let two;
			const tm=parseInt(propdelay[0]);

			for(let p=pr; p<=pr;p++) {
				one = process[p].processName.toString();
				two = process[p+1].processName.toString();
			}
			console.log('one' + one + two);
			
			return(
			<p>
				<table className="table">
					<tbody><tr >
						<td className="border border-danger">{one}</td>
						<td>-</td>
						<td className="border border-danger">{two}</td>
					</tr></tbody>
					<tr >
						<td></td>
						<td>{tm}</td>
						<td></td>
					</tr>
				</table>
			</p>)
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
															<div className='h8 mb-0 font-italic text-gray-600'>
																{this.state.currentbill &&
																	this.state.currentbill._id}
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
																{this.state.currentproduct &&
																	this.state.currentproduct.status}
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
																		{this.state.success}%
																	</div>
																</div>
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
															<div className='h6 mb-0 text-gray-800'>
																{this.state.currentproduct && 
																displayDateTime(this.state.currentproduct, this.state.tillall)}
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
													{this.state.bar}
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
																	<strong>Receive Date:</strong>
																	<p>{this.state.currentproduct && displayDate(this.state.currentproduct)}</p>
																	<br />
																	<strong>Receive Time:</strong>
																	<p>{this.state.currentproduct && displayTime(this.state.currentproduct)}</p>
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
																			// console.log('y:' + process.processname);
																			if (
																				process.category === 'decision' &&
																				process.state === 'complete'
																			) {
																				// let x = this.state.cnt;
																				// this.state.cnt +=1;
																				// console.log('x:' + x + process.processName);
																				// console.log(this.state.each[x]);
																				cnnt++;
																				// console.log('cnnt1:' + cnnt);
																				if (
																					this.state.each[cnnt] <=
																					this.state.eachall[cnnt]
																				) {
																					return (
																						<div className='pro-list'>
																							<div className='text-success border border-success rounded pl md-2 my-3 mx-3 py-3 px-3'>
																								{process.processName}
																							</div>
																						</div>
																					);
																				} else {
																					return (
																						<div className='pro-list'>
																							<div className='text-warning border border-warning rounded pl md-2 my-3 mx-3 py-3 px-3'>
																								{process.processName}
																							</div>
																						</div>
																					);
																				}
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
																				cnnt++;
																				// console.log('cnnt2:' + cnnt);
																				if (
																					this.state.each[cnnt] <=
																					this.state.eachall[cnnt]
																				) {
																					return (
																						<div className='pro-list'>
																							<div className='text-success border border-success rounded pl md-2 my-3 mx-3 py-3 px-3'>
																								{process.processName}
																							</div>
																						</div>
																					);
																				} else {
																					return (
																						<div className='pro-list'>
																							<div className='text-warning border border-warning rounded pl md-2 my-3 mx-3 py-3 px-3'>
																								{process.processName}
																							</div>
																						</div>
																					);
																				}
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
																	{this.state.currentproduct && 
																	displaycomplete(this.state.currentproduct, this.state.tillall, this.state.till)}
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
													<img className='bottle' src={bottleneck1} />
												</div>
												<div className='flip-card-back'>
													<div class="card bg-danger">
														<div class="card-body text-center">
															<h3 class="text-white">Failed Process </h3>
														</div>
													</div>
													<div class="card-body text-center">
														<p class="card-text h1 font-weight-bold text-monospace">
														{this.state.failprocessname}
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className='flip-card'>
											<div className='flip-card-inner'>
												<div className='flip-card-front'>
													<img className='bottle' src={bottleneck2} />
												</div>
												<div className='flip-card-back'>
													<div class="card bg-secondary">
														<div class="card-body text-center">
															<h3 class="text-white">Overhead Optimization</h3>
														</div>
													</div>
													<div class="card-body text-center">
														{this.state.currentproduct && 
														overhead(this.state.propagationdelay)}
														{/* <p>
															<div>
																
																
															</div>
															<br/>
															<div>

															</div>
														</p> */}
													</div>
												</div>
											</div>
										</div>
										<div className='flip-card'>
											<div className='flip-card-inner'>
												<div className='flip-card-front'>
													<img className='bottle' src={bottleneck3} />
												</div>
												<div className='flip-card-back'>
												<div class="card bg-warning">
														<div class="card-body text-center">
															<h3 class="text-white">Delayed Process</h3>
														</div>
													</div>
													<div class="card-body text-center">
														<p class="card-text">
														 {this.state.currentproduct && 
															delayshow(this.state.currentproduct, this.state.each, this.state.eachall)}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* /.container-fluid */}
							</div>
							{/* End of Main Content */}

							{/* Footer */}
							<footer className='sticky-footer bg-white'>
								<div className='container my-auto'>
									<div className='copyright text-center my-auto'>
										<span>Copyright &copy; Lineager 2020</span>
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
