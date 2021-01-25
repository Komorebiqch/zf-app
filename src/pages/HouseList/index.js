import React, { Component } from 'react';
import Filter from "../../components/Filter";
import "./index.scss";

export default class HouseList extends Component {
    render() {
        return (
            <div className="HouseList">
                <div className="houselist_title">
                    <Filter />
                </div>
            </div>
        )
    }
}
