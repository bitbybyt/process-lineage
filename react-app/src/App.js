import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './component/notFound';
import Home from './component/Home';
import DashBoard from './component/DashBoard';
import Register from './component/Register';
import Login from './component/Login';
class App extends Component {
	render() {
		return (
			<Switch>
				<Route path='/register' component={Register} />
				<Route path='/DashBoard' component={DashBoard} />
				<Redirect from='/login' to='/DashBoard' />
				<Route path='/' component={Home} />
				<Route path='/not-found' component={NotFound} />
				<Redirect to='/not-found' />
			</Switch>
		);
	}
}

export default App;
