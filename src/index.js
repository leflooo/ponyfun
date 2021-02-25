import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import PonyList from './PonyList';

const conf = {
    Url: 'http://localhost:3000/contacts'
  };

ReactDOM.render(<PonyList config={conf} />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
