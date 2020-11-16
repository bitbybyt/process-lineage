import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './component/notFound';
import Home from './component/Home';
class App extends Component {
	render() {
		return (
			<Switch>
				<Route path='/home' component={Home} />
				<Route path='/not-found' component={NotFound} />
				<Redirect to='/not-found' />
			</Switch>
		);
	}
}

export default App;
