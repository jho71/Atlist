import React, { Component } from 'react'
import * as moment from 'moment'
import Button from 'react-bootstrap/Button'
import * as firebase from 'firebase'
import Popup from "reactjs-popup";

class MovieDetail extends Component {

  // Class properties 

  state = { movie: {}, httpStatusCode: 0, httpStatusOk: false, exists: null }

  url = `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=929731b62f68993f7b40b443978575d3&language=en-US`;

  TooltipList(listOption){
    
    var m = <Popup
      trigger={open => (
        <Button className="button">
          {listOption} shelf</Button>
      )}


      position="right center"
      on= "hover"
      variant="primary"
      closeOnDocumentClick
    >
      <Button onClick ={(e) => this.handleClickAdd(listOption)}>Add To Shelf</Button>
      <Button onClick ={(e) => this.handleClickRemove(listOption)}>Remove From Shelf</Button>
    </Popup>

     return(m)
  };

  

  handleClickAdd(listOption) {
    var db = firebase.firestore()
    console.log('this is:', this.props.id)

    // current logged on user
    var user = firebase.auth().currentUser

    const u = this.state.movie;
 var usersRef = db.doc(`searchUsers/${user.email}`)  
  
    usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        // do stuff with the data
      });
    } else {
      usersRef.set({}) // create the document
    }
});
      

    let movieDoc = db.collection("users")
    .doc(user.email)
    .collection("movies")
    .doc("section")
    .collection(listOption)
    .doc(u.original_title)

    // first check if it exists already
    movieDoc.get()
    .then(doc => {
      // if doc does not exist
      if(!doc.exists){
        movieDoc
        .set({ movieID: this.props.id })
        .then(() => {
          this.setState({ exists: true });
          alert("Movie: [ " + u.original_title + " ] has been added to your " + listOption + " shelf")
        })
      } else {
        alert("Movie already exists in your " + listOption + " shelf")
        this.setState({ exists: null });
        
      }
    })
    .catch(err => {
      alert("Error connecting to server")
    });
  }

  handleClickRemove(listOption) {
    var db = firebase.firestore()
    console.log('this is:', this.props.id)

    var user = firebase.auth().currentUser

    const u = this.state.movie;

    let movieDoc = db.collection("users")
    .doc(user.email)
    .collection("movies")
    .doc("section")
    .collection(listOption)
    .doc(u.original_title)

    movieDoc.get()
    .then(doc => {
      // check of doc exists
      if(doc.exists){
        // if it  exists, delete it
        movieDoc
        .delete()
        this.setState({ exists: false });
        alert("Movie: [ " + u.original_title + " ] has been removed from your " + listOption + " list")
      } else {
        alert("Movie does not exist in your " + listOption + " list")
        this.setState({ exists: null });
      }
    })
    .catch(err => {
      alert("Error connecting to server")
    });
  }

  componentDidMount() {

    console.log("movie detail mounted")
    
    // Get one
    fetch(this.url)
      .then(response => {
        console.log(response);
        // Optional...
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found 
          throw Error('HTTP 404, Not found');
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState({ movie: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  
  render() {

    document.title = `Movie ${this.props.id} detail`;
    // check if movie exists

    function EntityExists(props){
      const doesExist = props.doesExist;
      if (doesExist){
        return <dd>Movie was added to your shelf </dd>;
      } else if (doesExist === false) {
        return <dd>Movie was removed from your shelf</dd>;
      } else if (doesExist === null) {
        return <dd><br></br></dd>
      }
    }

    // For coding convenience, create a shortcut object
    const u = this.state.movie;
    return (
      <div>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

        {this.state.httpStatusOk ? (

          <div className="row">

            <div className="col-md-12">
              <dl className="dl-horizontal">
                <dd><h1>{u.original_title}</h1> 
                <EntityExists doesExist={this.state.exists} />

                {this.TooltipList("watched")} {this.TooltipList("to-watch")}

                </dd>
                <br></br>
                <dd><img src={"https://image.tmdb.org/t/p/w200" + u.poster_path} alt="profilepic"></img></dd>
                <dt>Official Title</dt>     <dd>{u.original_title}</dd>
                <dt>Description</dt>        <dd>{u.overview}</dd>
                <dt>Tagline</dt>            <dd>{u.tagline}</dd>
                <dt>Average Rating</dt>     <dd>{u.vote_average} based on {u.vote_count} ratings</dd>
                <dt>Release Status</dt>     <dd>{u.status}</dd>
                <dt>Original Language</dt>  <dd>{u.original_language}</dd>
                <dt>Runtime</dt>            <dd>{u.runtime}</dd>
                <dt>Release Date</dt>       <dd>{moment(u.release_date).format('LL')}</dd>
                <dt>Budget</dt>             <dd>${u.budget}</dd>
                <dt>Revenue</dt>            <dd>${u.revenue}</dd>
                <dt>Official Website</dt>   <dd>{u.homepage}</dd>
              </dl>
            </div>
          </div>

        ) : (
            <p>Requested movie was not found</p>
          )}

        <hr />
        <Button href='/movies'>Show list of movies</Button>
      </div>
    )
  }
}

export default MovieDetail
