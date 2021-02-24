import React, { Component } from 'react';
import { PickerView } from "antd-mobile";
import FilterFooter from "../FilterFooter";
import store from "../../store/index";
import "./index.scss";

let newArr = {
    area: [],
    rentType: [],
    price: []
};

export default class FilterPicker extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.changeStore);
    }

    state = {
        ...store.getState(),
        filterData: []
    }

    changeStore = () => {
        const { currentStatus } = this.props;
        this.setState(store.getState(), () => {
            const titleActive = !!this.state[currentStatus].length;
            this.props.onConfirm(titleActive, currentStatus);
        });
    }

    static getDerivedStateFromProps(nextProps) {
        let filterData = nextProps.filterData ? nextProps.filterData : [];
        return {
            filterData
        }
    }

    onChange = (value) => {
        const { currentStatus } = this.props;
        newArr[currentStatus] = value[0] === "null" ? [] : value;
    }

    onConfirm = () => {
        const { currentStatus } = this.props;
        const action = {
            type: currentStatus,
            value: newArr[currentStatus]
        }
        store.dispatch(action);
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
