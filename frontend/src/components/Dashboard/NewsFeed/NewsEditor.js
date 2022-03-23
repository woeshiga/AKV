import React, {Component} from 'react';
import SideBar from "../SideBar";
// import {Container} from "react-bootstrap";
// import NewsForm from "./NewsForm";
// import ArticleTitleImage from "./ArticleTitleImage";
// import Button from "../../Buttons/Button";
import CloudUpload from "../../Icons/CloudUpload";
import store from "../../../store";
import {createArticle} from "../../../actions/news";

class NewsEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            image: null
        };
    }

    updateTitle(e) {
        this.setState({
            ...this.state,
            title: e.target.value
        });
    }

    updateContent(e) {
        this.setState({
            ...this.state,
            content: e.target.value
        });
    }

    updateImage(e) {
        this.setState({
            ...this.state,
            image: e.target.files[0]
        });
    }

    publish(e) {
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
        store.dispatch(createArticle(form_data));
    }

    render() {
        return (
            <div className="d-flex">
                <SideBar/>
                <div className="newsEditorContainer">
                    <div className="headEditor d-lg-flex d-sm-block justify-content-between">
                        <div className="newsTitle">Новая новость</div>
                        <button onClick={e => this.publish(e)} className="button publishButton">Опубликовать</button>
                    </div>
                    <div className="newsEditorContent d-lg-flex d-md-block">
                        <div className="newsEditorContent d-lg-flex d-md-block">
                            <div className="newsForm">
                                <label htmlFor="articleTitle" className="formLabel">Заголовок</label>
                                <input onChange={e => this.updateTitle(e)} type="text" className="articleTitle"
                                       id="articleTitle" placeholder="Введите..."/>
                                <label htmlFor="articleTitle" className="formLabel">Статья</label>
                                <textarea onChange={e => this.updateContent(e)} className="articleTitle"
                                          id="articleTitle" placeholder="Введите..."/>
                            </div>
                            <div className="ArticleTitleImage">
                                Изображение
                                <label className="imageLabel d-flex flex-column">
                                    <CloudUpload/>
                                    <span className="imageTitle">
                        Перетяните или выберите файл
                    </span>
                                    <input onChange={e => this.updateImage(e)} type="file" className="inputArticleImage"/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsEditor;