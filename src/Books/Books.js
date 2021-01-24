import React, { Component } from 'react'
import * as moment from 'moment'
import $ from 'jquery'

import {
  withRouter
} from 'react-router-dom';

class BookList extends Component {

  constructor(props) {
    super(props);

    this.state = { result: [],
      result2: [],
      value: '',
      bookTitles: [],
      bookIds: [],
      bookDescs: [],
      bookDates: []

  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log("A: new value for value: " + event.target.value)
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    console.log(" B: state was set: " + this.state.value)
    event.preventDefault();
    this.props.history.push(`/book/detail/${this.state.value}`);
  }

  // constructor

  url = "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=gq8uX5U4JowrpElyB4ZP6m4wXx8moG9A"
  googleURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:**isbn**&key=AIzaSyBUolCuv1S8IOygxy8wrd7U9HWz2UjQYgY"

  initialUrl = "https://www.googleapis.com/books/v1/volumes?q=dreams&key=AIzaSyCsBBANgxmahbgmDhSJY_PohBawwQQOOGw"

  // initial display of books
  componentDidMount() {
    fetch(this.initialUrl)
      .then(response => {
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.httpStatusOk });

        // error checking
        if (response.ok) {
          // resonse body as json

          return response.json();
        } else if (response.status === 404) {
          // Not found
          throw Error('HTTP 404, not found');
        } else {
          // else again
          throw Error(`HTTP &{response.status}, &{response.statusText}`);
        }
      })
      //responseData is an object, look inside of its data property
      .then(response => {
        console.log("Initial Response:");
        // object with 10 objects inside expected
        console.log(response.items);
        
        var books = [];
        var booksInfo = [];

        response.items.map((element, i) =>{
      //    console.log(i + "A.")
      //    console.log(element)
          books.push(element);
          return null;
        });

        books.map((element, i) => {
      //    console.log(i)
      //    console.log(element)
          booksInfo.push(element.volumeInfo);
          return null;
        })

        console.log("Books content")
      //  console.log(booksInfo);
      this.setState({ result: booksInfo });

        console.log(this.state.result)

      })
      .catch(function (error) {
        console.log(error)
      });
  }
  
  search(searchTerm){
    console.log("Perfoming search from google books")
    const urlString = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=AIzaSyCsBBANgxmahbgmDhSJY_PohBawwQQOOGw"
    $.ajax({
      url: urlString,
      success:(searchResult)=>{
        console.log("Data fetched")
        //this.setState({result: searchResult.items});
    
        /*
        if(!Object.keys(searchResult.items).length){
          console.log("No data found");
        }
        */

      var p = new Promise((resolve,reject)=>{
        var books = [];
        var booksInfo = [];
  
        searchResult.items.map((element, i) =>{
          books.push(element);
          return null;
        });
        books.map((element, i) => {
          booksInfo.push(element.volumeInfo);
          return null;
        })
        console.log("Books content")
        //  console.log(booksInfo);
        resolve(booksInfo);
      })
      
      
      p.then((data) =>{
        this.setState({ result: data });
      }).catch((err) =>{
        console.log(err);
      })

    
       console.log(this.state.result)
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.search(searchTerm)
  }

  render() {
    document.title = 'AtList - Books'
    if(Object.keys(this.state.result).length){

    return (
      <div className="App">
        <Header />  
        <input style={{
        fontSize: 24,
        display: 'block',
        width: "99%",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16
      }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>

        <div>
          &nbsp;
          <table className = 'table table-striped'>
            <TableHeader />
            <TableBody result={this.state.result} />
          </table>
        </div>
      </div>
      )  
      }
      else return(
        <div className="App">
          <Header />  
          <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>
    
      <p>No matches, sorry</p>
      </div>)
    }
}


export default withRouter(BookList);

const Header = () => {
  return (
    <div>
      <br/>
      <h1>Bestselling Books</h1>
      <label>Newest bestselling books! Choose one that interest you. Don't judge a book by its cover!</label>
      <br /><br />
    </div>
  )
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Poster:</th>
        <th>Title:</th>
        <th>Description:</th>
        <th>Release Date:</th>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  let rows = props.result.map((result, index) => {

    return (
      <TableRow result={result} key={index} />
    );
  });
  return <tbody>{rows}</tbody>
}

const TableRow = props => {
  const a = props.result;
  var ID = null;
  var img = null;

  try {
    ID = a.industryIdentifiers[1].identifier
    img = a.imageLinks.thumbnail
  } catch(err){
    console.log("async error")
  }

//  const b = props.result2
 // console.log(props.result)
 // console.log("res2"+props.result2)
  if (ID !== null && img !== null){
    return (
      // in order of thead
      <tr>
      <td><a href={`/book/detail/${a.industryIdentifiers[1].identifier}`}><img id="book_poster" src={img} alt="book_poster"></img></a></td>
        <td>{a.title}</td>
        <td>{truncateString(a.description)}</td>
        <td>{moment(a.publishedDate).format('LL')}</td>
      </tr>
    )
  } else return (<p></p>)
  
}
const truncateString = (str) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
var num = 200
var tmp_str = String(str)
  if (!str) {
    return "No description availible right now"
  }
  if (tmp_str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...'
}