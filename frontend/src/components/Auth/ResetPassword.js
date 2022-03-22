import React, {Component} from 'react';
import {getResetToken} from "../../actions/auth";
import store from "../../store";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.match.params.token,
            resetPasswordFormIsLoading: true
        };
    }

    componentDidMount() {
        store.dispatch(getResetToken({token: this.state.token}))
            .then(() => this.setState({
                ...this.state,
                resetPasswordFormIsLoading: false,
                status: (store.getState().auth.resetToken.status === 'ok')
            }))
    }


    render() {
        const {resetPasswordFormIsLoading} = this.state
        if (resetPasswordFormIsLoading) {
            return <div>Loading...</div>
        }
        if (this.state.status) {
            return (
                <div>
                    OK
                </div>
            );
        }
        else {
            return (
                <div>
                    Error
                </div>
            );
        }
    }
}

export default ResetPassword;