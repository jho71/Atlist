import React from 'react'
import { withFirebase } from '../Firebase/Index'
import { Button } from 'react-bootstrap'

const Logout = ({ firebase }) => (
    <Button variant="outline-light" onClick={firebase.doSignOut}> 
      Log Out
    </Button>
  )

export default withFirebase(Logout)