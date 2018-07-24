import React from 'react';
import loader from './images/loader.gif';

export default () => {
  return (
    <div style={{display: 'inline-block'}}>
      <img
        src={loader}
        style={{ width: '24px', height: '24px', margin: 'auto', display: 'inline-block' }}
        alt="Loading..."
      />
    </div>
  );
};
