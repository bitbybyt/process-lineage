import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/temp.css';
import Img1 from './img/features-icon-1.jpg';
import Img2 from './img/features-icon-2.jpg';
import Img3 from './img/features-icon-3.jpg';

const Home = () => {
	return (
		<div>
			<header className='header-area header-sticky'>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<nav className='main-nav'>
								{/*<!-- ***** Logo Start ***** -->*/}
								<a href='index.html' className='logo'>
									Lineager
								</a>
								{/*<!-- ***** Logo End ***** -->
                        <!-- ***** Menu Start ***** -->*/}
								<ul className='nav'>
									<li className='scroll-to-section'>
										<a href='#welcome' className='menu-item'>
											Home
										</a>
									</li>
									<li className='scroll-to-section'>
										<a href='#about' className='menu-item'>
											About
										</a>
									</li>
								</ul>
								<a className='menu-trigger'>
									<span>Menu</span>
								</a>
								{/*<!-- ***** Menu End ***** -->*/}
							</nav>
						</div>
					</div>
				</div>
			</header>

			<div className='welcome-area' id='welcome'>
				{/*<!-- ***** Header Text Start ***** -->*/}
				<div className='header-text'>
					<div className='container'>
						<div className='row'>
							<div
								className='left-text col-lg-6 col-md-12 col-sm-12 col-xs-12'
								data-scroll-reveal='enter left move 30px over 0.6s after 0.4s'>
								<h1>
									Know About Your <em>PROCESS</em>
								</h1>
								<a href='/login' className='main-button-slider'>
									LOGIN
								</a>
								{/* TODO: Login here @3iswajit*/}
							</div>
						</div>
					</div>
				</div>
				{/*<!-- ***** Header Text End ***** -->*/}
			</div>

			<section className='section' id='about'>
				<div className='container'>
					<div className='row'>
						<div
							className='col-lg-4 col-md-6 col-sm-12 col-xs-12'
							data-scroll-reveal='enter left move 30px over 0.6s after 0.4s'>
							<div className='features-item'>
								<div className='features-icon'>
									<h2>1</h2>
									<img src={Img1} alt='Feature 1' />
									<h4>Process Flow Visualization</h4>
									<p>
										Curabitur pulvinar vel odio sed sagittis. Nam maximus ex
										diam, nec consectetur diam.
									</p>
								</div>
							</div>
						</div>
						<div
							className='col-lg-4 col-md-6 col-sm-12 col-xs-12'
							data-scroll-reveal='enter bottom move 30px over 0.6s after 0.4s'>
							<div className='features-item'>
								<div className='features-icon'>
									<h2>2</h2>
									<img src={Img2} alt='' />
									<h4>Identification of Bottlenecks</h4>
									<p>
										Curabitur pulvinar vel odio sed sagittis. Nam maximus ex
										diam, nec consectetur diam.
									</p>
								</div>
							</div>
						</div>
						<div
							className='col-lg-4 col-md-6 col-sm-12 col-xs-12'
							data-scroll-reveal='enter right move 30px over 0.6s after 0.4s'>
							<div className='features-item'>
								<div className='features-icon'>
									<h2>3</h2>
									<img src={Img3} alt='' />
									<h4>Total Cycle Time Estimation</h4>
									<p>
										Curabitur pulvinar vel odio sed sagittis. Nam maximus ex
										diam, nec consectetur diam.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer id='contact-us'>
				<div className='container'>
					<div className='footer-content'>
						<div className='row'></div>
					</div>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='sub-footer'>
								<p>Copyright &copy; 2020 | All Rights Reserved</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
