import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ChangePassword from './ChangePassword'
import * as firebase from 'firebase'
import { withAuthorization, AuthUserContext } from '../Sessions/Index'

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '', image: null, url: '', progress: 0 }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)

    this.deleteImage = this.deleteImage.bind(this)
  }

  componentDidMount(){
    var db = firebase.firestore()
    var user = firebase.auth().currentUser

    db.collection("users")
      .doc(user.email)
      .collection("biography")
      .doc("biography")
      .get()
      .then((doc) => {
        this.setState({ value: doc.data().message })
      }).catch((err) =>{
        this.setState({ value: "Insert a memorable biography here!" })
      });
      
    var storage = firebase.storage()

    storage.ref(user.email).child('avatar.jpg').getDownloadURL().then(url => {
      console.log(url)
      this.setState({ url })
    })
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    var db = firebase.firestore()
    var user = firebase.auth().currentUser

    this.setState({ value: this.state.value })

    db.collection("users")
      .doc(user.email)
      .collection("biography")
      .doc("biography")
      .set({ message: this.state.value }, { merge: true })

    alert("Biography was updated!")
  }

  handleImageChange(event) {
    if (event.target.files[0]) {
      this.setState({ image: event.target.files[0] })
      console.log(this.state.image)
    }
  }

  handleUpload() {
    var storage = firebase.storage()
    var user = firebase.auth().currentUser

    const { image } = this.state
    const uploadTask = storage.ref(`${user.email}/${"avatar.jpg"}`).put(image)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
        this.setState({ progress })
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref(user.email).child('avatar.jpg').getDownloadURL().then(url => {
          this.setState({ url })
        })
      }
    )
  }

  deleteImage() {
    var storage = firebase.storage()
    var user = firebase.auth().currentUser
    
    storage.ref(user.email).child('avatar.jpg').delete().then(() => {
      this.setState({url: ''})
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div style={{ float: 'right', padding: 120 }}>
            <h2>Upload an Avatar</h2>
            <img src={this.state.url || `http://via.placeholder.com/300x300`} alt="Avatar" height="300" width="300" />
            <br />
            <progress value={this.state.progress} max="100" />
            <br />
            <input type="file" onChange={this.handleImageChange} /> <br /> <br />
            <Button onClick={this.handleUpload}> Upload Image</Button> 
            &nbsp;
            <Button onClick={this.deleteImage}> Delete Image </Button>
          </div>

          <AuthUserContext.Consumer>
            {authUser => (
              <div className="login">
                <h1>Email: {authUser.email}</h1>
                <br />
                <h2>Change Password</h2>
                <ChangePassword />
              </div>
            )}
          </AuthUserContext.Consumer>

        

          <div style={{ padding: 45 }} >
            <h2>Your Biography</h2>
            <textarea rows="4" cols="50" value={this.state.value} onChange={this.handleChange} /> <br />
            <br/>
            <Button onClick={this.handleSubmit}> Update biography </Button>
          </div>
        </form>
      </div>
    )
  }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Settings)