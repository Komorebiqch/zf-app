import React, { Component } from 'react';
import Filter from "../../components/Filter";
import { List, InfiniteLoader } from 'react-virtualized';
import { Toast } from "antd-mobile";
import store from "../../store/index";
import { getHouses } from "../../api/api";
import LazyLoad from "react-lazyload";
import { Spring } from "react-spring/renderprops";
import "./index.scss";

let pickerData = {};

export default class HouseList extends Component {

    state = {
        list: [],
        count: 0,
        inquire: { ...store.getState() }
    }

    componentDidMount() {
        this.getHousesList();
        store.subscribe(this.changeStore);
    }

    changeStore = () => {
        this.setState({
            inquire: {
                ...store.getState()
            }
        }, () => {
            this.getHousesList();
        });
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        style, // Style object to be applied to row (to position it)
    }) => {
        const { list } = this.state;
        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ duration: 1000 }}
                key={key}
            >
                {props =>
                    <div key={key} style={style} className="list_item">
                        <div className="left">
                            <LazyLoad height={100} once scroll={true} scrollContainer="#list_virtual">
                                <img style={props} src={`http://api-haoke-web.itheima.net${list[index].houseImg}`} width="120" height="100" alt="" />
                            </LazyLoad>
                        </div>
                        <div className="right">
                            <div className="title" style={props}>{list[index].title}</div>
                            <div className="desc" style={props}>{list[index].desc}</div>
                            <div className="tags" style={props}>
                                {list[index].tags.map(item => <span style={props} key={item} >{item}</span>)}
                            </div>
                            <div className="price" style={props}>{list[index].price}/每月</div>
                        </div>
                    </div>}
            </Spring>
        );
    }

    // 当没有数据时渲染的列表
    noRowsRenderer = () => {
        return <div>暂无数据</div>
    }

    // 获取房屋列表
    getHousesList = async () => {
        const state = this.state.inquire;
        const area = state.area[2] !== "null" ? state.area[2] : state.area[1];
        pickerData = {
            cityId: JSON.parse(localStorage.getItem("current_city")).value,
            area,
            rentType: state.rentType.toString(),
            price: state.price.toString(),
        }
        Toast.loading('Loading...');
        const res = await getHouses({
            ...pickerData,
            start: 1,
            end: 20
        });
        Toast.hide();
        Toast.info(`共${res.body.count}条数据`, 1);
        this.setState({
            list: res.body.list,
            count: res.body.count
        });
    }

    isRowLoaded = ({ index }) => {
        return !!this.state.list[index];
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        return new Promise(async (resolve, reject) => {
            if (stopIndex > this.state.list.length) {
                const res = await getHouses({
                    ...pickerData,
                    start: startIndex + 1,
                    end: stopIndex + 1
                });
                this.setState({
                    list: [...this.state.list, ...res.body.list]
                });
            }
            resolve();
        });
    }

    render() {
        return (
            <div className="HouseList">
                <Filter />
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={this.state.count}
                    minimumBatchSize={30}
                    threshold={50}
                >
                    {
                        ({ onRowsRendered, registerChild }) => (
                            <List
                                id="list_virtual"
                                scrollToIndex={0}
                                width={document.documentElement.clientWidth}
                                height={document.documentElement.clientHeight - 90}
                                rowCount={this.state.count}
                                ref={registerChild}
                                onRowsRendered={onRowsRendered}
                                rowHeight={130}
                                rowRenderer={this.rowRenderer}
                                noRowsRenderer={this.noRowsRenderer}
                                style={{ backgroundColor: "#ffffff", padding: "3vw 5vw" }}
                            />)
                    }

                </InfiniteLoader>
            </div>
        )
    }
}
