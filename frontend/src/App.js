import RegistrationForm from "./components/Auth/RegistrationForm";
import LoginForm from "./components/Auth/LoginForm";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import {Switch, Route, Redirect} from "react-router-dom";
import Footer from "./components/Home/Footer";
import React from "react";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import NewsFeed from "./components/Dashboard/NewsFeed/NewsFeed";
import NewsEditor from "./components/Dashboard/NewsFeed/NewsEditor";

class App extends React.Component {
    componentDidMount() {
        if (localStorage.getItem('token')) {
            document.getElementsByTagName('body')[0].className = "dashBoard";
        }
        else {
            document.getElementsByTagName('body')[0].className = "";
        }
    }

    render() {
        return (
            <div className="App">
                <div id="main">
                    <Switch>
                        <Route exact path="/registration">
                            {(localStorage.getItem('token')) ? <Redirect to='/dashboard'/> : <RegistrationForm/>}
                        </Route>
                        <Route exact path="/">
                            {(localStorage.getItem('token')) ? <Redirect to='/dashboard'/> : <Home/>}
                        </Route>
                        <Route exact path="/dashboard">
                            {(localStorage.getItem('token')) ? <Dashboard/> : <Redirect to='/'/>}
                        </Route>
                        <Route exact path="/login">
                            {(localStorage.getItem('token')) ? <Redirect to='/dashboard'/> : <LoginForm/>}
                        </Route>
                        <Route exact path="/forgot_password">
                            {(localStorage.getItem('token')) ? <Redirect to='/dashboard'/> : <ForgotPassword/>}
                        </Route>
                        <Route exact path="/reset_password/:token"
                               render={props => (localStorage.getItem('token')) ? <Redirect to='/dashboard'/> :
                                   <ResetPassword {...props} />}/>
                        <Route exact path="/news">
                            {(localStorage.getItem('token')) ? <NewsFeed/> : <Redirect to="/"/>}
                        </Route>
                        <Route exact path="/news/create">
                            {(localStorage.getItem('token')) ? <NewsEditor/> : <Redirect to="/"/>}
                        </Route>
                    </Switch>
                </div>
                {(localStorage.getItem('token'))?null:<Footer/>}
            </div>
        );
    }
}

export default App;
