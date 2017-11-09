import React, { Component } from 'react';
import axios from 'axios';
// import { AthleteCard } from './AthleteCard';

// export const IndexPage = ({ athletes }) => (
//   <div className="home">
//     <div className="athletes-selector">
//       TODO test
//     </div>
//   </div>
// );

export default class AddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Sapna'
			// button: true,
			// userIdValid: false,
			// userNameValid: false,
			// mobileValid: false,
			// emailIdValid: false,
		};
  }
  
  // componentDidMount() {
  // 	this.userId.fieldValue.focus();
  // }
  
  // componentWillReceiveProps(nextProps) {
	// 	this.setState({
	// 		initialRoleCategory: ' ',
	// 	});
	// }
	
	render() {
		return (
			<div className="home">
				<div>Image Search:</div>
				<Heading type={this.state.name}></Heading>
			</div>
		)
	}
};

class Heading extends Component {
// 	render() {
// 		return (
// 			<div>
// 			<h1>{this.props.type}</h1>
				
// 				<form method="post" action="api/photos/upload" encType="multipart/form-data">
//     <input type="text" name="name"/>
//     <input type="file" name="files" multiple="multiple"/>
//     <input type="submit" value="Upload" />
// </form>
// 			</div>
// 		)
// 	}
// }
// handleUploadFile (event) {
// 	event.preventDefault();
// 	console.log(this.files, this.name);
// 	// const data1 = new FormData(this.form);
// 	const data = new FormData(this.form);
// 	// data.append('files', this.files);
// 	// data.append('name', 'upload');
// 	// data.append('description', 'some value user types');
// 	console.log(data)
// 	// data.name = this.name.value;
// 	// '/files' is your node.js route that triggers our middleware
// 	axios.post('/api/photos/upload/' + this.name.value, data).then((response) => {
// 		console.log(response); // do something with the response
// 	});
// }

handleUploadFile (event) {
	event.preventDefault();
	console.log(this.files, this.name);
	// const data1 = new FormData(this.form);
	const data = new FormData(this.form);
	// data.append('files', this.files);
	// data.append('name', 'upload');
	// data.append('description', 'some value user types');
	console.log(data)
	// data.name = this.name.value;
	// '/files' is your node.js route that triggers our middleware
	axios.post('/api/photos/upload2/', data).then((response) => {
		if(response && response.data && response.data.name) {
			alert('Image found: ' + response.data.name)
		}
		console.log(response); // do something with the response
	});
}
	
	render() {
		const that = this;
		return (<div>
			{/* <h1>{this.props.type}</h1> */}

			<form onSubmit={this.handleUploadFile.bind(this)} encType="multipart-formdata" ref={function(form) { that.form = form}}>
				<label>Name of the Disease:</label>
				<br/>
				<input type="text" ref={function(name) { that.name = name}}/>
				<input type="file" name="files" multiple ref={function(name) { that.files = name}} />
				<input type="submit" /> 
			</form>
			
		</div>
		)
	}
}
