import React, { Component } from 'react';
import { PickerView } from "antd-mobile";
import FilterFooter from "../FilterFooter";
import "./index.scss";

export default class FilterPicker extends Component {

    state = {
        area: [],
        rentType: [],
        price: [],
        filterData: []
    }

    static getDerivedStateFromProps(nextProps) {
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
        const newArr = value[0] === "null" ? [] : value;
        this.setState({
            [currentStatus]: newArr
        });
    }

    // onScrollChange = (value) => {
    //     console.log(value);
    // }

    onConfirm = () => {
        const titleActive = !!this.state[this.props.currentStatus].length;
        this.props.onConfirm(titleActive, this.props.currentStatus);
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
