import React, { Component } from 'react'
import * as firebase from 'firebase'

var email = []
var list = []
class FriendList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            emails: []
        }
    }

    componentDidMount() {
var db =firebase.firestore()
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                email.push(user.email)
            // console.log(email)
             }
            else {
                console.log("No user signed in")
            }
            
        })
        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
        
        // grab all the data
        sleep(2000).then(() => {
             db.collection('searchUsers')
            .doc(email[0])
            .collection('friends-accepted')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.id)
             
            for (var i = 0; i < data.length; i++) {
                // pushes all movie ids one by one
                //console.log(data[i])
                list[i]= data[i]
                console.log(list[i])
                 this.setState({emails : [...this.state.emails,list[i] ]}) 
            }   

        })})            
    }
 
     
    render() {
        document.title = 'AtList - Friend List'

        return (
               <div>      
                   <h1>Friends List</h1>          
            <TableBody result={this.state.emails} />

            </div>   
        )
    }
}

export default FriendList


const TableBody = (props) => {
    let rows = props.result.map((result, index) =>{
    console.log(props.result + " tb")
      return(
        <TableRow result={result} key={index}/>
      );
    });
    return <tbody>{rows}</tbody>
  }

const TableRow = props =>{
    const a = props.result;
    console.log(a + " tr")

    return(
      // in order of thead
    <tr>
     
      <td>{a}</td>
      
    </tr>
    )
  }