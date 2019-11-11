import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import '../App.css';

class PersonCreate extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            url: '',
            creditScore: '',
            rating: '' };

  url = "https://obscure-retreat-90885.herokuapp.com/api/persons";

  handleChange(e) {
    // https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
    // Bottom line, new ES6 feature, bracket notation, computed property names
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
    this.setState({ [e.target.name]: e.target.value });
    //console.log(`Name: ${this.state.name}, Job: ${this.state.job}`);

    // Can also do data validation in here
  }

  componentDidMount() {
    this.input.focus();
  }

  handleSubmit(e) {

    // Turn off default form handling
    //e.preventDefault();

    const newPerson = { 'firstName': this.state.firstName,
                        'lastName': this.state.lastName,
                        'birthDate': this.state.birthDate,
                        'email': this.state.email,
                        'url': this.state.url,
                        'creditScore': this.state.creditScore,
                        'rating':  this.state.rating};

    fetch(this.url, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(newPerson)
    })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/person/detail/${responseData._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Add person';

    // Determine the button state
    const isDisabled = this.state.firstName.length === 0 ||
                       this.state.lastName.length === 0 ||
                       this.state.birthDate.length === 0 ||
                       this.state.creditScore.length === 0  ||
                       this.state.email.length === 0 ||
                       this.state.rating.length === 0 ||
                       this.state.url.length === 0;
                       

    return (
      <div>
        <h4>Add a new person to the deployed web service</h4>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="form-horizontal">
          <p>Enter new person data, and click/tap the Add Person button</p>
          <hr />
          <div className="form-group">
            <label htmlFor="firstName" className='control-label col-md-2'>First Name</label>
            <div className="col-md-6">
              <input name="firstName" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className='control-label col-md-2'>Last Name</label>
            <div className="col-md-6">
              <input name="lastName" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthDate" className='control-label col-md-2'>Birth date</label>
            <div className="col-md-3">
              <input name="birthDate" className="form-control" type="date" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className='control-label col-md-2'>Email address</label>
            <div className="col-md-6">
              <input type="email" placeholder="A valid email address" name="email" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="url" className='control-label col-md-2'>Web site</label>
            <div className="col-md-6">
              <input type="url" placeholder="A valid URL" name="url" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="creditScore" className='control-label col-md-2'>Credit score</label>
            <div className="col-md-3">
              <input type="number" placeholder="200 to 800" min="200" max="800" name="creditScore" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rating" className='control-label col-md-2'>Risk rating</label>
            <div className="col-md-3">
              <input type="number" min="5" max="20" placeholder="5.0 to 20.0" name="rating" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-6">
              <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Add Person</button>&nbsp;&nbsp;
              <Link className='btn btn-default' to='/persons'>Cancel</Link>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default withRouter(PersonCreate);
