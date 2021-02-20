import React, { Component } from 'react'
import "./index.scss";
import { Toast, ActivityIndicator } from "antd-mobile"
import TopNavBar from "../../components/TopNavBar";
import { getSubCity, getHouseInfo, getHousesFilter } from "../../api/api";

const BMap = window.BMap;
const city = {};

export default class Map extends Component {

    bottomAction = React.createRef();

    state = {
        subCity: [],
        showAction: false,
        housesList: [],
        actionContentLoading: false
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
        Object.assign(city, this.props.location.state.city);
        const subCityLabel = subCity ? subCity.label : "";
        // 给对象赋值一个map属性
        this.map = new BMap.Map("container");          // 创建地图实例  
        this.map.addEventListener("dragstart", () => {
            this.setState({
                showAction: false,
                housesList: []
            });
        });
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野  
        myGeo.getPoint(city.label + subCityLabel, point => {
            if (point) {
                // console.log(point);
                // 初始化地图，设置中心点坐标和地图级别
                this.map.addControl(new BMap.NavigationControl());
                this.map.addControl(new BMap.ScaleControl());
                this.map.addControl(new BMap.MapTypeControl());
                this.map.centerAndZoom(point, 11);
                this.renderAddOverlays(subCity ? subCity.value : city.value);
            }
        }, city.label);

    }

    // 渲染地图覆盖物
    renderAddOverlays = async (id) => {
        Toast.loading("加载中", 0);
        const res = await getHouseInfo({ id });
        const zoom = this.map.getZoom();

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
            if (zoom === 15) {
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
            label.addEventListener("click", (e) => {
                switch (zoom) {
                    case 11: this.map.centerAndZoom(newPoint, 13); break;
                    case 13: this.map.centerAndZoom(newPoint, 15); break;
                    case 15:
                        const bottomActionHeight = this.bottomAction.current.clientHeight;
                        const centerX = window.innerWidth / 2;
                        const centerY = (window.innerHeight - bottomActionHeight) / 2;
                        console.log(e);
                        let clientX = e.clientX;
                        let clientY = e.clientY;
                        if (e.changedTouches) {
                            clientX = e.changedTouches[0].clientX;
                            clientY = e.changedTouches[0].clientY;
                        }
                        Toast.loading("加载中", 0);
                        this.setState({
                            actionContentLoading: true,
                            showAction: true
                        });
                        this.map.panBy(centerX - clientX, centerY - clientY);
                        getHousesFilter({ cityId: item.value }).then(res => {
                            this.setState({
                                housesList: res.body.list
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                        Toast.hide();
                        this.setState({
                            actionContentLoading: false
                        });
                        return;
                    default: break;
                }
                // 百度地图BUG,不加定时器报错
                setTimeout(() => {
                    this.map.clearOverlays();
                }, 0);
                this.renderAddOverlays(item.value);
            })
            this.map.addOverlay(label);
            Toast.hide();
        });
    }

    render() {
        return (
            <div className="map">
                <TopNavBar title="地图找房" />
                <div
                    id="container"
                    style={{ height: document.documentElement.clientHeight - 50 + "px" }}
                >
                </div>
                <div ref={this.bottomAction} className={this.state.showAction ? "bottom_action show" : "bottom_action"}>
                    <div className="action_title">
                        <h5>房屋列表</h5>
                        <p>更多房源</p>
                    </div>
                    <ul className="action_content">
                        <ActivityIndicator animating={this.state.actionContentLoading} />
                        {
                            this.state.housesList.map(item => {
                                return <li key={item.houseCode}>
                                    <div className="action_content_left">
                                        <img src={`http://api-haoke-web.itheima.net${item.houseImg}`} alt="" />
                                    </div>
                                    <div className="action_content_right">
                                        <p>{item.title}</p>
                                        <p>{item.desc}</p>
                                        <p>
                                            {item.tags.map(tagsItem => <span key={tagsItem}>{tagsItem}</span>)}
                                        </p>
                                        <h3>{item.price}<i>元/月</i></h3>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
