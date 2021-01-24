import React, { Component } from 'react'
import * as firebase from 'firebase'
<<<<<<< HEAD
import Notify from './TvshowsNoteNotify'
import '../App.css'

=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
var email = []

class TvshowShelftoWatch  extends Component {

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
                .collection("to-watch")
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data())
                    for (var i = 0; i < data.length; i++) {
<<<<<<< HEAD
                        this.state.id.push(`/show/detail/${data[i].showID}`)
=======
                        this.state.id.push(data[i].showID)
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
                        this.state.url.push(`https://api.themoviedb.org/3/tv/${data[i].showID}?api_key=929731b62f68993f7b40b443978575d3&language=en-US`)
                    }
                })
                .then(e => {
                    for (var i = 0; i < this.state.url.length; i++) {
                        fetch(this.state.url[i])
                            .then(dataWrappedByPromise => dataWrappedByPromise.json())
                            .then(data => {
                                this.setState({
<<<<<<< HEAD
                                    title: [...this.state.title, data.original_name],
=======
                                    title: [...this.state.title, data.original_title],
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
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

<<<<<<< HEAD
    createEntityTable = () => {

        let table = [];
        var len = this.state.poster.length
        
        let index = 0;

        // outer loop to create parent
        for (let i = 0; i < len; i++){
            let children = []
            
            // inner loop to create children
            //for (let j = 0; j < len; j++){
                children.push(  
                    <div id="div_note">
                    <Notify title = {this.state.title[i]}/>
                        <a href={this.state.id[i]}><img src={this.state.poster[i]} alt="poster"></img></a>
                        <br></br>
                        <h2 id="title">{this.state.title[i]}</h2>
                        
                        </div>)
        
        // if is mutliple of 5 make a new row
           index++
           if (index%5 === 0){
               table.push(<tr></tr>)
           }

           table.push(<td>{children}</td>)
        }

        return table;
    }              

    render() {
        return (
            <div>
                {this.createEntityTable()}
=======
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
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
            </div>
               
        );
    }
}

export default TvshowShelftoWatch
