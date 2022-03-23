import React, {Component} from 'react';

import CreateNews from "../../Icons/CreateNews";
import SideBar from "../SideBar";
import store from "../../../store";
import {getNewsList} from "../../../actions/news";
import ArticleCard from "./ArticleCard";
import {Row} from "react-bootstrap";

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null, newsLoading: true
        };
    }

    componentDidMount() {
        store.dispatch(getNewsList())
            .then(() => this.setState({
                articles: store.getState().news.data, newsLoading: false
            }));
    }

    newsList() {
        let news = [];
        this.state.articles.forEach(item => {
            news.push(<ArticleCard key={item.id} img={item.image} imgName={item.image.replaceAll('/media/', '')}
                                   title={item.title}
                                   description={(item.content.length <= 50) ? item.content : item.content.substr(0, 50) + "..."}/>);
        });
        console.log(news);
        return news;
    }

    render() {
        const {newsLoading} = this.state;
        if (newsLoading) {
            return <div>Loading...</div>
        }
        const news = this.newsList();
        return (<div className="d-flex">
            <SideBar/>
            <div className="newsFeedContent">
                <CreateNews url="/news/create"/>
                <Row className="">
                    {news}
                </Row>
            </div>
        </div>);
    }
}

export default NewsFeed;