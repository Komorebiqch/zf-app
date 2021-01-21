import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import "./index.scss";
import { getCarousel, getCurrentCity } from "../../api/api";

export default class Index extends Component {
    state = {
        data: [],
        imgHeight: 176,
        flag: false,
        city: {}
    }

    componentDidMount() {
        this.getCarouselList();
        this.renderCurrentCity();
    }
    
    // 获取定位
    getLocation = () => {
        var myCity = new window.BMap.LocalCity();
        return new Promise((resolve, reject) => {
            myCity.get(result => {
                var cityName = result.name;
                resolve(cityName);
            });
        });
    }

    // 获取当前定位城市信息
    renderCurrentCity = async () => {
        const state = this.props.location.state;
        const cityName = state ? state.city.label : await this.getLocation();
        const currentCity = await getCurrentCity({ name: cityName });
        this.setState({
            city: currentCity.body
        });
    }

    // 获取轮播图列表
    getCarouselList = async () => {
        try {
            const res = await getCarousel();
            this.setState({
                data: res.body
            }, () => {
                this.setState({
                    flag: true
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="index">
                <div className="search">
                    <div className="left_search">
                        <div className="select_area" onClick={() => {
                            this.props.history.push({
                                pathname: "/citylist",
                                state: {
                                    city: this.state.city
                                }
                            });
                        }} >
                            <span>{ this.state.city.label }</span>
                            <i className="iconfont icon-jiantouarrow486"></i>
                        </div>
                        <div className="search_input"  onClick={() => {
                                this.props.history.push({
                                    pathname: "/map",
                                    state: {
                                        city: this.state.city
                                    }
                                });
                            }}>
                            <i className="iconfont icon-sousuo"></i>
                            <span>请输入小区或地址</span>
                        </div>
                    </div>
                    <div className="right_maplogo">
                        <i className="iconfont icon-dingwei"></i>
                    </div>
                </div>
                <Carousel
                    autoplay={this.state.flag}
                    infinite
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`http://api-haoke-web.itheima.net${val.imgSrc}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <ul className="mid-tab">
                    <li>
                        <i className="iconfont icon-shouye"></i>
                        <span>整租</span>
                    </li>
                    <li>
                        <i className="iconfont icon-pengyou"></i>
                        <span>合租</span>
                    </li>
                    <li>
                        <i className="iconfont icon-dingwei"></i>
                        <span>地图找房</span>
                    </li>
                    <li>
                        <i className="iconfont icon-rentlinemtui"></i>
                        <span>去出租</span>
                    </li>
                </ul>
                <div className="grid-items">
                    <div className="title">
                        <h2>租房小组</h2>
                        <span>更多</span>
                    </div>
                    <ul className="items">
                        <li>
                            <div className="items-left">
                                <span>家住回龙观</span>
                                <span>归属的感觉</span>
                            </div>
                            <div className="items-right">图片</div>
                        </li>
                        <li>
                            <div className="items-left">
                                <span>家住回龙观</span>
                                <span>归属的感觉</span>
                            </div>
                            <div className="items-right">图片</div>
                        </li>
                        <li>
                            <div className="items-left">
                                <span>家住回龙观</span>
                                <span>归属的感觉</span>
                            </div>
                            <div className="items-right">图片</div>
                        </li>
                        <li>
                            <div className="items-left">
                                <span>家住回龙观</span>
                                <span>归属的感觉</span>
                            </div>
                            <div className="items-right">图片</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
