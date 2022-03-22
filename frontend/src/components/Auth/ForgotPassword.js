import React, {Component} from 'react';
import {DATA_IS_NOT_VALID, REQUIRED_FIELD} from "../../errors/types";
import store from "../../store";
import {createResetToken} from "../../actions/auth";
import ErrorDetails from "../Details/ErrorDetails";
import LogoLink from "../Home/LogoLink";
import emailjs, { init } from '@emailjs/browser';
import createToken from "../../utlis/createToken";
import api from "../../actions/axiosConfig";

init("DgXq3t_Y5zeeOxSgQ");

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            errors: {
                email: null
            }
        };
    }


    updateEmailValue(e) {
        this.setState({
            ...this.state,
            email: e.target.value
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
                const token = createToken()
                store.dispatch(createResetToken({
                    username: this.state.email,
                    token: token
                }))
                    .then(() => {
                        const templateParams = {
                            to_name: this.state.email,
                            message: `http://localhost:3000/reset_password/${token}`
                        }
                        const serviceID = 'service_uu5cktn'
                        const templateID = 'template_0mq5zb6'
                        const userID = 'DgXq3t_Y5zeeOxSgQ'
                        emailjs.send(serviceID, templateID, templateParams, userID)
                    })
                return true
            } else {
                return false
            }
        })
            .then(res => {
                if (res) {
                    // setInterval(() => {
                    //     window.location.reload();
                    // }, 500);
                } else {
                    this.forceUpdate();
                }
            });
    }

    onChange() {

    }

    render() {
        const emailDetails = (this.state.errors.email) ? <ErrorDetails text={this.state.errors.email}/> : " ";
        return (
            <div className="registration">
                <LogoLink/>
                <div className="registrationBlock">
                    <h2 className="regTitle">
                        Восстановление пароля
                    </h2>
                    <form className="registrationForm">
                        <label className="formLabel" htmlFor="email">
                            Почта
                        </label>
                        {emailDetails}
                        <input onChange={e => this.updateEmailValue(e)} type="email" id="email"
                               placeholder="Введите..."/>
                        <div className="instruction">
                            Вам на почту придёт ссылка для восстановление пароля
                        </div>
                        <button onClick={event => this.onSubmit(event)} id="loginButton"
                                className="button">Получить ссылку
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;