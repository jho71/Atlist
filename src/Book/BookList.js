import React, { Component } from 'react'
import * as moment from 'moment';
import '../App.css'

class BookList extends Component {
 
state = { result: [] ,result2: []}

url = "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=gq8uX5U4JowrpElyB4ZP6m4wXx8moG9A";
googleURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:**isbn**&key=AIzaSyBUolCuv1S8IOygxy8wrd7U9HWz2UjQYgY"


  componentDidMount(){
      fetch(this.url)
      .then(response =>{
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.httpStatusOk});

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
        this.setState({result: response.results});
        this.updateBestSellers(response);
   //   console.log(response.results);
      })
      .catch(function (error){
        console.log(error)
      });
  }
   
  
   

     updateBestSellers(nytimesBestSellers) {
       var myObj;
       var json = [];
    nytimesBestSellers.results.forEach(function(book) {
      var isbn = book.isbns[1].isbn10;
    //  var bookInfo = book.book_details[0];
     // console.log(isbn);
      myObj= JSON.stringify(updateCover(isbn));
      json.push(myObj);
    })
    console.log(JSON.stringify(json));
      return json;};

   

    render() {
      document.title = 'AtList - Books'
  
      return (
        <div className="App">
          <Header />
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
  }
  function updateCover(i) {
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + i + "&key=AIzaSyBUolCuv1S8IOygxy8wrd7U9HWz2UjQYgY", {
      method: 'get'
    })
    .then(response => { return response.json();
    })
    .then(data => {
   //   console.log(data);
    // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
    //  var img = data.items[0].volumeInfo.imageLinks.thumbnail;
    // img = img.replace(/^http:\/\//i, 'https://');
    //  console.log(img)
     return data ;
    }) 
   
    .catch(function (error){
      console.log(error)
    });
  }
  export default BookList;

  const Header = () => {
    return (
        <h1>Popular Books</h1>
    )
  }

  const TableHeader = () =>{
    return(
      <thead>
        <tr>
          <th>Poster:</th>
          <th>Id:</th>
          <th>Title:</th>
          <th>Description:</th>
          <th>Rating:</th>
          <th>Release Date:</th>
        </tr>
      </thead>
    );
  }

  const TableBody = (props) => {
    let rows = props.result.map((result, index) =>{

      return(
        <TableRow result={result} key={index}/>
      );
    });
    return <tbody>{rows}</tbody>
  }

  const TableRow = props =>{
    const a = props.result;

    return(
      // in order of thead
    <tr>
      <td><img src={a.sce} alt="profilepic"></img></td>
      <td>{a.kind}</td>
      <td>{a.book_details[0].title}</td>
      <td>{a.book_details[0].description}</td>
      <td>{a.vote_average}</td>
      <td>{moment(a.published_date).format('LL')}</td>
      {/*<td><Link className='btn btn-default' to={`/person/detail/${a._id}`}>More Details</Link>&nbsp;&nbsp;</td>*/ }
      &nbsp;
    </tr>
    )
  }
