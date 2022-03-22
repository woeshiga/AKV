import React, {Component} from 'react';

import {ReCAPTCHA} from "react-google-recaptcha";

import LogoLink from "../Home/LogoLink";
import ErrorDetails from "../Details/ErrorDetails";

import {register} from "../../actions/auth";

import store from "../../store";

import {
    REQUIRED_FIELD,
    PASSWORDS_DO_NOT_MATCH,
    CONFIRM_ERROR,
    DATA_IS_NOT_VALID,
    SHORT_PASSWORD
} from "../../errors/types";

import {addUserInLine, getCode, getSettings} from "../../actions/settings";
import generateVerifyCode from "../../utlis/generateVerifyCode";

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            repeatPassword: null,
            telegramUsername: null,
            inviter: null,
            firstName: null,
            lastName: null,
            cookie: false,
            termsOfUse: false,
            tgSubmit: false,
            verifyCode: 0,
            code: null,
            errors: {
                email: null,
                telegram: null,
                password: null,
                repeatPassword: null,
                firstName: null,
                lastName: null,
                cookie: null,
                termsOfUse: null
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

    updateTelegramUsernameValue(e) {
        this.setState({
            ...this.state,
            telegramUsername: e.target.value
        });
    }

    updateFirstNameValue(e) {
        this.setState({
            ...this.state,
            firstName: e.target.value
        });
    }

    updateLastNameValue(e) {
        this.setState({
            ...this.state,
            lastName: e.target.value
        });
    }

    updateRepeatPasswordValue(e) {
        this.setState({
            ...this.state,
            repeatPassword: e.target.value
        });
    }

    updateInviterValue(e) {
        this.setState({
            ...this.state,
            inviter: e.target.value
        });
    }

    updateCookieValue() {
        this.setState({
            ...this.state,
            cookie: !this.state.cookie
        });
    }

    updateTermsOfUseValue() {
        this.setState({
            ...this.state,
            termsOfUse: !this.state.termsOfUse
        });
    }

    submitTelegram(event) {
        event.preventDefault();
        if (this.state.telegramUsername) {
            store.dispatch(addUserInLine({username: this.state.telegramUsername, code: generateVerifyCode()}))
                .then(() => store.dispatch(getCode(this.state.telegramUsername)))
                .then(() => this.setState({
                    ...this.state,
                    verifyCode: store.getState().settings.verifyCode
                }))
                .then(() => this.forceUpdate());
        } else {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    telegram: REQUIRED_FIELD
                }
            });
            this.forceUpdate();
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const promise = new Promise(resolve => {
            this.setState({
                ...this.state,
                errors: {
                    email: (this.state.email) ? (this.state.email.toLowerCase().match(emailRe)) ? null : DATA_IS_NOT_VALID : REQUIRED_FIELD,
                    telegram: (this.state.telegramUsername) ? null : REQUIRED_FIELD,
                    password: (this.state.password) ? (this.state.password.length >= 6) ? null : SHORT_PASSWORD : REQUIRED_FIELD,
                    repeatPassword: (this.state.repeatPassword) ? (this.state.password === this.state.repeatPassword) ? null : PASSWORDS_DO_NOT_MATCH : REQUIRED_FIELD,
                    firstName: (this.state.firstName) ? null : REQUIRED_FIELD,
                    lastName: (this.state.lastName) ? null : REQUIRED_FIELD,
                    cookie: (this.state.cookie) ? null : CONFIRM_ERROR,
                    termsOfUse: (this.state.termsOfUse) ? null : CONFIRM_ERROR
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
                if (this.state.tgSubmit) {
                    store.dispatch(register({
                        username: this.state.email,
                        password: this.state.password,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        telegram: this.state.telegramUsername,
                        inviter: this.state.inviter
                    }));
                    return true
                } else {
                    document.getElementById("verifyAccount").style.color = "red";
                    document.getElementById("verifyAccount").style.borderColor = "red";
                    return false
                }
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

    checkCode(e) {
        e.preventDefault()
        if (this.state.verifyCode !== parseInt(this.state.code)) {
            e.target.style.borderColor = "red";
        } else {
            document.getElementById('codeBlock').remove()
            this.setState({
                ...this.state,
                tgSubmit: true
            });
        }
        this.forceUpdate()
    }

    render() {
        const emailDetails = (this.state.errors.email) ? <ErrorDetails text={this.state.errors.email}/> : " ";
        const telegramDetails = (this.state.errors.telegram) ? <ErrorDetails text={this.state.errors.telegram}/> : " ";
        const passwordDetails = (this.state.errors.password) ? <ErrorDetails text={this.state.errors.password}/> : " ";
        const repeatPasswordDetails = (this.state.errors.repeatPassword) ?
            <ErrorDetails text={this.state.errors.repeatPassword}/> : " ";
        const firstNameDetails = (this.state.errors.firstName) ?
            <ErrorDetails text={this.state.errors.firstName}/> : " ";
        const lastNameDetails = (this.state.errors.lastName) ? <ErrorDetails text={this.state.errors.lastName}/> : " ";
        const cookieDetails = (this.state.errors.cookie) ? <ErrorDetails text={this.state.errors.cookie}/> : " ";
        const termOfUseDetails = (this.state.errors.termsOfUse) ?
            <ErrorDetails text={this.state.errors.termsOfUse}/> : " ";
        const verifyTelegram = (this.state.verifyCode) ? (
            <div className="verifyCode d-flex" id="codeBlock">
                <input type='text' onChange={e => this.updateCode(e)} placeholder="Введите код..." id="verifyCode"/>
                <button className="button verifyCodeButton" onClick={e => this.checkCode(e)}>Отправить</button>
                <div className="instruction">
                    Откройте бота&nbsp;<a href="https://t.me/A18Q78HBRUbotA18/newbotQ78HBRUbot" target="_blank">Bot</a>
                    > Отправьте /start > Отправьте /code > Полученный код вставьте поле
                </div>
            </div>
        ) : (
            <button onClick={event => this.submitTelegram(event)} id="verifyAccount"
                    className="button">Подтвердить аккаунт
                Telegram
            </button>
        );
        return (
            <div className="registration">
                <LogoLink/>
                <div className="registrationBlock">
                    <h2 className="regTitle">
                        Регистрация
                    </h2>
                    <form className="registrationForm">
                        <label className="formLabel" htmlFor="email">
                            Почта
                        </label>
                        {emailDetails}
                        <input onChange={e => this.updateEmailValue(e)} type="email" id="email"
                               placeholder="Введите..."/>
                        <label htmlFor="telegramUsername" className="formLabel">Никнейм в Telegram</label>
                        {telegramDetails}
                        <input onChange={e => this.updateTelegramUsernameValue(e)} type="text" id="telegramUsername"
                               placeholder="Введите..."/>
                        {verifyTelegram}
                        <div className="names d-flex">
                            <div className="namesItem">
                                <label className="formLabel" htmlFor="firstName">
                                    Имя
                                </label>
                                {firstNameDetails}
                                <input onChange={e => this.updateFirstNameValue(e)} type="text" id="firstName"
                                       placeholder="Введите..."/>
                            </div>
                            <div className="namesItem">
                                <label htmlFor="lastName" className="formLabel">Фамилия</label>
                                {lastNameDetails}
                                <input onChange={e => this.updateLastNameValue(e)} type="text" id="lastName"
                                       placeholder="Введите..."/>
                            </div>
                        </div>
                        <div className="password d-flex">
                            <div className="passwordItem">
                                <label className="formLabel" htmlFor="password">
                                    Пароль
                                </label>
                                {passwordDetails}
                                <input onChange={e => this.updatePasswordValue(e)} type="password" id="password"
                                       placeholder="Введите..."/>
                            </div>
                            <div className="passwordItem">
                                <label htmlFor="repeatPassword" className="formLabel">Повторите пароль</label>
                                {repeatPasswordDetails}
                                <input onChange={e => this.updateRepeatPasswordValue(e)} type="password"
                                       id="repeatPassword" placeholder="Введите..."/>
                            </div>
                        </div>
                        <label htmlFor="inviter" className="formLabel">Пригласитель</label>
                        <input onChange={e => this.updateInviterValue(e)} type="url" id="inviter"
                               placeholder="Введите..."/>
                        <div className="checkBox cookie d-flex">
                            <input className="checkBoxItem" type="checkbox" id="confirmCookie"
                                   onChange={() => this.updateCookieValue()}/>
                            <label htmlFor="confirmCookie" className="formLabel">
                                Я согласен с политикой&nbsp;<a href="https://www.bayer.ru/ru/cookies-policy"
                                                               target="_blank">Cookie</a>
                            </label>
                        </div>
                        {cookieDetails}
                        <div className="checkBox termOfUse d-flex">
                            <input className="checkBoxItem" type="checkbox" id="confirmTermOfUse"
                                   onChange={() => this.updateTermsOfUseValue()}/>
                            <label htmlFor="confirmTermOfUse" className="formLabel">
                                Я согласен с&nbsp;<a href="#"
                                                     target="_blank">позьзовательским соглашением</a>
                            </label>
                        </div>
                        {termOfUseDetails}
                        <div id="html_element">
                        </div>
                        {/*<ReCAPTCHA sitekey="6LdBB9MeAAAAAAE2epeSHc1X6hYou7dWxCBEWMZj"*/}
                        {/*           onChange={this.onChange}/>*/}
                        <button onClick={event => this.onSubmit(event)} id="registerButton"
                                className="button">Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    updateCode(e) {
        this.setState({
            ...this.state,
            code: e.target.value
        });
    }
}

export default RegistrationForm;