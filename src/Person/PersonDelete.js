import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import * as moment from 'moment';
import '../App.css';

class PersonDelete extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { person: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://obscure-retreat-90885.herokuapp.com/api/persons/${this.props.id}`;

  componentDidMount() {

    // Get the requested object
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
        this.setState({ person: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  handleSubmit(e) {

    // Delete
    fetch(this.url, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // Redirect
        this.props.history.push('/persons');
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Delete person ${this.props.id}`;

    // For coding convenience, create a shortcut object
    const u = this.state.person;

    return (
      <div>
        <h4>Delete person {u.firstName} {u.lastName} from the deployed web service</h4>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Name</dt><dd>{u.firstName} {u.lastName}</dd>
                <dt>Birth date</dt><dd>{moment(u.birthDate).format('DD-MM-gggg')}</dd>
                <dt>Web site</dt><dd><a href={u.url}>Web site</a></dd>
                <dt>Email address</dt><dd>{u.email}</dd>
                <dt>Credit score</dt><dd>{u.creditScore} {u.creditScore > 600 && "- good"}</dd>
                <dt>Risk rating</dt><dd>{u.rating}</dd>
              </dl>
            </div>
          </div>

        ) : (
            <p>Requested person was not found</p>
          )}

        <hr />
        <p>Confirm that this person should be deleted, or cancel to return to the list of persons</p>
        <p><button onClick={this.handleSubmit} className="btn btn-danger">Confirm delete</button>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/persons'>Cancel</Link></p>
      </div>
    );
  }
}

export default withRouter(PersonDelete);
