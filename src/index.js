import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { configureStore } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

async function init() {
  const store = await configureStore();
  ReactDOM.render(
    <App store = {store} />,
    document.getElementById('root')
  );
}

init();
registerServiceWorker();
