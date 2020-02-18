import React, { Component } from 'react'
import * as firebase from 'firebase'
 import Button from 'react-bootstrap/Button'

var email = []
var list = []
class Recieved extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            emails: []
        }
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

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
            .collection('friends')
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
 
     handleAccept(){
    
        var db =firebase.firestore()
       

          db.collection('searchUsers')
          .doc(email[0])
          .collection('friends-accepted')
          .doc(this.state.emails[0])
          .set({})

          
          db.collection('searchUsers')
          .doc(this.state.emails[0])
          .collection('friends-accepted')
          .doc(email[0])
          .set({})

          var db =firebase.firestore()
          db.collection('searchUsers')
          .doc(email[0])
          .collection('friends')
          .doc(this.state.emails[0])
          .delete()

          alert("Youve become friends with "+ this.state.emails[0])
        }

      handleDelete(){
    
        var db =firebase.firestore()
        db.collection('searchUsers')
        .doc(email[0])
        .collection('friends')
        .doc(this.state.emails[0])
        .delete()
          alert("Youve rejected "+ this.state.emails[0])
      }
     

    render() {
        document.title = 'AtList - Friend List'

        return (
               <div>      
                   <h1>Requests List</h1>          
            <TableBody result={this.state.emails} />

            <td><Button disabled={!this.state.emails[0]} onClick ={this.handleAccept}>Accept</Button></td>
      <td><Button disabled={!this.state.emails[0]} onClick ={this.handleDelete} variant="danger">Decline</Button></td>
            </div>   
        )
    }
}

export default Recieved


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