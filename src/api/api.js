import request from "../utils/request";

/**
 * @description 获取轮播图列表
 */
export const getCarousel = () => {
    return request({
        url: "/home/swiper",
        method: "GET"
    });
}
/**
 * @description 获取城市列表
 */
export const getCity = (level = 1) => {
    return request({
        url: "/area/city",
        method: "GET",
        params: {
            level
        }
    });
}
/**
 * @description 获取租房小组
 */
export const getHouseGroup = params => {
    return request({
        url: "/home/groups",
        method: "GET",
        params
    });
}
/**
 * @description 获取租房资讯
 */
export const getHouseNews = params => {
    return request({
        url: "/home/news",
        method: "GET",
        params
    });
}
/**
 * @description 获取热门城市
 */
export const getHotCity = () => {
    return request({
        url: "/area/hot",
        method: "GET"
    });
}
/**
 * @description 根据城市名获取城市信息
 * @param {String} name="上海" 
 */
export const getCurrentCity = params => {
    return request({
        url: "/area/info",
        method: "GET",
        params
    });
}
/**
 * 
 * @description 根据城市获取房源
 */
export const getHouseInfo = params => {
    return request({
        url: "/area/map",
        method: "GET",
        params
    });
}
/**
 * @description 获取子级城市列表
 */
export const getSubCity = params => {
    return request({
        url: "/area",
        method: "GET",
        params
    });
}
/**
 * @description 获取房屋的具体信息
 */
export const getHouseDetail = id => {
    return request({
        url: `/houses/${id}`,
        method: "GET"
    });
}
/**
 * @description 根据条件查询房屋
 */
export const getHousesFilter = params => {
    return request({
        url: "/houses",
        method: "GET",
        params
    });
}