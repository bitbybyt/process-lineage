import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './component/navBar';
import Factory from './component/factory';
import Order from './component/order';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import NotFound from './component/notFound';
class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<main className='container'>
					<Switch>
						<Route path='/register' component={RegisterForm} />
						<Route path='/login' component={LoginForm} />
						<Route path='/order' component={Order} />
						<Route path='/factory' component={Factory} />
						<Route path='/not-found' component={NotFound} />
						<Redirect from='/' exact to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
