import React, {Component} from 'react';
import {SERVER_DOMAIN} from "../../../config";
import {Col} from "react-bootstrap";

class ArticleCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col className="col-lg-4 col-md-6 col-sm-12">
                <div className="card bg-dark">
                    <div className="cardImage">
                        <img src={`${SERVER_DOMAIN}${this.props.img}`} alt={this.props.imgName}/>
                    </div>
                    <div className="card-body">
                        <p className="card-text articleCardTitle">
                            {this.props.title}
                        </p>
                        <p className="card-text articleCardDescription">
                            {this.props.description}
                        </p>
                    </div>
                </div>
            </Col>
        );
    }
}

export default ArticleCard;