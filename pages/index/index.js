import request from '../../utils/request';

Page({
    data: {
        themeColor: getApp().data.themeColor,
        swiperList: [],
        cateList: [],
        floorList: []
    },
    onLoad() {
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },
    // 获取轮播图数据
    getSwiperList() {
        request('/home/swiperdata').then(res => {
            this.setData({
                swiperList: res
            });
        });
    },
    // 获取分类数据
    getCateList() {
        request('/home/catitems').then(res => {
            this.setData({
                cateList: res
            });
        });
    },
    // 获取底部分类数据
    getFloorList() {
        request('/home/floordata').then(res => {
            this.setData({
                floorList: res
            });
        });
    }
});