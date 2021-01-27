import React, { Component } from 'react';
import FilterDropdown from "../FilterDropdown";
import "./index.scss";

const filterTitleData = [
    {
        id: 1,
        title: "区域"
    },
    {
        id: 2,
        title: "方式"
    },
    {
        id: 3,
        title: "租金"
    },
    {
        id: 4,
        title: "筛选"
    }
];

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
        this.setState({
            openDrop: false
        });
    }

    // 渲染下拉标题
    renderTitle = () => {
        return filterTitleData.map(item => {
            let activeArrows = "iconfont icon-jiantouarrow486";
            let activeTextColor = "filter_title"
            if (this.state.openDrop) {
                activeArrows = "iconfont icon-jiantouarrow486 title_active";
                activeTextColor = "filter_title title_active"
            }
            return <div
                key={item.id}
                className={activeTextColor}
                onClick={() => this.setState({ openDrop: !this.state.openDrop })}
            >
                <span>{item.title}</span>
                <i className={activeArrows} style={
                    {
                        display: "inline-block",
                        transform: this.state.openDrop ? [`rotate(${180}deg)`] : [`rotate(${0}deg)`],
                        transition: " all .3s"
                    }
                }></i>
            </div>
        });
    }

    render() {
        return (
            <div className="filter">
                <div className="title">
                    {this.renderTitle()}
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
