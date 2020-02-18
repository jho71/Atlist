import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MovieShelf from './Movies/MovieShelf'
import BookShelf from './Books/BookShelf'
import TvshowShelf from './Tvshows/TvshowShelf'
import { withAuthorization, AuthUserContext } from './Sessions/Index'

class Shelf extends Component {

    render() {
        return (
            <div>

                <AuthUserContext.Consumer>
                    {authUser => (
                        <div className="shelf">
                            <h1>{authUser.email}'s Shelf</h1>
                        </div>
                    )}
                </AuthUserContext.Consumer>

                <Tabs defaultActiveKey="movies" id="uncontrolled-tab-example">
                    <Tab eventKey="movies" title="Movies">
                        <MovieShelf />
                    </Tab>
                    <Tab eventKey="books" title="Books">
                        <BookShelf />
                    </Tab>
                    <Tab eventKey="tvshows" title="TV Shows">
                        <TvshowShelf />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}


const condition = authUser => !!authUser
export default withAuthorization(condition)(Shelf)
