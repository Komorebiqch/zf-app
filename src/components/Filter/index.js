import React, { Component } from 'react';
import FilterDropdown from "../FilterDropdown";
import "./index.scss";

export default class Filter extends Component {

    state = {
        openDrop: false
    }

    onOpenChange = flag => {
        this.setState({
            openDrop: flag
        });
    }

    onConfirm = () => {
        console.log(1);
        this.setState({
            openDrop: false
        });
    }

    render() {
        return (
            <div className="filter">
                <div className="title">
                    <div className="filter_title title_active" onClick={() => this.setState({ openDrop: true })}>
                        <span>区域</span>
                        <i className="iconfont icon-jiantouarrow486 title_active"></i>
                    </div>
                    <div className="filter_title">
                        <span>区域</span>
                        <i className="iconfont icon-jiantouarrow486"></i>
                    </div>
                    <div className="filter_title">
                        <span>区域</span>
                        <i className="iconfont icon-jiantouarrow486"></i>
                    </div>
                    <div className="filter_title">
                        <span>区域</span>
                        <i className="iconfont icon-jiantouarrow486"></i>
                    </div>
                </div>
                <FilterDropdown className="dropdown"
                    onOpenChange={this.onOpenChange}
                    onConfirm={this.onConfirm}
                    open={this.state.openDrop}
                />
            </div >
        )
    }
}
