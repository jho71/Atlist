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
            u = props.movie.original_title
        else {
            u = props.title
        }

    }
    const handleOpen = () => {

        var db = firebase.firestore()

        // current logged on user
        var user = firebase.auth().currentUser

        /*var exist = false*/



        condition()

        let movieDocWatched = db.collection("users")
            .doc(user.email)
            .collection("movies")
            .doc("section")
            .collection("watched")
            .doc(u)

        let movieDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("movies")
            .doc("section")
            .collection("to-watch")
            .doc(u)



        movieDocWatched.get()
            .then(docWatched => {
                // check if movie doc exists in list 
                if (docWatched.exists) {
                    //exist = true

                    //   console.log("found movie in watched")
                    //add notes if the already exist
                    if (docWatched.data().note) {
                        setValue(docWatched.data().note);
                        setOpen(true);
                        //       console.log("found note in watched")


                        movieDocToWatch.get()
                            .then(doc => {
                                // check if movie doc exists in to-watch list if it does add note
                                if (doc.exists) {
                                    movieDocToWatch.update({ note: docWatched.data().note })
                                }
                            })
                    }


                }

                movieDocToWatch.get()
                    .then(docToWatch => {
                        // check if movie doc exists in list 
                        if (docToWatch.exists) {
                          //  exist = true

                            //         console.log("found movie in to-watch")
                            //add notes if the already exist
                            if (docToWatch.data().note) {
                                setValue(docToWatch.data().note);
                                setOpen(true);
                                //           console.log("found note in to-watch")

                                movieDocWatched.get()
                                    .then(doc => {
                                        // check if movie doc exists in watched list if it does add note
                                        if (doc.exists) {
                                            movieDocWatched.update({ note: docToWatch.data().note })
                                        }
                                    })
                            }
                        }



            }
            )

    })};

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

        let movieDocWatched = db.collection("users")
            .doc(user.email)
            .collection("movies")
            .doc("section")
            .collection("watched")
            .doc(u)

        let movieDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("movies")
            .doc("section")
            .collection("to-watch")
            .doc(u)

        movieDocWatched.get()
            .then(doc => {
                // check if movie doc exists in list 
                if (doc.exists) {
                    movieDocWatched.update({ note: value })
                }


                movieDocToWatch.get()
                    .then(doc1 => {
                        // check if movie doc exists in list 
                        if (doc1.exists) {
                            movieDocToWatch.update({ note: value })
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
        let movieDocWatched = db.collection("users")
            .doc(user.email)
            .collection("movies")
            .doc("section")
            .collection("watched")
            .doc(u)

        movieDocWatched.get()
            .then(doc => {
                // check if movie doc exists in list 
                if (doc.exists) {
                    movieDocWatched.update({ note: firebase.firestore.FieldValue.delete() })

                }
            })

        //delete notes from to-watch
        let movieDocToWatch = db.collection("users")
            .doc(user.email)
            .collection("movies")
            .doc("section")
            .collection("to-watch")
            .doc(u)

        movieDocToWatch.get()
            .then(doc => {
                // check if movie doc exists in list 
                if (doc.exists) {
                    movieDocToWatch.update({ note: firebase.firestore.FieldValue.delete() })

                }
            })

        alert("You've deleted your notes on " + u)
        handleClose()

     }

     const checkForNotes = () => {
         
         return (<div>
         <img id='note_Img' alt="note_Img" onClick={handleOpen}
           src='https://cdn.clipart.email/10a5c26f2cb7818d15e0be7b7865c13e_28-collection-of-sticky-note-clipart-transparent-high-quality-_1161-1168.png'>
       </img>
       </div>)
     }
    //     var db = firebase.firestore()

    //     // current logged on user
    //     var user = firebase.auth().currentUser

    //     condition()

    //     let movieDocWatched = db.collection("users")
    //         .doc(user.email)
    //         .collection("movies")
    //         .doc("section")
    //         .collection("watched")
    //         .doc(u)

    //     let movieDocToWatch = db.collection("users")
    //         .doc(user.email)
    //         .collection("movies")
    //         .doc("section")
    //         .collection("to-watch")
    //         .doc(u)

    //         var data1 = null;
    //         var data2 = null;
        
    //             movieDocWatched.get()
    //                 .then(docWatched => {
        
    //                     // check if movie doc exists in list 
    //                    data1 = docWatched.data().note
    //         })
        
    //            movieDocToWatch.get()
    //                 .then(docToWatch => {
    //             data2 = docToWatch.data().note
    //         }) 

    //         if (data1 ===  null && data2 === null){
    //             console.log("null")
    //         }
    //         else if (data1 ===  "" && data2 === ""){
    //             console.log("empty")
    //         }
    //         else if (data1 ===  undefined && data2 === undefined){
    //             console.log("undefined")
    //         }
    //         else{
    //             return(
    //                     <div>
    //                 <img id='note_Img' alt="note_Img" onClick={handleOpen}
    //                   src='https://cdn.clipart.email/10a5c26f2cb7818d15e0be7b7865c13e_28-collection-of-sticky-note-clipart-transparent-high-quality-_1161-1168.png'>
    //               </img>
    //               </div>)
    //         }
                                   
                                   
                                    
                             
    //     }



                    return (
                        <div>
                        {checkForNotes()}
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

                        </div>
                    );
                }





