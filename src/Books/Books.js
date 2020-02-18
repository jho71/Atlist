import React, { Component } from 'react'
import * as moment from 'moment'
import Button from 'react-bootstrap/Button'

import {
  withRouter
} from 'react-router-dom';

class BookList extends Component {

  constructor(props) {
    super(props);

    this.state = { result: [], result2: [], value: '' };

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


  componentDidMount() {
    fetch(this.url)
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
        this.setState({ result: response.results });
        //   console.log(response.results);
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  render() {
    document.title = 'AtList - Books'

    return (
      <div className="App">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <label>
            <h5>Search by ISBN13</h5>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          &nbsp;&nbsp;&nbsp;
            <Button type="submit">Submit</Button>
        </form>
        <div>
          &nbsp;
            <table className='table table-striped'>
            <TableHeader />

            <TableBody result={this.state.result} />
          </table>
        </div>
      </div>
    )
  }
}
/* function getImageLinkForIsbn(i) {
    console.log("getting image for isbn... ")

    let link = '';

    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + i + "&key=AIzaSyBUolCuv1S8IOygxy8wrd7U9HWz2UjQYgY")
    .then(response =>{
      //this.setState({ httpStatusCode: response.status, httpStatusOk: response.httpStatusOk});

      // error checking
      if(response.ok){
        // resonse body as json

        return response.json();
      } else if (response.status === 404){
        // Not found
        throw Error('HTTP 404, not found');
      } else {
        // else again
        throw Error(`HTTP &{response.status}, &{response.statusText}`);
      } 
    })
    //responseData is an object, look inside of its data property
    .then(response => {
      this.setState({link: response.results});
 //   console.log(response.results);
    })
    .catch(function (error){
      console.log(error)
    });
  }*/


export default withRouter(BookList);

const Header = () => {
  return (
    <div>
      <h1>Bestselling Books</h1>
      <label>Newest bestselling books! Choose one that interest you. Don't judge a book by its cover!</label>
      <br /><br />
    </div>
  )


}

const TableHeader = () => {
  return (
    <thead>
      <tr>{
        // <th>Poster:</th>
      }
        <th>Isbn13:</th>
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

  //let imageLink = a.book_details[0].primary_isbn13;

  return (
    // in order of thead
    <tr>{
      //<td><img src={imageLink} alt="profilepic"></img></td>
    }
      <td>{a.book_details[0].primary_isbn13}</td>
      <td>{a.book_details[0].title}</td>
      <td>{a.book_details[0].description}</td>
      <td>{moment(a.published_date).format('LL')}</td>
      {/*<td><Link className='btn btn-default' to={`/person/detail/${a._id}`}>More Details</Link>&nbsp;&nbsp;</td>*/}
      &nbsp;
    </tr>
  )
}