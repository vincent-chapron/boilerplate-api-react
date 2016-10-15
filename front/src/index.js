import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import routes from './routes';
import reducers from './reducers';

const serverPreRenderingState = JSON.parse(window.__REDUX_STATE__) || {};
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, serverPreRenderingState)}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
, document.querySelector('#container'));
