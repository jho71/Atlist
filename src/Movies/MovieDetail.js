import '../App.css';
import React, { Component} from 'react'
import Button from 'react-bootstrap/Button'
import Popup from "reactjs-popup";
import * as firebase from 'firebase'
import * as moment from 'moment'
import Review from '../Review'
import Note from './MovieNoteModal'

import '../App.css'

import StarRating from '../Utility/StarRating'

var email = []
var entityType = "movie"

class MovieDetail extends Component {

  state = { movie: {}, 
    httpStatusCode: 0, 
    httpStatusOk: false, 
    exists: null, 
    currentUserEmail: null,
    entityName: null,
    entityId: null,
    initialRating: null,
    allRatings: []
  }

  url = `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=929731b62f68993f7b40b443978575d3&language=en-US`;
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  TooltipList(listOption) {
    if (listOption) { }
    var m = <Popup 

      trigger={open => (
        <Button className="button">
          {this.Capitalize(listOption)} shelf</Button>
      )}


      position="bottom left"
      on="hover"
      closeOnDocumentClick
    >
      <Button id = "popup_buttons"variant= "dark"onClick={(e) => this.handleClickAdd(listOption)}>Add to shelf</Button>
      <Button id = "popup_buttons" variant= "dark" onClick={(e) => this.handleClickRemove(listOption)}>Remove from shelf</Button>
    </Popup>

    return (m)
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
      })

    let movieDoc = db.collection("users")
      .doc(user.email)
      .collection("movies")
      .doc("section")
      .collection(listOption)
      .doc(u.original_title)

    let historyCol = db.collection("users")
      .doc(user.email)
      .collection("historyList")

    // first check if it exists already
    movieDoc.get()
    .then(doc => {
      // if doc does not exist
      if(!doc.exists){
        movieDoc
        // place current movie into list
        .set({ entityId: this.props.id }) 
        // add action to HistoryLlist
        .then(() => {
          this.setState({ exists: true });
          alert("Movie: [ " + u.original_title + " ] has been added to your " + listOption + " shelf")

          let time = moment().format('X').toString();

          // Add to history list
          historyCol.add({
            name: u.original_title,
            url: `/movie/detail/${this.props.id}`,
            actionType: 'added',
            entityType: 'movie',
            listOp: listOption,
            timestamp: time
          })
          .then(ref => {
          console.log('Added action to historyList with ID: ', ref.id);
          });

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

    let historyCol = db.collection("users")
      .doc(user.email)
      .collection("historyList")

    movieDoc.get()
      .then(doc => {
        // check of doc exists
        if (doc.exists) {
          // if it  exists, delete it
          movieDoc
            .delete()
          this.setState({ exists: false });
          alert("Movie: [ " + u.original_title + " ] has been removed from your " + listOption + " list")

          let time = moment().format('X').toString();

          historyCol.add({
            name: u.original_title,
            url: `/movie/detail/${this.props.id}`,
            actionType: 'removed',
            entityType: 'movie',
            listOp: listOption,
            timestamp: time
          })
            .then(ref => {
              console.log('Added action to historyList with ID: ', ref.id);
            });

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

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    console.log("movie detail has mounted")
    // get current user

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(" componentDidMount: listener onAuthStateChanged: fired")

      var authPromise = new Promise(function(resolve,reject){
        if (user) {
          email.push(user.email);
          resolve(user.email);
        } else { 
          console.log("No user signed in")
          reject();
        }
      });

      authPromise.then((userEmail)=>{
        console.log("verifying userEmail " + userEmail);
      })
    })


    sleep(2000).then(() => {

    fetch(this.url)
      .then(response => {
        console.log("componentDidMount: BEGIN FETCH")
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
        
        // RESPONSE DATA OF MOVIE HAS BEEN RECIEVED
        this.setState({ movie: responseData,
          entityName: responseData.original_title,
          entityId: responseData.id.toString(),
          currentUserEmail: email[0]});

        console.log("current state is: " + this.state.movie + this.state.entityName + this.state.entityId + this.state.currentUserEmail);
        console.log("componentDidMount: ENTITY FETCH FINISHED")

        // getting individual db rating for movie
          const db = firebase.firestore()
          console.log("current state is: " + this.state.entityName + this.state.entityId + this.state.currentUserEmail);

          let rating =0;
          let ratings=[];

          // firestore references
          let ratingRef = db.collection("users")
            .doc(this.state.currentUserEmail)
            .collection(entityType)
            .doc("ratings")
            .collection(this.state.entityName)
            .doc(this.state.entityId);

          let allRatingsRef = db.collection(entityType)
            .doc(this.state.entityName)
            .collection(this.state.entityId.toString());

          //get individual rating
          ratingRef.get()
          .then(doc=>{
            if(!doc.exists){
              console.log('No rating exists yet!');
              rating = 0;
              this.setState({initialRating: rating});
            } else {
              console.log('Returning data:' + doc.data().rating);
              rating = doc.data().rating;
              console.log("check" + rating);
              if (rating === null){
                rating = 0;
              }

              this.setState({initialRating: rating});
            }
          })
          .catch(err=>{
            console.log("get() failed: " + err);
          })

          allRatingsRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
              ratings.push(doc.data().rating);
            });
            console.log("ratings array verify: " + ratings);
            // check if ratings is empty, if so add into first element a 0 - safety feature
            if (ratings.length < 1){
              ratings[0] = 0;
            }

            this.setState({allRatings: ratings})
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      })
      .catch(error => { // catch for resposneData
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
    }) // sleep end
   

  }

  render() {
    document.title = `Movie ${this.props.id} detail`;
    // check if movie exists

    function EntityExists(props) {
      const doesExist = props.doesExist;
      if (doesExist) {
        return <dd>Movie was added to your shelf </dd>;
      } else if (doesExist === false) {
        return <dd>Movie was removed from your shelf</dd>;
      } else if (doesExist === null) {
        return <dd><br></br></dd>
      }
    }
  
    // For coding convenience, create a shortcut object
    const u = this.state.movie;
    const email = this.state.currentUserEmail;

    return (
      <div>
        {this.state.httpStatusOk ? (
          <div>
          <div className="row">
            <div className="col-md-12">
              <dl className="dl-horizontal">
                <br></br>
                <dd><h1>{u.original_title}</h1> 

                { console.log("rendering starRating" + this.state.initialRating) }
                {/* will never render if attempted to pass null or undefined stuff */}
                { email !== undefined && this.state.initialRating !== null ? (
                  <StarRating 
                    entityTitle={u.original_title} 
                    entityId={u.id} 
                    initialRating={this.state.initialRating} 
                    email={this.state.currentUserEmail} 
                    allRatings={this.state.allRatings} 
                    entityType={entityType}></StarRating>
                ) : (<div>Log in to see rating</div>) }
                
                { email !== undefined ? (<div>{this.TooltipList("watched")} {this.TooltipList("to-watch")} {<Note type= {'Detail'} movie = {this.state.movie} ></Note>}</div>) : <div></div>  }
                
                <EntityExists doesExist={this.state.exists} />
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
            <hr />
            <Review itemId={this.props.id} itemName={u.original_title}/>
            
          </div> <Button href='/movies'>Show list of movies</Button></div>
        ) : (
            <p></p>
            //Requested movie was not found
          )}

        <br />
       
      </div>
    )
  }



}



export default MovieDetail
