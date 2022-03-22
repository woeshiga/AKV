import React, {Component} from 'react';

import {Link} from "react-router-dom";

import {ReCAPTCHA} from "react-google-recaptcha";

import LogoLink from "../Home/LogoLink";
import ErrorDetails from "../Details/ErrorDetails";

import {login} from "../../actions/auth";

import store from "../../store";

import {
    REQUIRED_FIELD,
    DATA_IS_NOT_VALID,
} from "../../errors/types";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors: {
                email: null,
                password: null,
            }
        };
    }


    updateEmailValue(e) {
        this.setState({
            ...this.state,
            email: e.target.value
        });
    }

    updatePasswordValue(e) {
        this.setState({
            ...this.state,
            password: e.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const promise = new Promise(resolve => {
            this.setState({
                ...this.state,
                errors: {
                    email: (this.state.email) ? (this.state.email.toLowerCase().match(emailRe)) ? null : DATA_IS_NOT_VALID : REQUIRED_FIELD,
                    password: (this.state.password) ? null : REQUIRED_FIELD,
                }
            });
            resolve(this.state.errors)
        });
        promise.then(() => {
            for (let key in this.state.errors) {
                if (this.state.errors[key]) {
                    return true
                }
            }
            return false
        }).then(err => {
            if (!err) {
                store.dispatch(login({
                    username: this.state.email,
                    password: this.state.password,
                }));
                return true
            } else {
                return false
            }
        })
            .then(res => {
                if (res) {
                    setInterval(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    this.forceUpdate();
                }
            });
    }

    render() {
        const emailDetails = (this.state.errors.email) ? <ErrorDetails text={this.state.errors.email}/> : " ";
        const passwordDetails = (this.state.errors.password) ? <ErrorDetails text={this.state.errors.password}/> : " ";
        return (
            <div className="registration">
                <LogoLink/>
                <div className="registrationBlock">
                    <h2 className="regTitle">
                        Вход
                    </h2>
                    <form className="registrationForm">
                        <label className="formLabel" htmlFor="email">
                            Почта
                        </label>
                        {emailDetails}
                        <input onChange={e => this.updateEmailValue(e)} type="email" id="email"
                               placeholder="Введите..."/>
                        <label className="formLabel" htmlFor="password">
                            Пароль
                        </label>
                        {passwordDetails}
                        <input onChange={e => this.updatePasswordValue(e)} type="password" id="password"
                               placeholder="Введите..."/>
                        <Link to="/forgot_password" className="forgotPassword">Забыли пароль?</Link>
                        <div className="g-recaptcha captcha" data-sitekey="6LdBB9MeAAAAAAE2epeSHc1X6hYou7dWxCBEWMZj"
                             onChange={val => this.onChange(val)}>
                        </div>
                        {/*<ReCAPTCHA sitekey="6LdBB9MeAAAAAAE2epeSHc1X6hYou7dWxCBEWMZj"*/}
                        {/*           onChange={this.onChange}/>*/}
                        <button onClick={event => this.onSubmit(event)} id="loginButton"
                                className="button">Войти
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;