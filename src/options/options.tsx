import React from 'react';
import ReactDOM from 'react-dom';
import './options.css';

const test = <img src="icon.png" alt="a" />;

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(test, root);
