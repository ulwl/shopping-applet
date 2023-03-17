// pages/order/order.js
import request from '../../utils/request';
// import request from '../../utils/reqLogin';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            },
            {
                id: 2,
                value: "待发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ],
        defaultImg: getApp().defaultImg,
        // mockOrders: [{
        //     order_number: '0000000000001',
        //     order_price: 999,
        //     create_time_cn: '2000-01-01'
        // },  {
        //     order_number: '0000000000002',
        //     order_price: 999,
        //     create_time_cn: '2000-01-01'
        // }, {
        //     order_number: '0000000000003',
        //     order_price: 999,
        //     create_time_cn: '2000-01-01'
        // }, {
        //     order_number: '0000000000004',
        //     order_price: 999,
        //     create_time_cn: '2000-01-01'
        // }, {
        //     order_number: '0000000000005',
        //     order_price: 999,
        //     create_time_cn: '2000-01-01'
        // }]
    },
    handleItemTap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const {
            tabs
        } = this.data;
        tabs.forEach(item => item.id === index ? item.isActive = true : item.isActive = false);
        this.setData({
            tabs
        });
    },
    // async getOrders(type) {
    //     const res = await request('/my/orders/all', {
    //         type
    //     });
    //     // console.log(type, res);
    // },
    getOrders() {
        const orders = wx.getStorageSync('orderInfo');
        // console.log(orders);
        this.setData({orders});
    },
    changeTitleByIndex(index) {
        let {
            tabs
        } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/login/login'
            });
            return;
        }
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        // console.log(currentPage.options);
        const {
            type = 1
        } = currentPage.options;
        // console.log(type);
        this.changeTitleByIndex(type - 1);
        this.getOrders();
        // wx.login({
        //     success: (res) => {
        //         console.log(res);
        //     },
        // })
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