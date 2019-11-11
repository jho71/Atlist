import React, { Component } from 'react'
import { Link } from "react-router-dom";

import '../App.css';

class UserLogin extends Component{

    state = {

    }

    handleChange = (e) =>{

    }

    render(){
        return(
            <div>
                <h3>Login to add to your list!</h3>
                <br></br>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="userName" className='control-label col-md-2'>Username</label>
                        <div className="col-md-6">
                            <input name="userName" placeholder="username" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className='control-label col-md-2'>Password</label>
                        <div className="col-md-3">
                            <input name="password" placeholder="password" className="form-control" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-6">
                            <button onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                            <Link className='btn btn-default' to='/users'>Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default UserLogin;