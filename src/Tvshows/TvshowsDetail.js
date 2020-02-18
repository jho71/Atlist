import React, { Component } from 'react'
import * as moment from 'moment'
import Button from 'react-bootstrap/Button' 
import * as firebase from 'firebase'
import Popup from "reactjs-popup";

class ShowDetail extends Component {

  // Class properties 

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

    showDoc.get()
    .then(doc => {
      // if doc does not exist
      if(!doc.exists){
        showDoc
        .set({ showID: this.props.id })
        .then(() => {
          this.setState({ exists: true });
          alert("Tv Show: [ " + u.original_name + " ] has been added to your " + listOption + " shelf")
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

    showDoc.get()
    .then(doc => {
      // check of doc exists
      if(doc.exists){
        // if it  exists, delete it
        showDoc
        .delete()
        this.setState({ exists: false });
        alert("Tv Show: [ " + u.original_name + " ] has been removed from your list")
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

    // Get one
    fetch(this.url)
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
        this.setState({ show: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
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
                <dd><h1>{u.original_name}</h1>
                <EntityExists doesExist={this.state.exists} />
                {this.TooltipList("watched")} {this.TooltipList("to-watch")}
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

              </dl>
            </div>
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
