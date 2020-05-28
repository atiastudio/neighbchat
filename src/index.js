import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';

import * as serviceWorker from './serviceWorker';

// import ChapiService from './services/chapi-service';
// import { ChapiProvider } from './components/chapi-context';

// const chapiService = new ChapiService();

ReactDOM.render(
  <Provider store={store}>
    {/* <ChapiProvider value={chapiService}> */}
    <Router>
      <App />
    </Router>
    {/* </ChapiProvider> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
