import React, {Component} from 'react';

import Logout from "./Logout";
import NewsFeed from "./NewsFeed/NewsFeed";

import SideBar from "./SideBar";

import {Switch, Route, Redirect} from "react-router-dom";

class Dashboard extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex">
                <SideBar/>
                {/*<Logout/>*/}
            </div>
        );
    }
}

export default Dashboard;