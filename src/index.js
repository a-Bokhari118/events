import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';

import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { loadEvent } from './features/events/eventActions';

const store = configureStore();
store.dispatch(loadEvent());
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
