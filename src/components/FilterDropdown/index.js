import React, { Component } from 'react';
import "./index.scss";
import { PickerView } from "antd-mobile";
import FilterFooter from "../FilterFooter";
import PropTypes from "prop-types";

const province = [
    {
        label: '北京',
        value: '01',
        children: [
            {
                label: '东城区',
                value: '01-1',
            },
            {
                label: '西城区',
                value: '01-2',
            },
            {
                label: '崇文区',
                value: '01-3',
            },
            {
                label: '宣武区',
                value: '01-4',
            },
        ],
    },
    {
        label: '浙江',
        value: '02',
        children: [
            {
                label: '杭州',
                value: '02-1',
                children: [
                    {
                        label: '西湖区',
                        value: '02-1-1',
                    },
                    {
                        label: '上城区',
                        value: '02-1-2',
                    },
                    {
                        label: '江干区',
                        value: '02-1-3',
                    },
                    {
                        label: '下城区',
                        value: '02-1-4',
                    },
                ],
            },
            {
                label: '宁波',
                value: '02-2',
                children: [
                    {
                        label: 'xx区',
                        value: '02-2-1',
                    },
                    {
                        label: 'yy区',
                        value: '02-2-2',
                    },
                ],
            },
            {
                label: '温州',
                value: '02-3',
            },
            {
                label: '嘉兴',
                value: '02-4',
            },
            {
                label: '湖州',
                value: '02-5',
            },
            {
                label: '绍兴',
                value: '02-6',
            },
        ],
    },
];

export default class FilterDropdown extends Component {

    state = {
        open: false,
        value: ['02', '02-1', '02-1-1']
    }

    onChange = (value) => {
        console.log(value);
        this.setState({
            value,
        });
    }

    onScrollChange = (value) => {
        console.log(value);
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            open: nextProps.open
        }
    }

    onCancel = () => {
        this.props.onOpenChange(false);
    }

    onConfirm = () => {
        this.props.onConfirm();
    }

    showPicker = () => {
        if (this.state.open) {
            return <div>
                <PickerView
                    onChange={this.onChange}
                    onScrollChange={this.onScrollChange}
                    value={this.state.value}
                    data={province}
                    cascade={true}
                />
                <FilterFooter onCancel={this.onCancel} onConfirm={this.onConfirm} />
            </div>
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="filterdropdown">
                <div className="dropdown" style={{ height: this.state.open ? "290px" : "0" }}>
                    {this.showPicker()}
                </div>
                <div
                    className="mask"
                    style={{ opacity: this.state.open ? "1" : "0" }}
                    onClick={() => this.props.onOpenChange(false)}
                ></div>
            </div>
        )
    }
}

FilterDropdown.propTypes = {
    open: PropTypes.bool
}

FilterDropdown.defaultProps = {
    open: false
}
