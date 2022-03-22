import React, {Component} from 'react';

import Logout from "./Logout";

class Dashboard extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Logout/>
            </div>
        );
    }
}

export default Dashboard;