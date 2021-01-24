import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { withFirebase } from '../Firebase/Index'
import { compose } from 'recompose'
import Button from 'react-bootstrap/Button'

const SignUpPage = () => (
    <SignUpForm></SignUpForm>
)

const intial_state = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = { intial_state }
  }

  onSubmit = event => {
    const { username, email, password } = this.state
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email
          })
      })
      .then(authUser => {
        this.setState({ ...intial_state })
        alert("Successfully created " + username)
        this.props.history.push("/login")
      })
      .catch(error => {
        this.setState({ error })
        console.log(error)
      })
    event.preventDefault()
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
    const { username, email, password, confirmPassword, error } = this.state
    const isInvalid = username === '' || password === '' || email === '' || confirmPassword === '' || confirmPassword !== password
    document.title = 'AtList - Register'

    return (
      <div className="login">
        <h1>To create an account, please enter your:</h1>
        {error && <p>{error.message}</p>}
        <div className="form-horizontal">
          <form onSubmit={this.onSubmit}>
            <h2>Username</h2>
            <input name="username" onChange={this.handleChange} placeholder="Enter your username" value={username} />
            <br /><br />
            <h2>Email</h2>
            <input type="email" name="email" onChange={this.handleChange} placeholder="Enter your email" value={email} />
            <br /><br />
            <h2>Password</h2>
            <input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password" value={password} />
            <br /><br />
            <h2>Confirm Password</h2>
            <input type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Re-enter your password" value={confirmPassword} />
            <br /><br />
            <Button disabled={isInvalid} type="submit">Register</Button>
            <br />
            <Link to="/login">Already have an account? Click here to register</Link>
          </form>
        </div>
      </div>
    )
  }
}
const SignUpForm = compose(withRouter(withFirebase(Register)))

export default (SignUpPage)

export { Register, SignUpForm }