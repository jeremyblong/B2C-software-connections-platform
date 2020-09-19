import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/style.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-sliding-pane/dist/react-sliding-pane.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { BrowserRouter } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


ReactDOM.render(
  <React.StrictMode>
  <SkeletonTheme color="lightgrey" highlightColor="#444">
    <Provider store={store}>
    <BrowserRouter>
    <NotificationContainer leaveTimeout={800}/>
      <App />
    </BrowserRouter>
    </Provider>
    </SkeletonTheme>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
