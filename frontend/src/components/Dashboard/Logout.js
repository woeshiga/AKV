import React, {Component} from 'react';

import {logout} from "../../actions/auth";

import store from "../../store";

class Logout extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    logOut() {
        store.dispatch(logout())
            .then(() => {
                setInterval(() => window.location.reload(), 500);
            });
    }

    render() {
        return (
            <button onClick={() => this.logOut()} className="button">
                Выйти
            </button>
        );
    }
}

export default Logout;