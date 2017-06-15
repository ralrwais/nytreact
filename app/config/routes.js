var React = require('react');


var Router = require('react-router');
var Route = Router.Route;

var IndexRoute	= Router.IndexRoute;

var Main = require('../components/Main');
var Search = require('../components/Children/search'); 
var Saved = require('../components/Children/saved'); 
var Results = require('../components/Children/results'); 


module.exports = (

	
	<Route path='/' component={Main}>

		
		<Route path='search' component={Search} />
		<Route path='saved' component={Saved} />
		<Route path='results' component={Results} />


		
		<IndexRoute component={Search} />

	</Route>


);