import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/home" component={Home} />
                    {/* <Route exact path="/"
                        render={
                            () => {
                                return <Redirect to="/home/index" />
                            }
                        }
                    /> */}
                    <Redirect from="/" to="/home/index" />
                </div>
            </Router>
        );
    }
}