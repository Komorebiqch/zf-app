import React, { Component } from 'react'
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class TopNavBar extends Component {
    render() {
        return (
            <div className="TopNavBar">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#000" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >
                    {this.props.title}
                </NavBar>
            </div>
        )
    }
}

TopNavBar.propTypes = {
    title: PropTypes.string
}

TopNavBar.defaultProps = {
    title: "标题"
}


export default withRouter(TopNavBar);
