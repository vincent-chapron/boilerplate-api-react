import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class App extends Component {
    componentWillMount() {
        this.props.getHello('user');
    }

    render() {
        return (
            <div>
                <h1>React + API Boilerplate</h1>
                <p>
                    {this.props.hello.sentence}
                </p>
            </div>
        );
    }
}

function mapStateToProps({hello}) {
    return {hello};
}

export default connect(mapStateToProps, actions)(App);
