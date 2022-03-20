
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import RootRouters from './routes';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RootRouters />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
