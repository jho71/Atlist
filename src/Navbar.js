import React from 'react'
import { Button, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap'
import { AuthUserContext } from './Sessions/Index'
import Logout from './User/Logout'
import './App.css'
const Navigationbar = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <UserNav /> : <GuestNav />}
        </AuthUserContext.Consumer>
    </div>
)

const UserNav = () => (
    <Navbar bg="primary" variant="dark">
        <Nav>
            <Navbar.Brand href="/">AtList</Navbar.Brand>
            <Nav.Item>
                <Nav.Link href="/movies">Movies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/books">Books</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/shows">TV Shows</Nav.Link>
            </Nav.Item>
        </Nav>
        <Nav className="ml-auto" >
            <Nav.Item>
            <DropdownButton id="dropdown-basic-button" title="Friends">
  <Dropdown.Item href="/FriendSearch">Search/Invite friends</Dropdown.Item>
  <Dropdown.Item href="/Recieved">Requests recieved</Dropdown.Item>
  <Dropdown.Item href="/FriendList">Friend list</Dropdown.Item>

</DropdownButton>
            {/* <Nav.Link href="/FriendSearch"><Button variant="outline-light">Friends</Button></Nav.Link> */}
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/shelf"><Button variant="outline-light">Shelf</Button></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/modifyuser"><Button variant="outline-light">User Account</Button></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/login"> <Logout /> </Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
)

const GuestNav = () => (
    <Navbar bg="primary" variant="dark">
        <Nav>
            <Navbar.Brand href="/">AtList</Navbar.Brand>
            <Nav.Item>
                <Nav.Link href="/movies">Movies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/books">Books</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/shows">TV Shows</Nav.Link>
            </Nav.Item>
        </Nav>
        <Nav className="ml-auto" >
            <Nav.Item>
                <Nav.Link href="/register"><Button variant="outline-light">Register</Button></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/login"><Button variant="outline-light">Login</Button></Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
)

export default Navigationbar