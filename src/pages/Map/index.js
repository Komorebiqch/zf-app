import React, { Component } from 'react'
import "./index.scss";
import { Toast } from "antd-mobile"
import TopNavBar from "../../components/TopNavBar";
import { getSubCity, getHouseInfo } from "../../api/api";

const BMap = window.BMap;
const city = {};
let mapScale = 11;

export default class Map extends Component {

    state = {
        subCity: []
    }

    componentDidMount() {
        this.initMap();
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
    initMap = async (subCity) => {
        Toast.loading("加载中", 0);
        Object.assign(city, this.props.location.state.city);
        // 给对象赋值一个map属性
        console.log(subCity);
        const subCityLabel = subCity ? subCity.label : "";
        this.map = new BMap.Map("container");          // 创建地图实例  
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野  
        myGeo.getPoint(city.label + subCityLabel, point => {
            if (point) {
                // console.log(point);
                // 初始化地图，设置中心点坐标和地图级别
                this.map.addControl(new BMap.NavigationControl());
                this.map.addControl(new BMap.ScaleControl());
                this.map.addControl(new BMap.MapTypeControl());
                this.map.centerAndZoom(point, mapScale);
                this.renderAddOverlays(subCity ? subCity.value : city.value);
            }
        }, city.label);

    }

    // 渲染地图覆盖物
    renderAddOverlays = async (id) => {
        const res = await getHouseInfo({ id });
        res.body.forEach(item => {
            var newPoint = new BMap.Point(item.coord.longitude, item.coord.latitude);
            // 创建文本标注对象
            let opts = {
                position: newPoint,
                offset: new BMap.Size(-35, -35) // 设置文本偏移量
            }
            const label = new BMap.Label(``, opts);
            label.setContent(`
                    <div class="map_overlay">
                        <div>${item.label}</div>
                        <div>${item.count}套</div>
                    </div>
                    `);
            // 自定义文本标注样式
            label.setStyle({
                padding: 0,
                border: "none",
                borderRadius: "50%"
            });
            if (mapScale === 15) {
                label.setContent(`
                <div class="map_overlay_15">
                    <div>${item.label}</div>
                    <div>${item.count}套</div>
                </div>
                `);
                label.setStyle({
                    borderRadius: 0
                });
            }

            // 定义点击覆盖物点击事件
            label.addEventListener("click", e => {
                mapScale += 2;
                this.initMap(item);
            })
            this.map.addOverlay(label);
            Toast.hide();
        });
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
