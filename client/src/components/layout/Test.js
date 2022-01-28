import React from 'react';
import PropTypes from 'prop-types';

const Test = ({location, profiles}) => {

   
  return <div>Hlle from test</div>;
};

Test.propTypes = {
    profiles: PropTypes.object.isRequired,
    
};

export default Test;
