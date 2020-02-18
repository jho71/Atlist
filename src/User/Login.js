import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase/Index'
import { withRouter, Link } from "react-router-dom"

const SignInPage = () => (
    <SignInForm />
)

const initial_state = { email: '', password: '', error: null }

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { ...initial_state }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = event => {
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...initial_state })
        this.props.history.push("/movies")
        alert("Welcome back " + email)
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }

  render() {
    document.title = 'AtList - Login'
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <div className="login">
            <h1>To login, please enter your:</h1>
            {error && <p>{error.message}</p>}
            <h2>Email</h2>
            <input type="email" name="email" onChange={this.handleChange} placeholder="Enter your email" value={email} />
          <br /><br />
            <h2>Password</h2>
            <input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password" value={password} />
          <br /><br />
            <Button disabled={isInvalid} type="submit">Login</Button>
            <br />
            <Link to="/register">Don't have an account? Click here to register</Link>
        </div>
      </form>
    )
  }
}

const SignInForm = compose(withRouter, withFirebase)(Login)

export default SignInPage
export { Login }
