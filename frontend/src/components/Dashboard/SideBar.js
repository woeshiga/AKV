import React, {Component} from 'react';

import Logo from "../Icons/Logo";
import News from "../Icons/News";

import {Link} from "react-router-dom";

class SideBar extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sideBar d-flex">
                <Link to="/">
                    <Logo/>
                </Link>
                <div className="navigate">
                    <News url="/news"/>
                </div>
            </div>
        );
    }
}

export default SideBar;