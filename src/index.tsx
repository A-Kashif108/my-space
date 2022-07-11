import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App1 from './App';
import reportWebVitals from './reportWebVitals';
import SignUp from './Pages/SignUp/SignUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// why change default name App1
root.render(
  <React.StrictMode>
    <App1/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
