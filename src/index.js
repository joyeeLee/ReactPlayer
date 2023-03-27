import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.scss';
import {BrowserRouter} from 'react-router-dom'
import {AppRuter} from  './router/index.jsx'
import { Provider } from 'react-redux'
import store from './store/index'
import Header from './layout/header';
import Menu from './layout/menu';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className='appWrapper'>
        <div className='wrapperLeft'>
          <Menu></Menu>
        </div>
        <div className='wrapperRight'>
          <Header></Header>
          <AppRuter></AppRuter>
        </div>
      </div>
    </BrowserRouter> 
  </Provider>
);

