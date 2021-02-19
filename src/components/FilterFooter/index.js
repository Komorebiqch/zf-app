import React, { Component } from 'react';
import "./index.scss";

export default class FilterFooter extends Component {
    render() {
        return (
            <div className="filterfooter">
                <button onClick={this.props.onCancel}>取消</button>
                <button onClick={this.props.onConfirm}>确定</button>
            </div>
        )
    }
}

