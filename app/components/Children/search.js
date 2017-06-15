var React = require('react');

var Form = React.createClass({

	
	getInitialState: function(){
		return {
			searchTerm: "",
			startDate: "",
			endDate: ""
		}
	},

	
	handleChange: function(event){

    	
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	
	handleClick: function(){

		console.log("CLICK");
		
		this.props.setTerm(this.state.searchTerm, this.state.startDate, this.state.endDate);

	},

	
	render: function(){


		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								<h4 className=""><strong>Topic</strong></h4>

								
								<input type="text" className="form-control text-center" id="searchTerm" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>Start Date</strong></h4>
								<input type="text" className="form-control text-center" id="startDate" onChange= {this.handleChange} required/>
								<p>Format: YYYYMMDD</p>
								<br />
								<h4 className=""><strong>End Date</strong></h4>
								<input type="text" className="form-control text-center" id="endDate" onChange= {this.handleChange} required/>
								<p>Format: YYYYMMDD</p>
								<br />
								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
							</div>

						</form>
				</div>
			</div>
				



		)
	}
});

module.exports = Form;