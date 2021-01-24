import React, { Component } from 'react'
import { withFirebase } from '../Firebase/Index'
import Button from 'react-bootstrap/Button'

const initial_state = {
    password: '',
    passwordConfirm: '',
    error: null,
}

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = { ...initial_state }
    }
    onSubmit = event => {
        const { password } = this.state
        this.props.firebase
            .doPasswordUpdate(password)
            .then(() => {
                this.setState({ ...initial_state })
                alert("Successfully changed password!")
            })
            .catch(error => {
                this.setState({ error })
            })
        event.preventDefault()
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const { password, passwordConfirm, error } = this.state
        const isInvalid =
            password !== passwordConfirm || password === ''
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <p>Enter a new password:</p>
                    <div>
                        <input name="password" value={password} onChange={this.handleChange} type="password" placeholder="Enter new password" />
                    </div>
                </div>
                <div className="form-group">
                    <p>Re-enter new password:</p>
                    <div>
                        <input name="passwordConfirm" value={passwordConfirm} onChange={this.handleChange} type="password" placeholder="Re-enter password" />
                    </div>
                </div>
                <Button disabled={isInvalid} type="submit">
                    Change Password
                </Button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}
export default withFirebase(ChangePassword)