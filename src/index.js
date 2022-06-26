import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import {BrowserRouter} from 'react-router-dom'
import RouterP from  './router/index.jsx'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <RouterP></RouterP> 
    </BrowserRouter> 
  // </React.StrictMode>  
);

