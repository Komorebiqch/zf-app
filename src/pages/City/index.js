import React, { Component } from 'react';
import TopNavBar from "../../component/TopNavBar";
import "./index.scss";
import { getCity, getHotCity } from "../../api/api";
import { List } from "react-virtualized";

// const BMap = window.BMap;

export default class Area extends Component {
    listRef = React.createRef();

    state = {
        list: [],
        cityIndex: [],
        cityList: {},
        activeIndex: 0,
    }

    componentDidMount() {
        this.getCityList();
    }

    // 获取城市列表
    getCityList = async () => {
        try {
            let cityList = {};
            let cityIndex = [];
            // 获取城市列表
            const res = await getCity();
            cityList = this.formatCityList(res.body);
            cityIndex = Object.keys(cityList).sort();
            // 获取热门城市列表
            const hotCity = await getHotCity();
            cityList["hot"] = hotCity.body;
            cityList["#"] = [this.props.location.state.city]
            cityIndex.unshift("#", "hot");
            // console.log(localCity);
            this.setState({
                cityList,
                cityIndex
            });
        } catch (err) {
            console.log(err);
        }
    }

    // 格式化城市列表
    formatCityList = list => {
        let cityList = {};
        list.forEach(item => {
            if (cityList[item.short.substring(0, 1)]) {
                cityList[item.short.substring(0, 1)].push(item);
            } else {
                cityList[item.short.substring(0, 1)] = [item];
            }
        });
        return cityList;
    }

    // 渲染索引字母列表
    renderCityIndex = () => {
        return this.state.cityIndex.map((item, index) => {
            return (
                <li
                    className={index === this.state.activeIndex ? "active" : ""}
                    key={item}
                    onClick={() => this.currentIndex(index)}
                >
                    {item === "hot" ? "热" : item.toUpperCase()}
                </li>
            )
        });
    }

    // 点击字母跳转到对应位置
    currentIndex = (index) => {
        if (index === this.state.activeIndex) return;
        this.listRef.current.scrollToRow(index);

    }

    // 获取滚动时的索引
    onRowsRendered = ({ startIndex }) => {
        if (startIndex === this.state.activeIndex) {
            return;
        }
        this.setState({
            activeIndex: startIndex
        });
    }

    // 改变列表中的城市标题
    changeWord = word => {
        switch (word) {
            case "#": return "当前定位";
            case "hot": return "热门城市";
            default: return word.toUpperCase();
        }
    }

    // 渲染列表
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        let word = this.state.cityIndex[index];
        // console.log(word);
        return (
            <div key={key} style={style}>
                <div className="cityindex">{
                    this.changeWord(word)
                }</div>
                { this.state.cityList[word].map(item => {
                    return <div
                        key={item.value} className="citylist"
                        onClick={() => {
                            return this.props.history.push(
                                {
                                    pathname: "/home/index",
                                    state: {
                                        city: item
                                    }
                                });
                        }}
                    >
                        {item.label}
                    </div>
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="Area">
                <TopNavBar title={"城市选择"} />
                <List
                    ref={this.listRef}
                    width={document.documentElement.clientWidth}
                    height={document.documentElement.clientHeight - 60}
                    // autoHeight
                    rowCount={this.state.cityIndex.length}
                    scrollToAlignment="start"
                    rowHeight={({ index }) => {
                        const word = this.state.cityIndex[index];
                        return ((this.state.cityList[word].length * 35) + 36);
                    }}
                    rowRenderer={this.rowRenderer}
                    style={{ padding: "0 3vw" }}
                    onRowsRendered={this.onRowsRendered}
                />
                <ul className="city_index">
                    {
                        this.renderCityIndex()
                    }
                </ul>
                {/* <div id="allmap"></div> */}
            </div>
        )
    }
}
