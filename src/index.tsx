import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
 body { background-color: #eee;
    font-family: "Roboto", sans-serif;
  } `;




ReactDOM.render(
    <React.Fragment>
      <GlobalStyle/>
      <App/>
    </React.Fragment>
,document.getElementById("root"));