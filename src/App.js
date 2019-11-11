import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './App.css';

import PersonList from './Person/PersonList';
import PersonDetail from './Person/PersonDetail';
import PersonEdit from './Person/PersonEdit';
import PersonDelete from './Person/PersonDelete';
import PersonCreate from './Person/PersonCreate';

import MovieList from './Movie/MovieList';

import ShowList from './Show/ShowList';

import BookList from './Book/BookList';

import UserList from './User/UserList';
import UserDetail from './User/UserDetail'
import UserEdit from './User/UserEdit'
import UserLogin from './Auth/UserLogin'
import UserRegister from './Auth/UserRegister'
import NotFound from './NotFound'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faExclamationCircle,faCheckCircle)


class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navbar className="navbar navbar-default" />
        <hr />

          <Switch>
            <Route exact path='/' render={() => (<Home />)} />

            <Route exact path='/persons' render={() => (<PersonList />)} />
            <Route exact path='/person/create' render={() => (<PersonCreate />)} />
            <Route exact path='/person/detail/:id' render={(props) => (<PersonDetail id={props.match.params.id} />)} />
            <Route exact path='/person/edit/:id' render={(props) => (<PersonEdit id={props.match.params.id} />)} />
            <Route exact path='/person/delete/:id' render={(props) => (<PersonDelete id={props.match.params.id} />)} />

            <Route exact path='/movies' render={() => (<MovieList />)} />
            <Route exact path='/shows' render={() => (<ShowList />)} />
            <Route exact path='/books' render={() => (<BookList />)} />

            <Route exact path='/users' render={() => (<UserList />)} />
            <Route exact path='/user/detail/:id' render={(props) => (<UserDetail id={props.match.params.id} />)} />
            <Route exact path='/user/edit/:id' render={(props) => (<UserEdit id={props.match.params.id} />)} />
            <Route exact path='/user/login' render={(props) => (<UserLogin id={props.match.params.id} />)} />
            <Route exact path='/user/register' render={(props) => (<UserRegister id={props.match.params.id} />)} />

            <Route render={() => (<NotFound />)} />
          </Switch>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <p>&copy; 2019, Ryan Solana</p>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="header">
      <div className="row">
      <img id="main-pic" src="https://i.ibb.co/jzZ0FcL/atlist.jpg" alt="Italian Trulli"></img>
      </div>
    </div>
  );
}

// Function component for the navigation bar 
const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="nav navbar-nav">
          <li>
           <Link to='/'>Home page</Link>
          </li>
          <li>
            <Link to='/movies'>Movies</Link>
          </li>
          <li>
            <Link to='/shows'>Shows</Link>
          </li>
          <li>
            <Link to='/books'>Books</Link>
          </li>
          <li>
            <Link to='/'>Search</Link>
          </li>
          <li>
            <Link to='/users'>All Users</Link>
          </li>
          <li>
            <Link to='/user/login'>Login</Link>
          </li>
          <li>
            <Link to='/user/register'>Register</Link>
          </li>
          <li>
            <Link to='/404'>Not Found</Link>
          </li>

        </ul>
      </div>
    </div>
    

  );
}

// Function component for a content area
const Home = () => {
  return (
    <div>

      <h1 className="text-center">What are you looking for?</h1>

      <br></br>

      <div classNamme="container">
        <div className="row text-center">
          <div className="col-md-4">
            <h3>Movies</h3>
          </div>

          <div className="col-md-4">
            <h3>Shows</h3>
          </div>

          <div className="col-md-4">
            <h3>Books</h3>
          </div>
        </div>
      </div>

      <p>&nbsp;</p>
    </div>
  );
}
