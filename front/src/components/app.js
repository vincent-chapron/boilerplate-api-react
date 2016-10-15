import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class App extends Component {
    componentWillMount() {
        this.props.getHello('Default');
    }

    static fetchData({store}) {
        return store.dispatch(actions.getHello('Default'));
    }

    render() {
        return (
            <div>
                <h1>React + API Boilerplate</h1>
                <div>
                    {this.props.hello.sentence}
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps({hello}) {
    return {hello};
}

export default connect(mapStateToProps, actions)(App);
