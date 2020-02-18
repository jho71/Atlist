import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import * as firebase from 'firebase'
import TvshowsShelftoWatch from './TvshowsShelftoWatch'

var email = []

class Shelf extends Component {

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
                .collection("tvshows")
                .doc("section")
                .collection("watched")
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data())
                    for (var i = 0; i < data.length; i++) {
                        this.state.id.push(data[i].showID)
                        this.state.url.push(`https://api.themoviedb.org/3/tv/${data[i].showID}?api_key=929731b62f68993f7b40b443978575d3&language=en-US`)
                    }
                })
                .then(e => {
                    for (var i = 0; i < this.state.url.length; i++) {
                        fetch(this.state.url[i])
                            .then(dataWrappedByPromise => dataWrappedByPromise.json())
                            .then(data => {
                                this.setState({
                                    title: [...this.state.title, data.original_title],
                                    poster: [...this.state.poster, "https://image.tmdb.org/t/p/w200" + data.poster_path]
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
                <br />
                <Tabs defaultActiveKey="watched" id="uncontrolled-tab-example">
                    <Tab eventKey="watched" title="Watched">
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
                    </Tab>
                    <Tab eventKey="to-watch" title="To-Watch">
                        {<TvshowsShelftoWatch></TvshowsShelftoWatch>}   
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Shelf
