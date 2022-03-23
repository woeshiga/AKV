import React, {Component} from 'react';
import CloudUpload from "../../Icons/CloudUpload";

class ArticleTitleImage extends Component {
    render() {
        return (
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
        );
    }
}

export default ArticleTitleImage;