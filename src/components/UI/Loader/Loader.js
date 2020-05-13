import React from 'react';
import './Loader.css'

const Loader = () => (
  <div className='loader'>
    <h2>Пожалуйста, подождите...</h2>
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