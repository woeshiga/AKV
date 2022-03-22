import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Buttons extends Component {
    render() {
        return (
            <div className="authButtons d-md-flex d-sm-block justify-content-between">
                <div className="btnItem">
                    <Link to="/login">
                        <button className="loginButton button">Вход</button>
                    </Link>
                </div>
                <div className="btnItem">
                    <Link to="/registration">
                        <button className="registrationButton button">Регистрация</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Buttons;