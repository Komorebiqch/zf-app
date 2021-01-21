import React, { Component } from 'react'
import "./index.scss";
import { Toast } from "antd-mobile"
import TopNavBar from "../../component/TopNavBar";
import { getSubCity } from "../../api/api";

const BMap = window.BMap;
const city = {};

export default class Map extends Component {

    state = {
        subCity: []
    }

    componentDidMount() {
        Toast.loading("加载中", 1);
        this.initMap();
        // this.getSubCityList();
    }

    // 获取子级城市列表
    getSubCityList = async () => {
        try {
            const res = await getSubCity({ id: city.value });
            this.setState({
                subCity: res.body
            });
        } catch (err) {
            console.log(err);
        }
    }

    // 初始化地图
    initMap = async () => {
        Object.assign(city, this.props.location.state.city);
        // const res = await getSubCity({ id: city.value });
        // const subCity = res.body;
        var map = new BMap.Map("container");          // 创建地图实例  
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野  
        myGeo.getPoint(city.label, point => {
            if (point) {
                // console.log(point);
                // 创建文本标注对象
                let opts = {
                    position: point,
                    offset: new BMap.Size(0, 0) // 设置文本偏移量
                }
                const label = new BMap.Label(``, opts);
                label.setContent(`
                <div class="map_overlay">
                    <div>顺义区</div>
                    <div>50套</div>
                </div>
                `);
                // 自定义文本标注样式
                label.setStyle({});
                map.addOverlay(label);
                // 初始化地图，设置中心点坐标和地图级别
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.MapTypeControl());
                map.centerAndZoom(point, 11);
            }
        }, city.label);
        Toast.hide();
    }

    render() {
        return (
            <div className="map">
                <TopNavBar title="地图找房" />
                <div id="container" style={{ height: document.documentElement.clientHeight - 50 + "px" }}></div>
            </div>
        )
    }
}
