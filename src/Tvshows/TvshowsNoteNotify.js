import React from 'react';
import Button from 'react-bootstrap/Button'
import * as firebase from 'firebase'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextareaAutosize';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import '../App.css'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        position: 'center',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));


export default function

    NoteModal(props) {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    var [value, setValue] = React.useState('');

    var u;
    const condition = () => {
        if (props.type === 'Detail')
            u = props.show.original_title
        else {
            u = props.title
        }

    }
    const handleOpen = () => {
        setOpen(true);

        var db = firebase.firestore()

        // current logged on user
        var user = firebase.auth().currentUser

        var exist = false



        condition()

        let tvshowDocWatched = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("watched")
            .doc(u)

        let tvshowDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("to-watch")
            .doc(u)



        tvshowDocWatched.get()
            .then(docWatched => {
                // check if show doc exists in list 
                if (docWatched.exists) {
                    exist = true

                 //   //console.log("found show in watched")
                    //add notes if the already exist
                    if (docWatched.data().note) {
                        setValue(docWatched.data().note);
                   //
                   //     //console.log("found note in watched")

                        tvshowDocToWatch.get()
                            .then(doc => {
                                // check if show doc exists in to-watch list if it does add note
                                if (doc.exists) {
                                    tvshowDocToWatch.update({ note: docWatched.data().note })
                                }
                            })
                    }


                }

                tvshowDocToWatch.get()
                    .then(docToWatch => {
                        // check if show doc exists in list 
                        if (docToWatch.exists) {
                            exist = true

                            //console.log("found show in to-watch")
                            //add notes if the already exist
                            if (docToWatch.data().note) {
                                setValue(docToWatch.data().note);

                                //console.log("found note in to-watch")

                                tvshowDocWatched.get()
                                    .then(doc => {
                                        // check if show doc exists in watched list if it does add note
                                        if (doc.exists) {
                                            tvshowDocWatched.update({ note: docToWatch.data().note })
                                        }
                                    })
                            }
                        }

                        if (!exist) {
                            alert("show does not exist in your lists, add it to a list before adding notes")
                            handleClose()
                        }
                    })
                    .catch(err => {
                        alert("Error connecting to server")
                    });


            }
            )

    };

    const handleClose = () => {
        setOpen(false);
        setValue('');
    };

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleSave = () => {
        var db = firebase.firestore()

        // current logged on user
        var user = firebase.auth().currentUser

        condition()

        let tvshowDocWatched = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("watched")
            .doc(u)

        let tvshowDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("to-watch")
            .doc(u)

        tvshowDocWatched.get()
            .then(doc => {
                // check if show doc exists in list 
                if (doc.exists) {
                    tvshowDocWatched.update({ note: value })
                }


                tvshowDocToWatch.get()
                    .then(doc1 => {
                        // check if show doc exists in list 
                        if (doc1.exists) {
                            tvshowDocToWatch.update({ note: value })
                        }
                    })
            })
        handleClose()
        alert("You've updated a note to " + u)
    }

    const handleDelete = () => {
        var db = firebase.firestore()

        // current logged on user
        var user = firebase.auth().currentUser

        condition()
        //delete notes from watched
        let tvshowDocWatched = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("watched")
            .doc(u)

        tvshowDocWatched.get()
            .then(doc => {
                // check if show doc exists in list 
                if (doc.exists) {
                    tvshowDocWatched.update({ note: firebase.firestore.FieldValue.delete() })

                }
            })

        //delete notes from to-watch
        let tvshowDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("to-watch")
            .doc(u)

        tvshowDocToWatch.get()
            .then(doc => {
                // check if show doc exists in list 
                if (doc.exists) {
                    tvshowDocToWatch.update({ note: firebase.firestore.FieldValue.delete() })

                }
            })

        alert("You've deleted your notes on " + u)
        handleClose()

    }
    ///////////////////////////// STILL WORK IN PROGRESS ////////////////////////////////////////////////////////////////////////

    const checkForNotes = () => {

        var db = firebase.firestore()

        // current logged on user
        var user = firebase.auth().currentUser

        var exist = false



        condition()

        let tvshowDocWatched = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("watched")
            .doc(u)

        let tvshowDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("tvshows")
            .doc("section")
            .collection("to-watch")
            .doc(u)



        tvshowDocWatched.get()
            .then(docWatched => {
                // check if show doc exists in list 
                if (docWatched.exists) {
                    

                    //console.log("found show in watched")
                    //add notes if the already exist
                    if (docWatched.data().note !== 'undefined') {
                        //console.log(docWatched.data().note)
                
                    }
                }})
                tvshowDocToWatch.get()
                .then(docToWatch => {
                    // check if show doc exists in list 
                    if (docToWatch.exists) {
                        
    
                        //add notes if the already exist
                        if (docToWatch.data().note !== 'undefined') {
                            exist = true
                            
                        }
                    }})
            
                if(!exist){
                    return(
                    <div>
                        <img id='note_Img' alt="note_Img" onClick={handleOpen}
                            src='https://cdn.clipart.email/10a5c26f2cb7818d15e0be7b7865c13e_28-collection-of-sticky-note-clipart-transparent-high-quality-_1161-1168.png'>
                        </img>
                        </div>
                )
                } 
                else return null
    
            
                
           
            
    };

    return (
        <>
        
         {checkForNotes()  }

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div id="div_innerModal" className={classes.paper}>

                        <h2 id="transition-modal-title">Notes</h2>

                        <TextField
                            id="first-name"
                            label="Name"
                            value={value}
                            onChange={handleChange}
                            margin="normal">
                        </TextField>
                        <br />
                        <Button onClick={handleSave} size="sm" disabled={!value}>Save</Button>
            &nbsp;
                <Button variant="danger" size="sm" onClick={handleDelete} disabled={!value}> Delete </Button>
            &nbsp;
            <Button onClick={handleClose} size="sm" variant="secondary">Cancel</Button>
                    </div>

                </Fade>
            </Modal>
        </>
    );
}





