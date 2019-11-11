import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as moment from 'moment';
import '../App.css';

class PersonDetail extends Component {

  // Class properties 

  state = { person: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://obscure-retreat-90885.herokuapp.com/api/persons/${this.props.id}`;

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
        this.setState({ person: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Person ${this.props.id} detail`;

    // For coding convenience, create a shortcut object
    const u = this.state.person;

    return (
      <div>
        <h4>Detail about person {u.firstName} {u.lastName} from the deployed web service</h4>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

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
        <p><Link className='btn btn-warning' to={`/persons/edit/${u.id}`}>Edit</Link>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/persons'>Show list of persons</Link></p>
      </div>
    );
  }
}

export default PersonDetail;
