import React, { Component } from 'react'
import * as moment from 'moment';
import '../App.css'

class ShowList extends Component {

state = { result: [] }
url = "https://api.themoviedb.org/3/tv/popular?api_key=929731b62f68993f7b40b443978575d3&language=en-US&page=1";


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


    render() {
      document.title = 'AtList - Shows'
  
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
  
  export default ShowList;
  
  const Header = () => {
    return (
        <h1>Popular TV Shows</h1>
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
      <td><img src={"https://image.tmdb.org/t/p/w200" + a.poster_path }></img></td>
      <td>{a.id}</td>
      <td>{a.list_name}</td>
      <td>{a.overview}</td>
      <td>{a.vote_average}</td>
      <td>{moment(a.release_date).format('LL')}</td>
      {/*<td><Link className='btn btn-default' to={`/person/detail/${a._id}`}>More Details</Link>&nbsp;&nbsp;</td>*/ }
      &nbsp;
    </tr>
    )
  }
