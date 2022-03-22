import React, {Component} from 'react';
import Logo from "../Icons/Logo";
import {Link} from "react-router-dom";

class LogoLink extends Component {
    render() {
        return (
            <div className="ui">
                <div className="logo d-flex flex-row">
                    <Link className="navLink" to="/">
                        <Logo/>
                    </Link>
                    <Link className="navLink" to="/">
                        <h1 className="logoItem logoTitle">
                            AKV
                        </h1>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LogoLink;