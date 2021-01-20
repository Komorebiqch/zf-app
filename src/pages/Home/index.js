import React, { Component } from 'react';
import { TabBar } from "antd-mobile";
import "./index.css";
import Index from "../Index";
import HouseList from "../HouseList";
import News from "../News";
import Profile from "../Profile";
import { Route } from "react-router-dom";

// 路由
const tableItems = [
    {
        title: "首页",
        icon: "icon-home",
        path: "/home/index"
    },
    {
        title: "找房",
        icon: "icon-sousuo-",
        path: "/home/houselist"
    },
    {
        title: "资讯",
        icon: "icon-zixun",
        path: "/home/news"
    },
    {
        title: "我的",
        icon: "icon-wode",
        path: "/home/profile"
    },
];

export default class Home extends Component {
    state = {
        selectedTab: '/home/index',
        hidden: false
    }

    renderTabBar = () => {
        return tableItems.map(item => {
            return (
                <TabBar.Item
                    title={item.title}
                    key={item.path}
                    icon={<i className={`iconfont ${item.icon}`}></i>}
                    selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
                    selected={this.state.selectedTab === item.path}
                    onPress={() => {
                        this.setState({
                            selectedTab: item.path,
                        });
                        this.props.history.push(item.path);
                    }}
                >
                </TabBar.Item>
            )
        });
    }

    render() {
        return (
            <div className="home">
                <Route exact path="/home/index" component={Index} />
                <Route exact path="/home/houselist" component={HouseList} />
                <Route exact path="/home/news" component={News} />
                <Route exact path="/home/profile" component={Profile} />
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="bottom"
                >
                    {this.renderTabBar()}
                </TabBar>
            </div>
        )
    }
}
