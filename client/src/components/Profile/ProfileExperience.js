import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
const ProfileExperience = ({experience: {company, title, location, current, to , from, description}}) => <div>
    <h2 className="text-dark">{company}</h2>
    <p  className='fontSize'>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p  className='fontSize'>
        <strong>Position: </strong> {title}
    </p>
    <p  className='fontSize'>
        <strong>Description: </strong> {description}
    </p>
</div>;

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
