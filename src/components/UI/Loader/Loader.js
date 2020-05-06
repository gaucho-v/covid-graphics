import React from 'react';
import './Loader.css'

const Loader = () => (
  <div className='loader'>
    <h3>Пожалуйста, подождите...</h3>
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader