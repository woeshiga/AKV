import React, {Component} from 'react';
import {Link} from "react-router-dom";

import LogoLink from "./LogoLink";
import Content from "./Content";

class Home extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <LogoLink/>
                <Content/>
            </div>
        );
    }
}

export default Home;