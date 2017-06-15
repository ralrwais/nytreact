
var React = require('react');


var Search = require('./Children/search');
var Results = require('./Children/results');
var Saved = require('./Children/saved');

var helpers = require('./utilities/helpers.js');


var Main = React.createClass({

	
	getInitialState: function(){
		return {
			searchTerm: "",
			startDate:"",
			endDate:"",
			results: "",
			url:"",
			mainHeadline: "",
			removeId: "",
			history: [] 
		}
	},	

	
	setTerm: function(term, start, end){
		this.setState({
			searchTerm: term,
			startDate: start,
			endDate: end

		})
	},

	setArticle: function(articleUrl, headline){
		this.setState({
			url: articleUrl,
			mainHeadline: headline
		})
	},

	deleteArticle: function(_id){
		this.setState({
			removeId: _id
		})
	},

	
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			
			helpers.runQuery(this.state.searchTerm, this.state.startDate, this.state.endDate)
				.then(function(data){
					if (data != this.state.results)
					{
						console.log("Articles", data);

						this.setState({
							results: data
						})

						
						
						
					}
				}.bind(this))
				
			}
		if (prevState.mainHeadline != this.state.mainHeadline){
			helpers.postArticle(this.state.url, this.state.mainHeadline)
							.then(function(data){
								console.log("Updated!");

						
								helpers.getArticle()
									.then(function(response){
										console.log("Current Saved Articles", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
							)
		}
		if (prevState.removeId != this.state.removeId){
			helpers.removeArticle(this.state.removeId)
							.then(function(data){
								console.log("Updated!");

						
								helpers.getArticle()
									.then(function(response){
										console.log("Current Saved Articles", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
							)
		}
	},

	componentDidMount: function(){

		
		helpers.getArticle()
			.then(function(response){
				if (response != this.state.history){
					console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},


	render: function(){
		var that = this;
		var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {setTerm: that.setTerm, results: that.state.results, history: that.state.history, setArticle: that.setArticle, deleteArticle: that.deleteArticle});
        });
        console.log(this.setTerm);

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h1>New York Times Article Search</h1>
						<p><em>Search for articles and save your favorites for later</em></p>
						<a href="#/search"><button className="btn btn-default">Search</button></a>
						<a href="#/saved"><button className="btn btn-default">Saved Articles</button></a>
						<a href="#/results"><button className="btn btn-default">Results</button></a>
					</div>

					<div className="container">

						
						{childrenWithProps}

					</div>
				</div>

			</div>
		)
	}
});


module.exports = Main;