import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
const ProfileEducation = ({education: { current, to , from, description, school , degree, fieldofstudy}}) => <div>
    <h2 className="text-dark">{school}</h2>
    <p className='fontSize'>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p  className='fontSize'>
        <strong>Degree: </strong> {degree}
    </p>
    <p  className='fontSize'>
        <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p  className='fontSize'>
        <strong>Description: </strong> {description}
    </p>
</div>;

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
};

export default ProfileEducation;
