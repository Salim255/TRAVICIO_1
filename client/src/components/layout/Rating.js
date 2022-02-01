import React, { useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { leaveFeedBack, getProileReviews } from '../../Actions/reviewAction';
import { connect } from 'react-redux';
import ReviewItem from '../reviews/ReviewItem';
import {FaStar} from 'react-icons/fa'

const Rating = ({leaveFeedBack,match,getProileReviews, review:{reviews, loading}}) => {
    console.log(match.params.id);
    const [review, setText] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() =>{
        getProileReviews(match.params.id);
    },[ getProileReviews , match.params.id]);

  return<Fragment>
      
  {/*     <Link to={`/profiles/${match.params.id}`} className='backProfile '>
              Back To Profile
          </Link> */}
       <div className="post-form" onSubmit={e => {e.preventDefault() ;
        leaveFeedBack(match.params.id, {review, rating});
        
         setText('');
         setRating(null)}}>  
                      
                <div className="bg-primary p-1 borderRad">
                    <h2>Leave your Rating and Feedback</h2>
                </div>
                
                <form className="form  my-1"  >
                <div className='starRating'>
                    {[...Array(5)].map((star,index) =>{
                        const ratingValue = index+1;
                        return (
                        <label key={index}>
                            <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)}
                            />
                            <FaStar size={20} color={ratingValue <=(hover || rating)  ? "#ffcc10": "#e4e5e9" } onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} className='starMargin'/>
                        </label>
                        )
                    })}
               </div> 
                    <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={review}
                    onChange={e => setText(e.target.value)}
                    placeholder="Leave a feedback "
                    required 
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
         </form>
         
</div>
<div className="bg-primary p-1 borderRad reviewsheader">
                    <h2>All Reviews </h2>
</div>
{reviews.length > 0 ? (
         reviews.map(review => (
           <ReviewItem  key={review._id} review={review}/>
         ))
       ) : <h4> No reviews found... </h4> }

  </Fragment>;
};

Rating.propTypes = {
    leaveFeedBack: PropTypes.func.isRequired,
    review: PropTypes.object.isRequired,
    
};

const mapStateProps = state =>({
    auth: state.authReducer,
    review: state.reviewReducer
})
export default connect(mapStateProps, {leaveFeedBack, getProileReviews})(Rating);
