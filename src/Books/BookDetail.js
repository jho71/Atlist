import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
<<<<<<< HEAD
import Popup from "reactjs-popup";
import * as firebase from 'firebase'
import * as moment from 'moment'
import Review from '../Review'
import Note from './BooksNoteModal'
import '../App.css'
import StarRating from '../Utility/StarRating'

var email = [];
var entityType = "book";
=======
import * as firebase from 'firebase'
import Popup from "reactjs-popup";
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2

class BookDetail extends Component {

  // Class properties 

<<<<<<< HEAD
  state = { 
    book: {},
    bookPic: {},
    httpStatusCode: 0,
    httpStatusOk: true, 
    exists: null,
    currentUserEmail: null,
    entityName: null,
    entityId: null,
    initialRating: null,
    allRatings: [] };

  url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.id}&key=AIzaSyCsBBANgxmahbgmDhSJY_PohBawwQQOOGw`;

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
  state = { book: {}, bookPic: {}, httpStatusCode: 0, httpStatusOk: true, exists: null };

  url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.id}&key=AIzaSyCsBBANgxmahbgmDhSJY_PohBawwQQOOGw`;

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

    const u = this.state.book;
<<<<<<< HEAD
=======

>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
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
<<<<<<< HEAD
=======

>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
    let bookDoc = db.collection("users")
    .doc(user.email)
    .collection("books")
    .doc("section")
    .collection(listOption)
    .doc(u.title)

<<<<<<< HEAD
    let historyCol = db.collection("users")
    .doc(user.email)
    .collection("historyList")

=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
    bookDoc.get()
    .then(doc => {
      // if doc does not exist
      if(!doc.exists){
        bookDoc
        .set({ bookID: this.props.id })
        .then(() => {
          this.setState({ exists: true });
          alert("Book: [ " + u.title + " ] has been added to your " + listOption + " shelf")
<<<<<<< HEAD

          // Add a new document with a generated id.
          let time = moment().format('X').toString();
          // Add to history list
          historyCol.add({
            name: u.title,
            url: `/book/detail/${this.props.id}`,
            actionType: 'added',
            entityType: 'book',
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
        alert("This book already exists in your " + listOption + " shelf")
        this.setState({ exists: null });
        
      }
    })
    .catch(err => {
      alert("Error connecting to server")
    });

<<<<<<< HEAD
=======
    /*
    db.collection("users")
      .doc(user.email)
      .collection("books")
      .doc("section")
      .collection("read")
      .add({ bookID: this.props.id })
      .then(() => {
        alert("A new book has been added", "Success")
      })
      .catch(error => {
        alert(error.message, "Add book failed")
      });
      */
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
  }

  handleClickRemove(listOption) {
    var db = firebase.firestore()
    console.log('this is:', this.props.id)

    var user = firebase.auth().currentUser

    const u = this.state.book;

    let bookDoc = db.collection("users")
    .doc(user.email)
    .collection("books")
    .doc("section")
    .collection(listOption)
    .doc(u.title)

<<<<<<< HEAD
    let historyCol = db.collection("users")
    .doc(user.email)
    .collection("historyList")

=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
    bookDoc.get()
    .then(doc => {
      // check of doc exists
      if(doc.exists){
        // if it  exists, delete it
        bookDoc
        .delete()
        this.setState({ exists: false });
        alert("Book: [ " + u.title + " ] has been removed from your " + listOption + " shelf")
<<<<<<< HEAD

        let time = moment().format('X').toString();
            // Add to history list
            historyCol.add({
              name: u.title,
              url: `/book/detail/${this.props.id}`,
              actionType: 'removed',
              entityType: 'book',
              listOp: listOption,
              timestamp: time
            })
            .then(ref => {
            console.log('Added action with ID: ', ref.id);
            });
=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
      } else {
        alert("Book does not exist in your " + listOption + "shelf")
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

    console.log("book detail mounted");
    // Get one

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

    sleep(1000).then(() => {
      fetch(this.url)
=======
    console.log("book detail mounted");
    // Get one
    fetch(this.url)
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
      .then(response => {        // Optional...
        console.log(response);
        console.log("attempting to read")
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok});
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
        console.log(responseData.items[0].volumeInfo)
        console.log("ISBN13: " + responseData.items[0].volumeInfo.industryIdentifiers[0].identifier.toString())

        // entityId will be saved as ISBN13
        this.setState({ 
          book: responseData.items[0].volumeInfo, 
          bookPic: responseData.items[0].volumeInfo.imageLinks.thumbnail,
          entityName: responseData.items[0].volumeInfo.title,
          entityId: responseData.items[0].volumeInfo.industryIdentifiers[0].identifier.toString(),
          currentUserEmail: email[0]
        } );

        console.log(this.state.book)
        console.log("Current book pic " + this.state.bookPic)

        // ADD
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

        // ADD


=======
        this.setState({ book: responseData.items[0].volumeInfo, bookPic: responseData.items[0].volumeInfo.imageLinks.thumbnail} );

        console.log(this.state.book)

        console.log("Current book pic " + this.state.bookPic)
        // Optional...
        //console.log(responseData.data);
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
<<<<<<< HEAD
    })


    
=======
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
  }

  render() {
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    document.title = `Book ${this.props.id} detail`;

    function EntityExists(props){
      const doesExist = props.doesExist;
      if (doesExist){
        return <dd>Book was added to your shelf </dd>;
      } else if (doesExist === false) {
        return <dd>Book was removed from your shelf</dd>;
      } else if (doesExist === null) {
        return <dd><br></br></dd>
      }
    }

    console.log("Current state " + this.state.httpStatusOk)

    // For coding convenience, create a shortcut object
    const u = this.state.book;
    const p = this.state.bookPic;

    let empty = isEmpty(p)
    console.log("object is empty: " + empty);

    return (
      <div>
        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

        {(this.state.httpStatusOk && empty !== true) ? (
            
          <div className="row">
            <div className="col-md-12">
<<<<<<< HEAD
            <br/>
            <h1>{u.title}</h1> 

            { console.log("rendering starRating" + this.state.initialRating) }
                
                {/* will never render if attempted to pass null or undefined stuff */}
                { this.state.currentUserEmail !== undefined && this.state.initialRating !== null ? (
                  <StarRating 
                    entityTitle={this.state.entityName}
                    entityId={this.state.entityId} 
                    initialRating={this.state.initialRating} 
                    email={this.state.currentUserEmail} 
                    allRatings={this.state.allRatings} 
                    entityType={entityType}>
                  </StarRating>
                ) : (<div>Log in to see rating</div>) }
                
                { this.state.currentUserEmail !== undefined ? (<div>{this.TooltipList("read")} {this.TooltipList("to-read")} {<Note type= {'Detail'} book = {this.state.book} ></Note>}</div>) : <div></div>  }

            <EntityExists doesExist={this.state.exists} />

              <dl>
              <br></br>
               <dt><img src={p}  id="poster_book" alt="profilepic"></img></dt>
=======
            <h1>{u.title}</h1> 
            <EntityExists doesExist={this.state.exists} />
            {this.TooltipList("read")} {this.TooltipList("to-read")}
              <dl>
              <br></br>
               <dt><img src={p} alt="profilepic"></img></dt>
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
               <dt>Subtitle</dt>              <dd>{u.subtitle}</dd>
               <dt>Description</dt>           <dd>{u.description}</dd>
               <dt>Author</dt>                <dd>{u.authors}</dd>
               <dt>Publisher</dt>             <dd>{u.publisher}</dd>
               <dt>Publishing Date</dt>       <dd>{u.publishedDate}</dd>
               <dt>Page Count</dt>            <dd>{u.pageCount}</dd>
<<<<<<< HEAD
              </dl>
            </div>
            <hr />
            <Review itemId={this.props.id} itemName={u.title}/>
          </div>
=======

              </dl>
            </div>
          </div>

>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
        ) : (
          <p>Requested book was not found</p>
          )}

        <hr />
        <Button href='/books'>Back to book search</Button>
      </div>
    );
  }
  
}

export default BookDetail;
