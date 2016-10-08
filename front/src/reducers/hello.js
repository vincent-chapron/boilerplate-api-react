/**
 * This is an example of a reducer !
 * This file is used in ./index.js
 */

import {
    HELLO
} from '../actions/types';

const INITIALE_STATE = {
    sentence: ''
};

export default function (state = INITIALE_STATE, action) {
    switch (action.type) {
        case HELLO:
            return {...state, sentence: action.payload.body.name};
        default:
            return state;
    }
}
