import Rx from 'rx';
import React from 'react';
import promise from 'redux-promise';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { match, RouterContext, Router, browserHistory } from 'react-router';
import { renderToString } from 'react-dom/server';

import reducers from '../front/src/reducers';
import routes from '../front/src/routes';

export function handleRender(req, res, next) {
    let createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    let store = createStoreWithMiddleware(reducers);

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (renderProps) {
            let {query, params, history} = renderProps;
            let components = renderProps.components.map(component => {
                let WrappedComponent = component.WrappedComponent;
                return WrappedComponent && WrappedComponent.fetchData ?
                    WrappedComponent.fetchData({query, params, store, history}) :
                    Promise.resolve();
            });

            let reduxPromises = Rx.Observable.forkJoin(components);

            reduxPromises.subscribe(() => {
                let html = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps}/>
                    </Provider>
                );
                let preloadedState = store.getState();
   
                res.render('react', {
                    title: 'react + api boilerplate',
                    html: html,
                    state: JSON.stringify(preloadedState)
                });
            });
        } else {
            next();
        }
    });
}
