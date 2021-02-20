import React, { Component } from 'react';
import FilterFooter from "../FilterFooter";
import "./index.scss";

export default class FilterMore extends Component {

    render() {
        const { currentStatus } = this.props;
        const activeMore = currentStatus && currentStatus === "more" ? "filtermore_active" : "";
        return (
            <div className={"filtermore " + activeMore}>
                <dl className="filtermore_body">
                    <dt>户型</dt>
                    <div className="select_item">
                        <dd>一室</dd>
                        <dd>一室</dd>
                        <dd>一室</dd>
                        <dd>一室</dd>
                        <dd>一室</dd>
                    </div>
                </dl>
                <FilterFooter />
            </div>
        )
    }
}
