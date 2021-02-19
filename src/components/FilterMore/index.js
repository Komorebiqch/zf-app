import React, { Component } from 'react';
import FilterFooter from "../FilterFooter";
import "./index.scss";

export default class FilterMore extends Component {
    render() {
        const { currentStatus } = this.props;
        const activeMore = currentStatus && currentStatus === "more" ? "filtermore_active" : "";
        return (
            <div className={"filtermore " + activeMore}>
                更多
                <FilterFooter />
            </div>
        )
    }
}
