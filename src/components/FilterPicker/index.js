import React, { Component } from 'react';
import { PickerView } from "antd-mobile";
import FilterFooter from "../FilterFooter";
import "./index.scss";

let newArr = {
        area: [],
        rentType: [],
        price: []
};

export default class FilterPicker extends Component {

    state = {
        area: [],
        rentType: [],
        price: [],
        filterData: []
    }

    static getDerivedStateFromProps(nextProps){
        let filterData = nextProps.filterData ? nextProps.filterData : [];
        if (nextProps.currentStatus === "area") {
            filterData = filterData.children;
        }
        return {
            filterData
        }
    }

    onChange = (value) => {
        const { currentStatus } = this.props;
        newArr[currentStatus] = value[0] === "null" ? [] : value;
    }

    // onScrollChange = (value) => {
    //     console.log(value);
    // }

    onConfirm = () => {
        const { currentStatus } = this.props;
        this.setState({
            [currentStatus]: newArr[currentStatus]
        }, () => {
                const titleActive = !!this.state[currentStatus].length;
                this.props.onConfirm(titleActive, currentStatus);
        });
    }

    render() {
        const { currentStatus, titleStatus } = this.props;
        const active = currentStatus && currentStatus !== "more";
        return (
            <div
                className="filterpicker"
            >
                <div
                    className="dropdown"
                    style={{ height: active ? "77.333vw" : "0" }}
                >
                    <PickerView
                        onChange={this.onChange}
                        // onScrollChange={this.onScrollChange}
                        value={this.state[currentStatus]}
                        data={this.state.filterData}
                        cascade={this.props.currentStatus === "area"}
                    />
                    <FilterFooter
                        current={currentStatus}
                        titleStatus={titleStatus}
                        onCancel={() => this.props.onCancel(this.state[currentStatus].length, currentStatus)}
                        onConfirm={this.onConfirm}
                    />
                </div>
            </div>
        )
    }
}
