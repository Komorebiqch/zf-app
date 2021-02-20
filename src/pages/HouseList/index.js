import React, { Component } from 'react';
import Filter from "../../components/Filter";
import { List } from 'react-virtualized';
import { getHouses } from "../../api/api";
import "./index.scss";

export default class HouseList extends Component {

    state = {
        list: []
    }

    componentDidMount() {
        this.getHousesList();
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const { list } = this.state;
        return (
            <div key={key} style={style} className="list_item">
                <div className="left">
                    <img src={`http://api-haoke-web.itheima.net${list[index].houseImg}`} width="100" height="80" alt="" />
                </div>
                <div className="right">
                    <div className="title">{list[index].title}</div>
                    <div className="desc">{list[index].desc}</div>
                    <div className="tags">
                        {list[index].tags.map(item => <span key={item}>{item}</span>)}
                    </div>
                    <div className="price">{list[index].price}/每月</div>
                </div>
            </div>
        );
    }

    // 获取房屋列表
    getHousesList = async () => {
        const res = await getHouses({
            cityId: JSON.parse(localStorage.getItem("current_city")).value
        });
        this.setState({
            list: res.body.list
        });
    }

    render() {
        return (
            <div className="HouseList">
                <Filter />
                <List
                    width={document.documentElement.clientWidth}
                    height={document.documentElement.clientHeight - 90}
                    rowCount={this.state.list.length}
                    rowHeight={110}
                    rowRenderer={this.rowRenderer}
                    style={{ backgroundColor: "#ffffff", padding: "3vw 5vw" }}
                />

            </div>
        )
    }
}
