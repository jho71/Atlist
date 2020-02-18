import React, { Component } from 'react'
import * as firebase from 'firebase'
var email = []

class BookstoReadShelf extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: [], title: [], poster: [], id: []
        }
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

        sleep(10000).then(() => {
            db.collection("users")
                .doc(email[0])
                .collection("books")
                .doc("section")
                .collection("to-read")
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data())
                    for (var i = 0; i < data.length; i++) {
                        this.state.id.push(data[i].bookID)
                        this.state.url.push(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data[i].bookID}&key=AIzaSyCsBBANgxmahbgmDhSJY_PohBawwQQOOGw`)
                    }
                })
                .then(e => {
                    for (var i = 0; i < this.state.url.length; i++) {
                        fetch(this.state.url[i])
                            .then(dataWrappedByPromise => dataWrappedByPromise.json())
                            .then(data => {
                                this.setState({
                                    title: [...this.state.title, data.title],
                                    poster: [...this.state.poster, data.items[0].volumeInfo.imageLinks.thumbnail]
                                }, () => {
                                })
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }
                })

        })
    }

    /*<tr>
                    {this.state.title.map(function (title, index) {
                        return <td key={index}><h3>{title}</h3></td>
                    })}
    </tr>*/

    render() {
        var idx = 0
        return (
            <div>
                {this.state.poster.map(function (poster, index) {
                    if (idx < 5) {
                        idx++
                        return <td key={index}><img src={poster} alt="poster"></img></td>
                    }
                    else {
                        return <span><tr></tr><td key={index}><img src={poster} alt="poster"></img></td></span>
                    }
                })}
            </div>
                 
        );
    }
}

export default BookstoReadShelf
