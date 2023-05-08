import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/spectre.css/dist/spectre.min.css"
import "../node_modules/spectre.css/dist/spectre-icons.min.css"
import "../node_modules/spectre.css/dist/spectre-exp.min.css"
import '../node_modules/react-toastify/dist/ReactToastify.min.css';
import App from './components/App/App'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
