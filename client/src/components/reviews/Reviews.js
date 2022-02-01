/* import React, {Fragment,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getAllReviews } from '../../Actions/reviewAction';

const Reviews = ({getAllReviews, auth, review:{reviews}}) => {
    useEffect(() =>{
        getAllReviews();
       
    },[getAllReviews])
  return <div className='reviews'>

  </div>;
};

Reviews.propTypes = {
    auth: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
};
const mapStateProps = state =>({
    auth: state.authReducer,
    review: state.reviewReducer
})
export default connect(mapStateProps, {getAllReviews})(Reviews);  */