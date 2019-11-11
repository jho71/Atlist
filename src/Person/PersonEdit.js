import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import '../App.css';

class PersonEdit extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties 

  state = { person: {},
            firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            url: '',
            creditScore: '',
            rating: '', 
            httpStatusCode: 0,
            httpStatusOk: false
          };

  url = `https://obscure-retreat-90885.herokuapp.com/api/persons/${this.props.id}`;

  handleChange(e) {
    // Same as the "add one" use case
    this.setState({ [e.target.name]: e.target.value });

    // Can also do data validation in here
  }

  componentDidMount() {

    // Get one
    fetch(this.url)
      .then(response => {
        // Optional...
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found 
          throw Error('HTTP 404, Not found');
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState({ person: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  handleSubmit(e) {
    // For coding convenience
    const newPerson = { '_id': this.state.person._id,
                        'firstName': this.state.firstName,
                        'lastName': this.state.lastName,
                        'birthDate': this.state.birthDate,
                        'email': this.state.email,
                        'url': this.state.url,
                        'creditScore': this.state.creditScore,
                        'rating':  this.state.rating};

    // Edit existing
    fetch(this.url, {
      method: 'PUT',
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
        this.props.history.push(`/person/detail/${this.props.id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = `Person ${this.props.id} edit`;

    // Determine the button state
    const isDisabled = this.state.firstName.length === 0 ||
                       this.state.lastName.length === 0 ||
                       this.state.birthDate.length === 0 ||
                       this.state.creditScore.length === 0  ||
                       this.state.email.length === 0 ||
                       this.state.rating.length === 0 ||
                       this.state.url.length === 0;

    // For coding convenience, create a shortcut object
    const u = this.state.person;

    // If "this.input" exists (it will only get rendered if a form exists), set its focus
    if (this.input && this.state.firstName.length === 0 && this.state.lastName.length === 0) {
      this.input.focus();
    }

    return (
      <div>
        <h4>Edit person {u.firstName} {u.lastName} from the deployed web service</h4>

        {this.state.httpStatusOk ? (
          <div className="form-horizontal">
            <p>Edit person data, and click/tap the Save button</p>
            <hr />
            <div className="form-group">
            <label htmlFor="firstName" className='control-label col-md-2'>First Name</label>
            <div className="col-md-6">
              <input name="firstName" placeholder={this.state.person.firstName} className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className='control-label col-md-2'>Last Name</label>
            <div className="col-md-6">
              <input name="lastName" placeholder={this.state.person.lastName} className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthDate" className='control-label col-md-2'>Birth date</label>
            <div className="col-md-3">
              <input name="birthDate" placeholder={this.state.person.birthDate} className="form-control" type="date" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className='control-label col-md-2'>Email address</label>
            <div className="col-md-6">
              <input type="email" placeholder={this.state.person.email} name="email" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="url" className='control-label col-md-2'>Web site</label>
            <div className="col-md-6">
              <input type="url" placeholder={this.state.person.url} name="url" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="creditScore" className='control-label col-md-2'>Credit score</label>
            <div className="col-md-3">
              <input type="number" placeholder={this.state.person.creditScore} min="200" max="800" name="creditScore" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rating" className='control-label col-md-2'>Risk rating</label>
            <div className="col-md-3">
              <input type="number" min="5" max="20" placeholder={this.state.person.rating} name="rating" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
              <div className="col-md-offset-2 col-md-6">
                <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                <Link className='btn btn-default' to='/persons'>Cancel</Link>
              </div>
            </div>
          </div>

        ) : (
            <div>
              <p>Requested person with identifier {this.props.id} was not found</p>
              <hr />
              <p><Link className='btn btn-default' to='/persons'>Show list of persons</Link></p>
            </div>
          )}

      </div>
    );
  }
}

export default withRouter(PersonEdit);
