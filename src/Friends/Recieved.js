import React, { Component } from 'react'
import * as firebase from 'firebase'
<<<<<<< HEAD
import Button from 'react-bootstrap/Button'
=======
 import Button from 'react-bootstrap/Button'
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2

var email = []
var list = []
class Recieved extends Component {
<<<<<<< HEAD

  constructor(props) {
    super(props)
    this.state = {
      emails: [] 
    }
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentDidMount() {
    var db = firebase.firestore()

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
        .collection('friends-requests')
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.id)

          for (var i = 0; i < data.length; i++) {
            // pushes all movie ids one by one
            //console.log(data[i])
            list[i] = data[i]
            ///console.log(list[i])
            this.setState({ emails: [...this.state.emails, list[i]] })
          }

        })
    })
  }

  handleAccept(a) {

    var db = firebase.firestore()

    var docReq =db.collection('searchUsers')//Requestors Document/Collections
      .doc(a)
      var docUser =db.collection('searchUsers')//this Users Documents/Collections  
      .doc(email[0])

      docUser
      .collection('friends-accepted')
      .doc(a)
      .set({})

      docUser
      .collection('friends-requests')
      .doc(a)
      .delete()


      docReq
      .collection('friends-accepted')
      .doc(email[0])
      .set({})

      docReq
      .collection('friends-requests')
      .doc(email[0])
      .delete()

      docReq
      .collection('friends-sent')
      .doc(email[0])
      .delete()

    alert("Youve become friends with " + this.state.emails[0])

  }

  handleDelete(a) {

    var db = firebase.firestore()
    db.collection('searchUsers')
      .doc(email[0])
      .collection('friends-requests')
      .doc(a)
      .delete()
    alert("Youve rejected " + a)
  }
  
  createEntityTable = () => {

    let table = [];
    var len = this.state.emails.length
    console.log(len)

    let index = 0;

    // outer loop to create parent
    for (let i = 0; i < len; i++) {
      let children = []
      var a = this.state.emails[i]
      // inner loop to create children
      //for (let j = 0; j < len; j++){
      children.push(<div>


        <h2>{a}</h2>
        <Button disabled={!a} onClick= {this.handleAccept.bind(this, a)}>Accept</Button>
        <Button disabled={!a} onClick= {this.handleDelete.bind(this, a)} variant="danger">Decline</Button> 

      </div>)

      // if is mutliple of 5 make a new row
      index++
      if (index % 1 === 0) {
        table.push(<tr></tr>)
      }

      table.push(<td>{children}</td>)
    }

    return table;
  }



  render() {
    document.title = 'AtList - Friend List'

    return (
      <div>
        <h1>Requests List</h1>
        {this.createEntityTable()}


      </div>
    )
  }
=======
    
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
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
}

export default Recieved


<<<<<<< HEAD
// const TableBody = (props) => {
//     let rows = props.result.map((result, index) =>{
//     console.log(props.result + " tb")
//       return(
//         <TableRow result={result} key={index}/>
//       );
//     });
//     return <tbody>{rows}</tbody>
//   }

// const TableRow = props =>{
//     const a = props.result;
//     console.log(a + " tr")

//     return(
//       // in order of thead
//     <tr>

//       <td>{a}</td>
//       <td><Button disabled={!this.state.emails[0]} onClick ={this.handleAccept}>Accept</Button></td>
//       <td><Button disabled={!this.state.emails[0]} onClick ={this.handleDelete} variant="danger">Decline</Button></td>
//     </tr>
//     )
//   }
=======
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
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
