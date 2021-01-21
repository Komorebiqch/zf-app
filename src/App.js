import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import City from "./pages/City";
import Map from "./pages/Map";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/home" component={Home} />
                    <Route exact path="/"
                        render={
                            () => {
                                return <Redirect to="/home/index" />
                            }
                        }
                    />
                    <Route exact path="/citylist" component={City} />
                    <Route exact path="/map" component={Map} />
                    {/* <Redirect exact from="/" to="/home/index" /> */}
                </div>
            </Router>
        );
    }
}