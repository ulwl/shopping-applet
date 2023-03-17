// pages/goods_list/goods_list.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        themeColor: getApp().data.themeColor,
        // Tab栏内容
        tabs: [{
            id: 0,
            value: '综合',
            isActive: true
        }, {
            id: 1,
            value: '销量',
            isActive: false
        }, {
            id: 2,
            value: '价格',
            isActive: false
        }],
        // 展示的商品列表
        goodsList: [],
        // 发送请求时携带的参数
        Params: {
            query: '',
            cid: '',
            pagenum: 1,
            pagesize: 10
        },
        // 总页数
        totalPages: 1
    },
    tabsItemChange(e) {
        const {
            index
        } = e.detail;
        const {
            tabs
        } = this.data;
        tabs.forEach(item => item.isActive = item.id === index ? true : false);
        this.setData({
            tabs
        });
    },
    // 获取商品列表
    async getGoodsList() {
        const res = await request('/goods/search', this.data.Params);
        const total = res.total;
        this.setData({
            // 页数要向上取整 20/3 = 7
            totalPages: Math.ceil(total / this.data.Params.pagesize),
            // 合并商品列表
            goodsList: [...this.data.goodsList, ...res.goods]
        });
        // 停止下滑
        wx.stopPullDownRefresh();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 每次挂载完毕后，使用上一页传过来的id发送请求
        this.setData({
            'Params.cid': options.cid
        });
        this.getGoodsList();
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
        // 清空商品列表，商品页数，总商品页数，发送请求
        this.setData({
            goodsList: [],
            'Params.pagenum': 1,
            totalPages: 1
        });
        this.getGoodsList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        // 如果商品页数大于总商品页数，提示信息
        if (this.data.Params.pagenum >= this.data.totalPages) {
            wx.showToast({
                title: '已经到底了',
            })
        } else {
            // console.log(this.data.Params.pagenum);
            // this.setData({
            //     'Params.pagenum': this.data.Params.pagenum++
            // });
            // 商品页数+1，再次获取商品列表
            this.data.Params.pagenum++;
            this.getGoodsList();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})