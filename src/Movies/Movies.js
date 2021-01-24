import React, { Component } from 'react'
import * as moment from 'moment'
import { Link } from "react-router-dom"
import $ from 'jquery'

class Movies extends Component {

state = { result: [], currentPage: 0 }
url = "https://api.themoviedb.org/3/movie/popular?api_key=929731b62f68993f7b40b443978575d3&language=en-US&page=1";


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
        this.setState({result: responseData.results});
        //debugging
        console.log(responseData.results);
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
  
  export default Movies;
  
  const Header = () => {

    return (
      <div> 
        <br></br>
        <h1>Popular Movies</h1>
        <h5>Page 1</h5>
      
        <Link className='btn btn-default' to={`/movies`}><label>1</label></Link>
        <Link className='btn btn-default' to={`/movies/page/2`}><label>2</label></Link>
        <Link className='btn btn-default' to={`/movies/page/3`}><label>3</label></Link>
        <Link className='btn btn-default' to={`/movies/page/4`}><label>4</label></Link>
        <Link className='btn btn-default' to={`/movies/page/5`}><label>5</label></Link>
        <Link className='btn btn-default' to={`/movies/page/6`}><label>6</label></Link>
        <Link className='btn btn-default' to={`/movies/page/7`}><label>7</label></Link>
        <Link className='btn btn-default' to={`/movies/page/8`}><label>8</label></Link>
        <Link className='btn btn-default' to={`/movies/page/9`}><label>9</label></Link>
        <Link className='btn btn-default' to={`/movies/page/10`}><label>10</label></Link>  
    </div>
    )
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

    console.log(a.id);

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
