import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import {BrowserRouter} from 'react-router-dom'
import {AppRuter} from  './router/index.jsx'
import { Provider } from 'react-redux'
import store from './store/index'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRuter></AppRuter> 
    </BrowserRouter> 
  </Provider>
);

