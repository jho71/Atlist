import React, { Component } from 'react'
import ChangePassword from './ChangePassword'
import { withAuthorization, AuthUserContext } from '../Sessions/Index'

class Profile extends Component{
    render(){
        return(
            <AuthUserContext.Consumer>
            {authUser => (
              <div className="login">
                <h1>Email: {authUser.email}</h1>
                <h2>Upload Your Profile Picture</h2>
                <h2>Change Password</h2>
                <ChangePassword />
                <h2>Add A Short Biography</h2>
              </div>
            )}
          </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Profile)