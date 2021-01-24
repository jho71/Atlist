import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import * as firebase from 'firebase'

// reading all of the actions done

var email = '';

class History extends Component {

  constructor(props) {
    super(props)
    this.state = { history: [] }
  }

  handleClickRemove(listOption) {
    var db = firebase.firestore()
    console.log('this is:', this.props.id)

    db.collection("users")
      .doc(email)
      .collection("historyList")

    function deleteCollection(db, collectionPath, batchSize) {
      let collectionRef = db.collection("users").doc(email).collection(collectionPath);
      let query = collectionRef.orderBy('__name__').limit(batchSize);

      return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    }

    function deleteQueryBatch(db, query, batchSize, resolve, reject) {
      query.get()
        .then((snapshot) => {
          // When there are no documents left, we are done
          if (snapshot.size === 0) {
            return 0;
          }

          // Delete documents in a batch
          let batch = db.batch();
          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });

          return batch.commit().then(() => {
            return snapshot.size;
          });
        }).then((numDeleted) => {
          if (numDeleted === 0) {
            resolve();
            return;
          }

          // Recurse on the next process tick, to avoid
          // exploding the stack.
          process.nextTick(() => {
            deleteQueryBatch(db, query, batchSize, resolve, reject);
          });
        })
        .catch(reject);
    }

    deleteCollection(db, "historyList", 10)
    alert("deleted all entries in history list")
    // refresh
    this.setState({
      history: []
    })

  }

  componentDidMount() {
    console.log("User history component mounted")

    var db = firebase.firestore();

    // listener!!
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        email = user.email;
        console.log("Current logged in user is " + email)
      } else {
        console.log("No user signed in")
      }
    })

    // get all of the actions performed by the user
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    // grab all the data
    sleep(2000).then(() => {
      db.collection("users")
        .doc(email)
        .collection("historyList").orderBy('timestamp', 'desc').limit(10)
        .get()
        // this represents the array of objects from the get
        .then(querySnapshot => {
          console.log(email);
          const data = querySnapshot.docs.map(doc => doc.data())

          console.log("data array in querySnapshot is " + data)

          for (var i = 0; i < data.length; i++) {

            this.state.history.push(data[i])
            console.log(data[i].name + " was " + data[i].action + " from their " + data[i].listOp);
          }
          // just to refresh the page once thats done lmao
          this.setState({
            history: [...this.state.history]
          })
        })
    })

    console.log(this.state.historyActions);
  }

  render() {
    console.log("attempting to render")
    return (
      <div>
        <table className='table table-striped'>
          <h2 style={{ color: "white" }}> Recent Activities</h2>
          <TableBody result={this.state.history} />
        </table>
        <br></br>
        <Button onClick={(e) => this.handleClickRemove()}>Clear action history</Button>
      </div>
    )
  }
}

const TableBody = (props) => {
  let rows = props.result.map((result, index) => {
    console.log("table body props validation: " + result)
    return (
      <TableRow result={result} key={index} />
    );
  });
  return <tbody>{rows}</tbody>
}

const TableRow = props => {
  //should be an object
  const a = props.result;

  return (
    // in order of thead
    <tr>
      <td><a style={{ color: "white" }} href={a.url}>{a.name + " was " + a.actionType + " to the " + a.entityType + ' ' + a.listOp + " list."}</a></td>
      {/*<td><Link className='btn btn-default' to={`/person/detail/${a._id}`}>More Details</Link>&nbsp;&nbsp;</td>*/}
      &nbsp;
    </tr>
  )
}

export default History;