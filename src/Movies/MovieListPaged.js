import React, { Component } from 'react'
import * as moment from 'moment'
import { Link } from "react-router-dom"
import $ from 'jquery'

class MovieListPaged extends Component {

state = { result: [] }
url = `https://api.themoviedb.org/3/movie/popular?api_key=929731b62f68993f7b40b443978575d3&language=en-US&page=${this.props.id}`;

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
      .then(responseData => {
        this.setState({result: responseData.results, currentPage: parseInt(this.props.id)});
        //debugging
        console.log(responseData.results);
        console.log(this.currentPage)
      })
      .catch(function (error){
        console.log(error)
      });
      
  }
  search(searchTerm){
    console.log("Perfoming search from movie db")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=929731b62f68993f7b40b443978575d3&query=" + searchTerm
    $.ajax({
      url: urlString,
      success:(searchResult)=>{
        console.log("Data fetched")
        this.setState({result: searchResult.results});
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
      document.title = `AtList - Movies, Page ${this.props.id}`
      let page = this.props.id;
        if(Object.keys(this.state.result).length){
    
        return (
          <div className="App">
            <Header id={page}/>  
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
            <Header id={page}/>  
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
  
  export default MovieListPaged;
  
  const Header = (props) => {
    function pageStatus(){
      if (parseInt(props.id) > 10 && parseInt(props.id) < 500){
        return 10;
      } else if (parseInt(props.id) > 1 && parseInt(props.id) <= 10){
        return 1;
      } else if (parseInt(props.id) === 1) {
        return 0;
      } else {
        return -1;
      }
    }
    var nextPage = parseInt(parseInt(props.id) + 1);
    var next10 = parseInt(parseInt(props.id) + 10);
    var lastPage = parseInt(parseInt(props.id) - 1);
    var last10 = parseInt(parseInt(props.id) - 10);

    if (pageStatus() === 10){
      return ( 
        <div>
           <div> 
              <h1>Popular Movies</h1>
              <h5>page {props.id}</h5>
              <br></br>
              <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${last10}`}><label>Go Back 10 Pages</label></a>
              <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${lastPage}`}><label>Previous Page</label></a>
              <Link className='btn btn-default' to={`/movies`}><label>Return to page list</label></Link>
              <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${nextPage}`}><label>Next Page</label></a>
              <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${next10}`}><label>Skip 10 Pages</label></a>
          </div>
        </div>
      )
    } else if (pageStatus() === 1){
      return(
      <div>
        <div> 
           <h1>Popular Movies</h1>
           <h5>page {props.id}</h5>
           <br></br>
           <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${lastPage}`}><label>Previous Page</label></a>
           <Link className='btn btn-default' to={`/movies`}><label>Return to page list</label></Link>
           <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${nextPage}`}><label>Next Page</label></a>
           <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${next10}`}><label>Skip 10 Pages</label></a> 
       </div>
     </div>
     )
    } else if (pageStatus() === 0){
      return(
      <div>
        <div> 
           <h1>Popular Movies</h1>
           <h5>page {props.id}</h5>
           <br></br>
           <Link className='btn btn-default' to={`/movies`}><label>Return to page list</label></Link>
           <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${nextPage}`}><label>Next Page</label></a>
           <a className='btn btn-default' type="text/css" rel="stylesheet" href={`/movies/page/${next10}`}><label>Skip 10 Pages</label></a> 
       </div>
     </div>
      )
    } else{
      return(<div>
        <div> 
           <h1>Popular Movies</h1>
           <h5>Invalid page :(</h5>
           <br></br>
           <Link className='btn btn-default' to={`/movies`}><label>Return to page list</label></Link>
       </div>
     </div>)
    }
  }

  const TableHeader = () =>{
    return(
      <thead>
        <tr>
          <th>Poster:</th>
          <th>Title:</th>
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
      <td><a href={`/movie/detail/${a.id}`}><img src={"https://image.tmdb.org/t/p/w200" + a.poster_path} alt="profilepic"></img></a></td>
      <td>{a.title}</td>
      <td>{moment(a.release_date).format('LL')}</td>
      {/*<td><Link className='btn btn-default' to={`/person/detail/${a._id}`}>More Details</Link>&nbsp;&nbsp;</td>*/ }
      &nbsp;
    </tr>
    )
  }
