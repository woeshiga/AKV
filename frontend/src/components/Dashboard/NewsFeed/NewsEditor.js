import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Container} from "react-bootstrap";
import NewsForm from "./NewsForm";
import ArticleTitleImage from "./ArticleTitleImage";
import Button from "../../Buttons/Button";

class NewsEditor extends Component {
    render() {
        return (
            <div className="d-flex">
                <SideBar/>
                <div className="newsEditorContainer">
                    <div className="headEditor d-lg-flex d-sm-block justify-content-between">
                        <div className="newsTitle">Новая новость</div>
                        <button className="button publishButton">Опубликовать</button>
                    </div>
                    <div className="newsEditorContent d-lg-flex d-md-block">
                        <NewsForm/>
                        <ArticleTitleImage/>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsEditor;