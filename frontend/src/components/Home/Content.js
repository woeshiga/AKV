import React, {Component} from 'react';
import Buttons from "./Buttons";

class Content extends Component {
    render() {
        return (
            <section className="homeContent content">
                <div className="container homeContainer">
                    <p className="contentText homeText">
                        AKV — Платформа
                        проверенных инструментов
                        для вложений
                    </p>
                    <Buttons/>
                </div>
            </section>
        );
    }
}

export default Content;