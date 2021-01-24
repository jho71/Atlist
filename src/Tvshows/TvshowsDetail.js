import React, { Component } from 'react'
<<<<<<< HEAD
import Button from 'react-bootstrap/Button' 
import Popup from "reactjs-popup";
import Review from '../Review'
import * as moment from 'moment'
import * as firebase from 'firebase'
import Note from './TvshowsNoteModal'
import '../App.css'
import StarRating from '../Utility/StarRating'

var email = [];
var entityType = "tvshow";
=======
import * as moment from 'moment'
import Button from 'react-bootstrap/Button' 
import * as firebase from 'firebase'
import Popup from "reactjs-popup";
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2

class ShowDetail extends Component {

  // Class properties 

<<<<<<< HEAD
  state = { show: {},
   httpStatusCode: 0,
   httpStatusOk: false,
   exists: null,
   currentUserEmail: null,
   entityName: null,
   entityId: null,
   initialRating: null,
   allRatings: []
  };

  url = `https://api.themoviedb.org/3/tv/${this.props.id}?api_key=929731b62f68993f7b40b443978575d3&language=en-US`;
 
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
=======
  state = { show: {}, httpStatusCode: 0, httpStatusOk: false, exists: null};

  url = `https://api.themoviedb.org/3/tv/${this.props.id}?api_key=929731b62f68993f7b40b443978575d3&language=en-US`;

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
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
  };

  handleClickAdd(listOption) {
    var db = firebase.firestore()
    console.log('this is:', this.props.id)

    var user = firebase.auth().currentUser

    const u = this.state.show;
    var usersRef = db.doc(`searchUsers/${user.email}`)  
  
    usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        // do stuff with the data
      });
    } else {
      usersRef.set({}) // create the document
    }})
    let showDoc = db.collection("users")
    .doc(user.email)
    .collection("tvshows")
    .doc("section")
    .collection(listOption)
    .doc(u.original_name)

<<<<<<< HEAD
    let historyCol = db.collection("users")
    .doc(user.email)
    .collection("historyList")

=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
    showDoc.get()
    .then(doc => {
      // if doc does not exist
      if(!doc.exists){
        showDoc
        .set({ showID: this.props.id })
        .then(() => {
          this.setState({ exists: true });
          alert("Tv Show: [ " + u.original_name + " ] has been added to your " + listOption + " shelf")
<<<<<<< HEAD

          let time = moment().format('X').toString();
          // Add a new document with a generated id.
          // Add to history list
          historyCol.add({
            name: u.original_name,
            url: `/show/detail/${this.props.id}`,
            actionType: 'added',
            entityType: 'tv-show',
            listOp: listOption,
            timestamp: time
          })
          .then(ref => {
          console.log('Added action with ID: ', ref.id);
          });

=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
        })
      } else {
        alert("Tv Show already exists in your " + listOption + " shelf")
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

    const u = this.state.show;

    let showDoc = db.collection("users")
    .doc(user.email)
    .collection("tvshows")
    .doc("section")
    .collection(listOption)
    .doc(u.original_name)

<<<<<<< HEAD
    let historyCol = db.collection("users")
    .doc(user.email)
    .collection("historyList")

=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
    showDoc.get()
    .then(doc => {
      // check of doc exists
      if(doc.exists){
        // if it  exists, delete it
        showDoc
        .delete()
        this.setState({ exists: false });
        alert("Tv Show: [ " + u.original_name + " ] has been removed from your list")
<<<<<<< HEAD

        // get current unix timestamp
        let time = moment().format('X').toString();

        // track
        historyCol.add({
          name: u.original_name,
          url: `/show/detail/${this.props.id}`,
          actionType: 'removed',
          entityType: 'tv-show',
          listOp: listOption,
          timestamp: time
        })
        .then(ref => {
        console.log('Added action with ID: ', ref.id);
        });
=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
      } else {
        alert("Tv Show does not exist in your list")
        this.setState({ exists: null });
      }
    })
    .catch(err => {
      alert("Error connecting to server")
    });
  }

  componentDidMount() {

<<<<<<< HEAD
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
=======
    // Get one
    fetch(this.url)
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
      .then(response => {
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
<<<<<<< HEAD
        console.log("within rD:" + email[0]);

        this.setState({show: responseData,
          entityName: responseData.original_name,
          entityId: responseData.id.toString(),
          currentUserEmail: email[0]
          });

        console.log("current state is: " + this.state.show + this.state.entityName + this.state.entityId + this.state.currentUserEmail);
        console.log("componentDidMount: ENTITY FETCH FINISHED")

        // getting individual db rating for movie
        const db = firebase.firestore()
        console.log("current state is: " + this.state.entityName + this.state.entityId + this.state.currentUserEmail);

        let rating = 0;
        let ratings = [];

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
          console.log(ratings);
          this.setState({allRatings: ratings})
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });


      }) // then reponseData end
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      }); 

    });

    
=======
        this.setState({ show: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
  }

  render() {
    document.title = `Show ${this.props.id} detail`;

    function EntityExists(props){
      const doesExist = props.doesExist;
      if (doesExist){
        return <dd>Show was added to your shelf </dd>;
      } else if (doesExist === false) {
        return <dd>Show was removed from your shelf</dd>;
      } else if (doesExist === null) {
        return <dd><br></br></dd>
      }
    }

    // For coding convenience, create a shortcut object
    const u = this.state.show;
    return (
      <div>
        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

        {this.state.httpStatusOk ? (
            
          <div className="row">
            
            <div className="col-md-12">
              <dl className="dl-horizontal">
<<<<<<< HEAD
              <br/>
                <dd><h1>{u.original_name}</h1>

                { console.log("rendering starRating" + this.state.initialRating) }
                
                {/* will never render if attempted to pass null or undefined stuff */}
                { this.state.currentUserEmail !== undefined && this.state.initialRating !== null ? (
                  <StarRating 
                    entityTitle={u.original_name}
                    entityId={u.id} 
                    initialRating={this.state.initialRating} 
                    email={this.state.currentUserEmail} 
                    allRatings={this.state.allRatings} 
                    entityType={entityType}>
                  </StarRating>
                ) : (<div>Log in to see rating</div>) }
                
                { this.state.currentUserEmail !== undefined ? (<div>{this.TooltipList("watched")} {this.TooltipList("to-watch")} {<Note type= {'Detail'}  show = {u.original_name} ></Note>}</div>) : <div></div>  }

                <EntityExists doesExist={this.state.exists} />
                
=======
                <dd><h1>{u.original_name}</h1>
                <EntityExists doesExist={this.state.exists} />
                {this.TooltipList("watched")} {this.TooltipList("to-watch")}
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
                </dd>
                <br></br>
                <dd><img src={"https://image.tmdb.org/t/p/w200" + u.poster_path} alt="profilepic"></img></dd>
                <dt>Official Title</dt>     <dd>{u.original_name}</dd>
                <dt>Description</dt>        <dd>{u.overview}</dd>
                <dt>Tagline</dt>            <dd>{u.tagline}</dd>
                <dt>Average Rating</dt>     <dd>{u.vote_average} based on {u.vote_count} ratings</dd>
                <dt>Release Status</dt>     <dd>{u.status}</dd> 
                <dt>Original Language</dt>  <dd>{u.original_language}</dd>
                <dt>Runtime</dt>            <dd>{u.runtime}</dd>
                <dt>Release Date</dt>       <dd>{moment(u.release_date).format('LL')}</dd>
                <dt>Official Website</dt>   <dd>{u.homepage}</dd>
<<<<<<< HEAD
              </dl>
            </div>
            <hr />
            <Review itemId={this.props.id} itemName={u.original_name}/>
=======

              </dl>
            </div>
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
          </div>

        ) : (
          <p>Requested show was not found</p>
          )}

        <hr />
        <Button href='/books'>Show list of TV shows</Button>
      </div>
    );
  }
  
}

export default ShowDetail;
