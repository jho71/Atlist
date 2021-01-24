import React, { Component } from 'react'
import * as firebase from 'firebase'
import { withAuthorization } from '../Sessions/Index'

class UsersReview extends Component {

    url = "https://salty-hollows-07248.herokuapp.com/api/persons"

    constructor(props) {
        super(props)

        this.state = { id: '', reviews: [] }
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
                    <hr />
                </div>
            )
        })
        return <tbody>{rows}</tbody>
    }

    TableRow(props) {
        var user = firebase.auth().currentUser
        if (user.email === props.email) {
            return (
                <div width="100%">
                    <tr>
                        <a href={"movie/detail/" + props.id}><td>{props.id}{props.email}{props.full_name}</td></a>
                    </tr>
                </div>
            )
        }
        else return (null)
    }

    render() {
        return (
            <div>
                <table width="100%" border-spacing="50px">
                    {this.TableHeader()}
                    {this.TableBody(this.state.reviews)}
                </table>
            </div>
        )
    }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(UsersReview)