import React, { Component } from 'react';
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import { getCondition } from "../../api/api";
import "./index.scss";

let titleActive = {
    area: false,
    rentType: false,
    price: false,
    more: false
};

export default class Filter extends Component {

    state = {
        titleActive,
        currentStatus: "",
        filterData: {}
    }

    componentDidMount() {
        this.getConditionList();
    }

    changeTitleActive = status => {
        this.setState({
            titleActive: {
                ...titleActive,
                [status]: true
            },
            currentStatus: status
        });
    }

    // 获取房屋查询条件
    getConditionList = async () => {
        try {
            const res = await getCondition({
                id: JSON.parse(localStorage.getItem("current_city")).value
            });
            this.setState({
                filterData: res.body
            });
        } catch (err) {
            console.log(err);
        }
    }

    // 点击遮罩层关闭所有弹窗
    closeFilter = () => {
        this.setState({
            titleActive,
            currentStatus: ""
        });
    }

    // 点击关闭按钮
    onCancel = (length, item) => {
        this.setState({
            titleActive: {
                ...titleActive,
                [item]: !!length
            },
            currentStatus: ""
        });
    }

    // 点击确认按钮
    onConfirm = (flag, item) => {
        titleActive = {
            ...titleActive,
            [item]: flag
        };
        this.setState({
            titleActive,
            currentStatus: ""
        });
        // console.log(flag, item);
    }

    render() {
        const { titleActive, currentStatus, filterData } = this.state;
        const activeMask = titleActive[currentStatus] ? "mask_active" : "";
        const current = activeMask ? currentStatus : "";
        const { area, subway, rentType, price, ...newData } = filterData;
        const pickerData = {
            area: [area, subway],
            rentType,
            price
        };
        return (
            <div className="filter">
                <FilterTitle titleStatus={titleActive} changeTitleActive={this.changeTitleActive} />
                <FilterPicker
                    titleStatus={titleActive}
                    currentStatus={current}
                    filterData={pickerData[current]}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                />
                <FilterMore
                    titleStatus={titleActive}
                    currentStatus={current}
                    filterData={newData}
                />
                <div className={"mask " + activeMask} onClick={this.closeFilter} ></div>
            </div>
        )
    }
}
