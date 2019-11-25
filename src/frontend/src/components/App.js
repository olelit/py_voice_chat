import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'

import Header from "./layout/Header";
import Dashboard from "./chatrooms/Dashboard";

import {connect, Provider} from 'react-redux'
import store from "../store";
import {getUserByToken} from "../actions/users";

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    {console.log(this.props.user)}
                    {console.log(this.props.isAuth)}
                    <Header/>
                    <div className="container">
                        <Dashboard/>
                    </div>
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))