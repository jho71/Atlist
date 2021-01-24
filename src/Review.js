import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import * as firebase from 'firebase'
import { withAuthorization } from './Sessions/Index'

class Review extends Component {

    url = "https://salty-hollows-07248.herokuapp.com/api/persons"

    constructor(props) {
        super(props)

        this.state = { id: '', value: '', review: '', reviews: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        fetch(this.url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 404) {
                    throw Error('HTTP 404, Not found')
                } else {
                    throw Error(`HTTP ${response.status}, ${response.statusText}`)
                }
            })
            .then(responseData => {
                this.setState({ reviews: responseData, id: this.props.itemId })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        var user = firebase.auth().currentUser
        var tempString = " says: " + this.props.itemName + ": " + this.state.value
        const newReview = { 'id': this.props.itemId, 'full_name': tempString, 'email': user.email}

        fetch(this.url, {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else if (response.status >= 400 && response.status < 500) {
                    throw Error(`HTTP ${response.status}, ${response.statusText}`)
                } else {
                    throw Error(`HTTP ${response.status}, ${response.statusText}`)
                }
            })
            .then(responseData => {
                console.log(responseData)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }


    handleDelete(e) {
        var deleteUrl = `https://salty-hollows-07248.herokuapp.com/api/persons/${this.state.id}`

        fetch(deleteUrl, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    return response.status
                } else if (response.status >= 400 && response.status < 500) {
                    throw Error(`HTTP ${response.status}, ${response.statusText}`)
                } else {
                    throw Error(`HTTP ${response.status}, ${response.statusText}`)
                }
            })
            .then(responseData => {
                console.log(responseData)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })

    }

    TableHeader() {
        return (
            <thead>
                <tr>
                    <th><h4>Reviews</h4></th>
                </tr>
                <hr />
            </thead>
        );
    }

    TableBody(props) {
        let rows = props.map((rev) => {
            return (
            <div>
                {this.TableRow(rev)}
            </div>
            )
        })
        return <tbody>{rows}</tbody>
    }


    TableRow(props) {
        if (this.props.itemId === props.id) {
            var user = firebase.auth().currentUser
            if (user.email === props.email) {
                return (
                    <div width="100%">
                    <tr>
                        <td>{props.email}{props.full_name}</td>
                    </tr>
                    <br />
                    <Button onClick={() => this.handleDelete(props.id)}> Remove Comment </Button>
                    </div>
                )
            }
            else {
                return (
                <tr>
                    <td>{props.email}</td>
                    <td>{props.full_name}</td>
                </tr>
                )
            }
        }
        else return (null)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Add A Review</h2>
                    <textarea rows="4" cols="50" value={this.state.value} onChange={this.handleChange} /> <br />
                    <Button onClick={this.handleSubmit}> Add Review </Button>
                </form>
                <br />
                <table width="100%" border-spacing="50px">
                    {this.TableHeader()}
                    {this.TableBody(this.state.reviews)}
                </table>
            </div>
        )
    }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Review)