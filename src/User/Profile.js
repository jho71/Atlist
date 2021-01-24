import React, { Component } from 'react'
import * as firebase from 'firebase'
import History from './History'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UsersReview from './UsersReview'

var email = []

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = { biography: '', url: '' }
    }

    componentDidMount() {
        var db = firebase.firestore()

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                email.push(user.email)
            } else {
                console.log("No user signed in")
            }
        })

        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

        sleep(1000).then(() => {

            db.collection("users")
                .doc(email[0])
                .collection("biography")
                .doc("biography")
                .get()
                .then((doc) => {
                    this.setState({ biography: doc.data().message })
                }).catch((err) => {
                    this.setState({ biography: "Insert a memorable biography here!" })
                });

            var storage = firebase.storage()

            storage.ref(email[0]).child('avatar.jpg').getDownloadURL().then(url => {
                console.log(url)
                this.setState({ url })
            })
        })
    }

    render() {
        return (
            <div>
                <br />
                <h1 dangerouslySetInnerHTML={{ __html: email[0] }} />
                <img src={this.state.url || `http://via.placeholder.com/300x300`} alt="Avatar" height="300" width="300" style={{ float: 'right' }} />
                <h2>Biography</h2>
                <p dangerouslySetInnerHTML={{ __html: this.state.biography }} />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Tabs defaultActiveKey="history" id="uncontrolled-tab-example">
                    <Tab eventKey="history" title="History">
                        <br />
                        <History />
                    </Tab>
                    <Tab eventKey="usersreview" title="Reviews">
                        <br />
                        <UsersReview />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Profile