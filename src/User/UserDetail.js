import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as moment from 'moment';
import '../App.css';

class UserDetail extends Component {

  // Class properties 

  state = { user: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://infinite-stream-92950.herokuapp.com/api/useraccounts/${this.props.id}`;

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
        this.setState({ user: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `User ${this.props.id} detail`;

    // For coding convenience, create a shortcut object
    const u = this.state.user;

    return (
      <div>
        <h4>Detail about user {u.userName} from the deployed web service</h4>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Profile Picture</dt> <dd><img src={u.profileImg} alt=""></img></dd>
                <dt>Name</dt> <dd>{u.fullName}</dd>
                <dt>Username</dt> <dd>{u.userName}</dd>
                <dt>Password</dt> <dd>{u.password}</dd>
                <dt>Email address</dt> <dd>{u.email}</dd>
                <dt>Role</dt> <dd>{u.role}</dd>
                <dt>Last Login</dt> <dd>{u.lastLogin}</dd>
                <dt>Admin?</dt><dd>{u.isAdmin === true ? <p>True</p> : <p>False</p>}</dd>
                <dt>Activated?</dt><dd>{u.statusActivated === true ? <p>True</p> : <p>False</p>}</dd>
              </dl>
            </div>
          </div>

        ) : (
          <p>Requested user was not found</p>
          )}

        <hr />
        <p><Link className='btn btn-warning' to={`/user/edit/${u.id}`}>Edit</Link>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/users'>Show list of users</Link></p>
      </div>
    );
  }
}

export default UserDetail;
