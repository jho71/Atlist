import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import * as firebase from 'firebase'
import Popup from "reactjs-popup";

class BookDetail extends Component {

  // Class properties 

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
  };

  handleClickAdd(listOption) {
    var db = firebase.firestore()
    console.log('this is:', this.props.id)

    var user = firebase.auth().currentUser

    const u = this.state.book;

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

    let bookDoc = db.collection("users")
    .doc(user.email)
    .collection("books")
    .doc("section")
    .collection(listOption)
    .doc(u.title)

    bookDoc.get()
    .then(doc => {
      // if doc does not exist
      if(!doc.exists){
        bookDoc
        .set({ bookID: this.props.id })
        .then(() => {
          this.setState({ exists: true });
          alert("Book: [ " + u.title + " ] has been added to your " + listOption + " shelf")
        })
      } else {
        alert("This book already exists in your " + listOption + " shelf")
        this.setState({ exists: null });
        
      }
    })
    .catch(err => {
      alert("Error connecting to server")
    });

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

    bookDoc.get()
    .then(doc => {
      // check of doc exists
      if(doc.exists){
        // if it  exists, delete it
        bookDoc
        .delete()
        this.setState({ exists: false });
        alert("Book: [ " + u.title + " ] has been removed from your " + listOption + " shelf")
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
    console.log("book detail mounted");
    // Get one
    fetch(this.url)
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
        this.setState({ book: responseData.items[0].volumeInfo, bookPic: responseData.items[0].volumeInfo.imageLinks.thumbnail} );

        console.log(this.state.book)

        console.log("Current book pic " + this.state.bookPic)
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
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
            <h1>{u.title}</h1> 
            <EntityExists doesExist={this.state.exists} />
            {this.TooltipList("read")} {this.TooltipList("to-read")}
              <dl>
              <br></br>
               <dt><img src={p} alt="profilepic"></img></dt>
               <dt>Subtitle</dt>              <dd>{u.subtitle}</dd>
               <dt>Description</dt>           <dd>{u.description}</dd>
               <dt>Author</dt>                <dd>{u.authors}</dd>
               <dt>Publisher</dt>             <dd>{u.publisher}</dd>
               <dt>Publishing Date</dt>       <dd>{u.publishedDate}</dd>
               <dt>Page Count</dt>            <dd>{u.pageCount}</dd>

              </dl>
            </div>
          </div>

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
