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
 * @description 获取热门城市
 */
export const getHotCity = () => {
    return request({
        url: "/area/hot",
        method: "GET"
    });
}