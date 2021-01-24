        import React, { Component } from 'react'
        import * as firebase from 'firebase'
        import Button from 'react-bootstrap/Button'
        var email

        class FriendSearch extends Component {

            constructor(props) {
                super(props);

                this.state = { emails: [], value: '' };

                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }

            handleChange(event) {
                this.setState({ value: event.target.value });
            }

            handleSubmit(event) {
                //alert('A name was submitted: ' + this.state.value);
                console.log(" B: state was set: " + this.state.value)
                event.preventDefault();
                // this.props.history.push(`/Users/detail/${this.state.value}`);
                const searchVal = this.state.value // search value from <input>
               
                var db = firebase.firestore()

                var docRef = db.collection('searchUsers')
                .doc(searchVal)
                var docUser = db.collection('searchUsers')
                .doc(email)

                docRef.get().then(function(doc) {

                if (doc.exists) {
                console.log("Email data:", doc.data());
                 docUser.collection("friends-sent").doc(searchVal).set(
                    {friendRequest : searchVal, 
                 requestStatus : 'requesting'
                })
                docRef.collection("friends-requests").doc(email).set(
                    {friendRequest : email, 
                 requestStatus : 'pending'
                })

                alert("Successfully sent " + searchVal + " a friend request")
                } 
                    else {
                        alert("No such email exist!");
                        
                // doc.data() will be undefined in this case
                console.log("No such email exist!");
                }
                }).catch(function(error) {
                console.log("Error getting document:", error);
                });
                
                
            }





            componentDidMount() {
                // admin.initializeApp({
                //     credential: admin.credential.applicationDefault(),
                //   });


                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        email = user.email
                    //     db.collection("searchUsers")
                    //         .get()
                    //         .then(function (querySnapshot) {
                    //             querySnapshot.forEach(doc => {
                    //                 console.log(doc.id);

                    //             });
                    //         }).catch(err => {
                    //             console.log('Error getting documents', err);
                    //         });
                     }
                    else {
                        console.log("No user signed in")
                    }
                })

            }

            render() {
                document.title = 'AtList - FriendSearch'

                return (
                    <div className="App">
                        {/* <Header /> */}
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <h5>Search by Email</h5>
                                <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            &nbsp;&nbsp;&nbsp;
                        <Button disabled={!this.state.value} type="email">Submit</Button>
                        <br/>
{/*                         
                       <Button disabled={!this.state.value}>  Make friend request </Button> */}
                        </form>
                        <div>
                            &nbsp;
                        <table className='table table-striped'>
                                {/* <TableHeader /> */}

                                {/* <TableBody result={this.state.result} /> */}
                            </table>
                        </div>
                    </div>
                )
            }
        }

        export default FriendSearch

