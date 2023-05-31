import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import './index.css'
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor=persistStore(store)
root.render(

  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
  {/* <div className='blur-2xl' style={{position:"absolute",top:'2px', right: '0'}}></div>
    <div className='blur-2xl' style={{top: '200px', left: '-8rem'}}></div>
    <div className='blur-2xl' style={{top: '500px', left: '-8rem'}}></div> */}
    <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
);

reportWebVitals();