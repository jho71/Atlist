import { FaStar } from "react-icons/fa";
import React, { useState } from 'react'
import * as firebase from 'firebase'

function StarRating(props){
    function updateDbRating(newRating, entTitle, entId, email, entityType){
        const db = firebase.firestore()
        
        console.log("updateDbRating(): " + newRating+entTitle+entId+email+props.entityType);
  
        let data = {rating: newRating};

        if (email !== undefined){
            // specify ref for individual rating

            let newUserRatingRef = db.collection("users")
            .doc(email)
            .collection(entityType)
            .doc("ratings")
            .collection(entTitle)
            .doc(entId.toString());

            // specifying ref for general ratings
            let newGeneralRatingRef = db.collection(props.entityType)
            .doc(entTitle)
            .collection(entId.toString())
            .doc(email);

            // save rating to db for exclusively user
            newUserRatingRef.set(data);
            // save a general rating to  db to create average rating later on
            newGeneralRatingRef.set(data);


            console.log("Successfully set new user rating for movie " + entTitle + email)
        } else{
            console.log("email is undefined: ->" + email)
        }

        
      }

      console.log("PROPS VERIFICATION: entityId:" + props.entityId + " entityIR:" + props.initialRating + " entityEmail:" + props.email + " entityAR:" + props.allRatings + " entityET:" +props.entityType)
      console.log(props.allRatings)
    
      // HOOKS since this is functional component
      const [rating, setRating] = useState(props.initialRating);
      const [hover, setHover] = useState(null);

      let amountRatings = 0, sum = 0, averageRating = 0;

      // check if no ratings exist, if so make average rating 0: safe state
      if (props.allRatings.length > 0){
        console.log("calculating meanRating")
        props.allRatings.map((element, i) =>{
            amountRatings++;
            sum+=element;
            return null;
        });
        averageRating = sum / amountRatings;
        console.log("averageRating is: " + averageRating)
      } // else keep averageRating as 0

      
      return(
          <div>
              {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                  <label>
                      <input 
                          id="hiddenStar" 
                          type="radio" 
                          name="rating" 
                          value={ratingValue} 
                          // lambda expression for onClick
                          // double function run
                          onClick={ ()=>{setRating(ratingValue); updateDbRating(ratingValue, props.entityTitle, props.entityId, props.email, props.entityType)}}
                          />
                      <FaStar 
                          className="star"
                          color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={45}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                      />
                  </label>)
              })}
              <p>Your rating for this {props.entityType} is {rating === null || rating === 0 ? "unrated" : rating}.</p>
              <p>The mean rating for all users is {averageRating === 0 ? "unrated" : averageRating} out of {amountRatings} {amountRatings > 1 ? "ratings" : "rating"}.</p>
              
          </div>
      );
  };

  export default StarRating;