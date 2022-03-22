import React, {Component} from 'react';

class ErrorDetails extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <details className="errorDetails">
                <summary className="errorDetailsIcon"></summary>
                {this.props.text}
            </details>
        );
    }
}

export default ErrorDetails;