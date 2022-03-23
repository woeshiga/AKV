import React, {Component} from 'react';

class NewsForm extends Component {
    render() {
        return (
            <div className="newsForm">
                <label htmlFor="articleTitle" className="formLabel">Заголовок</label>
                <input type="text" className="articleTitle" id="articleTitle" placeholder="Введите..."/>
                <label htmlFor="articleTitle" className="formLabel">Статья</label>
                <textarea className="articleTitle" id="articleTitle" placeholder="Введите..."/>
            </div>
        );
    }
}

export default NewsForm;