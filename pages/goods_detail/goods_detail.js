// pages/goods_detail/goods_detail.js
import request from '../../utils/request';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodInfo: {},
        // goodObj: {},
        isCollect: false
    },
    // 获取商品详细信息
    async getGoodDetail(good_id) {
        const res = await request(`/goods/detail?goods_id=${good_id}`);
        this.setData({
            goodInfo: res,
        });
    },
    // 轮播图的预览
    handlePrevewImage(e) {
        const urls = this.data.goodInfo.pics.map(v => v.pics_mid);
        // console.log(urls);
        // previewImage接收两个参数：当前商品的url与全部预览图的url
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: urls,
        });
    },
    // 添加购物车
    handleAddCart() {
        const cart = wx.getStorageSync('cart') || [];
        // console.log(this.data.goodInfo);
        // console.log(cart);
        // 如果购物车中存在当前商品，则直接加数量，否则添加num与checked信息并push到购物车的数组中。
        let index = cart.findIndex(v => v.goods_id == this.data.goodInfo.goods_id);
        // console.log(index);
        if (index === -1) {
            this.setData({
                'goodInfo.num': 1,
                'goodInfo.checked': true,
            });
            cart.push(this.data.goodInfo);
        } else {
            // console.log(cart[index]);
            cart[index].num++;
        }
        // 异步存储购物车信息
        wx.setStorage({
            key: "cart",
            data: cart
        });
        // console.log(wx.getStorage({
        //     key: 'cart',
        //     success (res) {
        //       console.log(res.data)
        //     }
        //   }));
        // wx.setStorageSync("cart", cart);
        // console.log(this.data.goodInfo);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1500,
            mask: true,
        });
        // wx.clearStorageSync();
    },
    // 点击立即购买会把商品添加到购物车并跳转到购物车
    handleBuy() {
        this.handleAddCart();
        wx.switchTab({
          url: '/pages/cart/cart',
        })
    },
    // 处理收藏
    handleCollect() {
        let isCollect = false;
        const collect = wx.getStorageSync("collect") || [];
        // 遍历查询是否已经加入到了收藏
        let index = collect.findIndex(v => v.goods_id == this.data.goodInfo.goods_id);
        // 已经加入了就删除，没加入就加入
        if (index !== -1) {
            collect.splice(index, 1);
            isCollect = false;
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
            });
        } else {
            collect.push(this.data.goodInfo);
            // console.log(this.data.goodInfo);
            isCollect = true;
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true
            });
        }
        // 存储收藏
        wx.setStorageSync("collect", collect);
        this.setData({
            isCollect
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // 挂载完毕后获取商品详细信息
    onLoad(options) {
        const {
            goods_id
        } = options;
        // console.log(goods_id);
        this.getGoodDetail(goods_id);
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