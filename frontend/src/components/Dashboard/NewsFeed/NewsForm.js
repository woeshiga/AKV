import React, {Component} from 'react';
import ArticleTitleImage from "./ArticleTitleImage";
import CloudUpload from "../../Icons/CloudUpload";

class NewsForm extends Component {
    render() {
        return (
            <div className="newsEditorContent d-lg-flex d-md-block">
                <div className="newsForm">
                    <label htmlFor="articleTitle" className="formLabel">Заголовок</label>
                    <input type="text" className="articleTitle" id="articleTitle" placeholder="Введите..."/>
                    <label htmlFor="articleTitle" className="formLabel">Статья</label>
                    <textarea className="articleTitle" id="articleTitle" placeholder="Введите..."/>
                </div>
                <div className="ArticleTitleImage">
                    Изображение
                    <label className="imageLabel d-flex flex-column">
                        <CloudUpload/>
                        <span className="imageTitle">
                        Перетяните или выберите файл
                    </span>
                        <input type="file" className="inputArticleImage"/>
                    </label>
                </div>
            </div>
        );
    }
}

export default NewsForm;