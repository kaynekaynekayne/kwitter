import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles.css';
import '@fortawesome/fontawesome-free/js/all.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
