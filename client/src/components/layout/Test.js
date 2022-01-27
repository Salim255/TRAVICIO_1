import React from 'react';
import PropTypes from 'prop-types';

const Test = ({location, profiles}) => {

    console.log('====================================');
    console.log('Hello from test', profiles);
    console.log('====================================');
  return <div>Hlle from test</div>;
};

Test.propTypes = {
    profiles: PropTypes.object.isRequired,
    
};

export default Test;
