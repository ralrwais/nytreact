var axios = require('axios');


var nytAPI = "cb9b6375ca7d4ed683e1c2d773c88813";

var helpers = {

	 
	runQuery: function(term, startDate, endDate){

		console.log(term, startDate, endDate);

		
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + term + "&begin_date=" + startDate + "&end_date=" + endDate + "&page=1";

		return axios.get(queryURL)
			.then(function(response){

				console.log(response.data.response.docs);
				return response.data.response.docs;
		})

	},

	
	getArticle: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	
	postArticle: function(url, main){

		return axios.post('/api', {url: url, main: main})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	},
	removeArticle: function(_id){

		return axios.put('/api', {_id: _id})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}



module.exports = helpers;