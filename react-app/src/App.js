import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './component/notFound';
import Home from './component/Home';
import DashBoard from './component/DashBoard';
import Login from './component/Login';
class App extends Component {
	render() {
		return (
			<Switch>
				<Route path='/DashBoard' component={DashBoard} />
				<Route path='/login' component={Login} />
				{/* <Redirect from='/login' to='/' /> */}
				<Route path='/' component={Home} />
				<Route path='/not-found' component={NotFound} />
				<Redirect to='/not-found' />
			</Switch>
		);
	}
}

export default App;
