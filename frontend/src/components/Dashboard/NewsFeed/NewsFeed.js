import React, {Component} from 'react';

import CreateNews from "../../Icons/CreateNews";
import SideBar from "../SideBar";

class NewsFeed extends Component {
    render() {
        return (
            <div className="d-flex">
                <SideBar/>
                <div className="newsFeedContent">
                    <CreateNews url="/news/create"/>
                </div>
            </div>
        );
    }
}

export default NewsFeed;