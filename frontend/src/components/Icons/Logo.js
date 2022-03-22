import React, {Component} from 'react';
import logo from "../../images/Logo.png";

class Logo extends Component {
    render() {
        return (
            <img src={logo} alt="logo" className="logoItem logoImage"/>
        );
    }
}

export default Logo;