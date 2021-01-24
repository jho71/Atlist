import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase/Index'
import AuthUserContext from './Context'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
<<<<<<< HEAD
            //this.props.history.push("/create")
=======
            this.props.history.push("/create")
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
          }
        },
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => condition(authUser) ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      )
    }
  }
  return compose(withRouter, withFirebase, )(WithAuthorization)
}

export default withAuthorization