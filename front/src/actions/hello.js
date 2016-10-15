/**
 * This file is an example of actions
 * This actions will be intercept by the reducers
 */

import request from 'request';

import { PREFIX } from '../../../configuration/api';

import {
    HELLO
} from './types';

export function getHello(name) {
    let rq = new Promise(done => {
        request({
            url: `http://localhost:8080${PREFIX}/hello/${name}`,
            json: true
        }, (error, response, body) => {
            done({error, response, body});
        });
    });

    return {
        type: HELLO,
        payload: rq
    };
}
