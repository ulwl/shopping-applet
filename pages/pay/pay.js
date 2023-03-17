// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0,
        checkOrder: []
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
        const address = wx.getStorageSync('address') || {};
        const cart = wx.getStorageSync('cart') || [];
        // console.log(address, cart);
        let checkOrder = cart.filter(v => v.checked);
        // console.log(checkOrder);
        let totalPrice = 0;
        let totalNum = 0;
        checkOrder.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        });
        // console.log('000');
        // console.log('111', address);
        this.setData({
            address,
            cart,
            totalPrice,
            totalNum,
            checkOrder
        });
    },
    handlePay() {
        const token = wx.getStorageSync('token');
        const userInfo = wx.getStorageSync('userInfo');
        const orderInfo = wx.getStorageSync('orderInfo')
        const {
            checkOrder: payOrder
        } = this.data;
        // console.log(checkOrder);
        // const date = Date().split(' ');
        const date = new Date();
        const fullDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        // console.log(fullDate);
        if (token && userInfo.nickName) {
            payOrder.forEach(item => {
                item['order_number'] = Date.now();
                item['order_price'] = item.goods_price;
                item['create_time_cn'] = fullDate;
            });
            wx.setStorage({
                key: 'orderInfo',
                data: [...payOrder, ...orderInfo]
            });
            wx.showLoading({
                title: '支付中...',
            });

            setTimeout(() => {
                wx.hideLoading();
                wx.showToast({
                    title: '支付成功',
                    duration: 1000,
                    success: () => {
                        wx.navigateTo({
                            url: '/pages/paysuccess/paysuccess',
                        });
                    }
                });
            }, 1000);

        } else {

        }
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