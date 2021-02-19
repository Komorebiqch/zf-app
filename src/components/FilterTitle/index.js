import React, { Component } from 'react';
import "./index.scss";

const titleList = [
    {
        id: "area",
        title: "区域"
    },
    {
        id: "rentType",
        title: "方式"
    },
    {
        id: "price",
        title: "租金"
    },
    {
        id: "more",
        title: "筛选"
    }
];

export default class FilterTitle extends Component {

    // 渲染标题
    renderTitle() {
        return titleList.map(item => {
            const active = this.props.titleStatus[item.id] ? "title_active" : "";
            return <div
                key={item.id}
                className={`filter_title ${active}`}
                onClick={() => { this.props.changeTitleActive(item.id) }}
            >
                <span>{item.title}</span>
                <i className={`iconfont icon-jiantouarrow486 ${active}`}></i>
            </div>
        });
    }

    render() {
        return (
            <div className="filtertitle">
                {this.renderTitle()}
            </div>
        )
    }
}
