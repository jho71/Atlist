import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Movies from './Movies/Movies'
import MovieListPaged from './Movies/MovieListPaged'
import MovieDetail from './Movies/MovieDetail'

import Books from './Books/Books'
import BookDetail from './Books/BookDetail';

import Shows from './Tvshows/Tvshows'
import ShowListPaged from './Tvshows/TvshowsListPaged'
import ShowDetail from './Tvshows/TvshowsDetail'

import Login from './User/Login'
import Register from './User/Register'

import Profile from './User/Profile'
import Settings from './User/Settings'
import Navbar from './Navbar'
import Shelf from './Shelf'

import FriendSearch from './Friends/FriendSearch'
import Recieved from './Friends/Recieved'
import FriendList from './Friends/FriendsList'

import withAuthentication from './Sessions/WithAuth'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

class App extends Component {
  render() {
    document.title = 'AtList'
    return (
      <div className="App">
        <Navbar />
        <div className="container">
        <Switch>
          <Route exact path='/' render={() => (<Home />)} />
          <Route exact path='/movies' render={() => (<Movies />)} />
          <Route exact path='/movies/page/:id' render={(props) => (<MovieListPaged id={props.match.params.id} />)} />
          <Route exact path='/movie/detail/:id' render={(props) => (<MovieDetail id={props.match.params.id} />)} />
          
          <Route exact path='/shows' render={() => (<Shows />)} />
          <Route exact path='/shows/page/:id' render={(props) => (<ShowListPaged id={props.match.params.id} />)} />
          <Route exact path='/show/detail/:id' render={(props) => (<ShowDetail id={props.match.params.id} />)} />

          <Route exact path='/books' render={() => (<Books />)} />
          <Route exact path='/book/detail/:id' render={(props) => (<BookDetail id={props.match.params.id} />)} />

          <Route exact path='/FriendList' render={() => (<FriendList />)} />
          <Route exact path='/FriendSearch' render={() => (<FriendSearch />)} />
          <Route exact path='/Recieved' render={() => (<Recieved />)} />
          
          <Route exact path='/login' render={() => (<Login />)} />
          <Route exact path='/register' render={() => (<Register />)} />

          <Route exact path='/modifyuser' render={() => (<Settings />)} />
          <Route exact path='/profile' render={()=> (<Profile />)} />
          <Route exact path='/shelf' render={() => (<Shelf />)} />

          <Route render={() => (<NotFound />)} />
        </Switch>
        </div>
      </div>
    )
  }
}

export default withAuthentication(App)

const Home = () => {
  return (
    <div className="home">
    <Row>
    <Col sm="12" md={{ size: 6}}>
      <h1>What would you like to search?</h1>
      <Button><a href='/movies'><h2 className="home">Movies</h2></a></Button>
      <Button><a href='/shows'><h2 className="home">Shows</h2></a></Button>
      <Button> <a href='/books'><h2 className="home">Books</h2></a></Button>

    </Col>
  </Row>
  </div>
  )
}

const NotFound = () => {
  return (
    <div>
      <p> Page not found. </p>
    </div>
  )
}