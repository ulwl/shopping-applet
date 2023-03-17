// pages/category/category.js
import request from '../../utils/request';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeColor: getApp().data.themeColor,
        totalData: [],
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0
    },
    // 获取左侧分类内容
    async getLeftMenuList() {
        const res = await request(
            '/categories',
        );
        this.data.totalData = res;
        // 存储获取的分类，方便复用，时间参数可以控制内容的有效期
        wx.setStorageSync('cates', {
                time: Date.now(),
                data: res
            }),
            // console.log(res.map(v => v.cat_name));
            // console.log(res[0].children);
            this.setData({
                // 内容过滤
                leftMenuList: res.map(v => v.cat_name),
                rightContent: res[0].children
            });
        // console.log(this.leftMenuList);
    },
    // 点击左侧分类会更新右侧内容
    handleItemTap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        // console.log(this.data.totalData);
        const rightContent = this.data.totalData[index].children;
        // console.log(rightContent);
        this.setData({
            currentIndex: e.currentTarget.dataset['index'],
            rightContent,
            scrollTop: 0
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.getLeftMenuList();
        const Cates = wx.getStorageSync('cates');
        // console.log(Date.now() - Cates.time);
        // 如果分类内容不存在或者过期，则发送请求获取分类
        if (!Cates) {
            this.getLeftMenuList();
        } else {
            if (Date.now() - Cates.time > 1000 * 60 * 10) {
                this.getLeftMenuList();
            } else {
                // console.log(this.data);
                this.setData({
                    totalData: Cates.data,
                    leftMenuList: Cates.data.map(v => v.cat_name),
                    rightContent: Cates.data[0].children
                });
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})