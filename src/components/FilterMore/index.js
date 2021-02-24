import React, { Component } from 'react';
import FilterFooter from "../FilterFooter";
import "./index.scss";

export default class FilterMore extends Component {

    componentDidMount() {

    }

    renderType = (list) => {
        if (!list) return
        return list.map(item => {
            return <dd key={item.value} >{item.label}</dd>
        });
    }

    render() {
        const { currentStatus, filterData } = this.props;
        console.log(filterData);
        const activeMore = currentStatus && currentStatus === "more" ? "filtermore_active" : "";
        return (
            <div className={"filtermore " + activeMore}>
                <dl className="filtermore_body">
                    <dt>户型</dt>
                    <div className="select_item">
                        {this.renderType(filterData.roomType)}
                    </div>
                    <dt>朝向</dt>
                    <div className="select_item">
                        {this.renderType(filterData.oriented)}
                    </div>
                    <dt>楼层</dt>
                    <div className="select_item">
                        {this.renderType(filterData.floor)}
                    </div>
                    <dt>房屋亮点</dt>
                    <div className="select_item">
                        {this.renderType(filterData.characteristic)}
                    </div>
                </dl>
                <FilterFooter />
            </div>
        )
    }
}
