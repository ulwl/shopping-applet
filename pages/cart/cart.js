// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 地址
        address: {},
        // 用户信息
        userInfo: {},
        // 购物车
        cart: [],
        // 总价格
        totalPrice: 0,
        // 商品数
        totalNum: 0,
        // 是否全选
        allChecked: false,
        // 默认图片地址
        defaultImg: getApp().defaultImg
    },
    // 地址信息
    handleChooseAddress() {
        wx.navigateTo({
            url: '/pages/login/login',
        });
        // 需要申请接口
        // wx.getSetting({
        //     success: (result) => {
        //         const scopeAddress = result.authSetting['scope.address'];
        //         if (scopeAddress === true || scopeAddress === undefined) {
        //             wx.chooseAddress({
        //                 success: (result1) => {
        //                     console.log(result1);
        //                     wx.setStorageSync("address", result1);
        //                     console.log(wx.getStorageSync('address'));
        //                 },

        //             });
        //         } else {
        //             wx.openSetting({
        //                 success: (result2) => {
        //                     wx.chooseAddress({
        //                         success: (result3) => {
        //                             console.log(result3);
        //                             wx.setStorageSync("address", result3);
        //                         },
        //                     });
        //                 },
        //             });
        //         }
        //     }
        // });
    },
    // 控制每项商品是否勾选
    handleItemChange(e) {
        // 获取商品id
        const goods_id = e.currentTarget.dataset.id;
        let {
            cart
        } = this.data;
        // 查找购物车中的索引值
        let index = cart.findIndex(v => v.goods_id === goods_id);
        // 根据索引值取反checked
        cart[index].checked = !cart[index].checked;
        this.setCart(cart);
    },
    // 底部数据计算
    setCart(cart) {
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart = cart ? cart : [];
        // 遍历购物车，如果选中则累加金额
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;
            } else {
                allChecked = false;
            }
        });
        allChecked = cart.length != 0 ? allChecked : false;
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        });
        wx.setStorageSync("cart", cart);
    },
    // 商品数量加与减
    handleItemNumEdit(e) {
        const {
            operation,
            id
        } = e.currentTarget.dataset;
        let {
            cart
        } = this.data;
        const index = cart.findIndex(v => v.goods_id === id);
        // 如果商品数量为1，并且还要减，则删除商品，否则商品数量加1
        if (cart[index].num === 1 && operation == -1) {
            wx.showModal({
                title: '提示',
                content: '您是否要删除?',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '删除',
                confirmColor: '#3CC51F',
                success: (result) => {
                    // 点击确认就删除商品
                    if (result.confirm) {
                        cart.splice(index, 1);
                        this.setCart(cart)
                    } else if (result.cancel) {

                    }
                },
                fail: (error) => {
                    reject(error)
                }
            });
        } else {
            cart[index].num = cart[index].num + parseInt(operation);
            this.setCart(cart);
        }
    },
    // 结算
    handlePay() {
        const {
            address,
            totalNum,
            userInfo
        } = this.data;
        // console.log(userInfo);
        // 如果商品不为空并且没有登录
        if (!(wx.getStorageSync('cart') && userInfo.nickName)) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
            });
            return;
        }
        // 如果商品数量为零，提示信息
        if (totalNum === 0) {
            wx.showToast({
                title: '您还没有选购商品',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false
            });
            return;
        }
        // 跳转到支付页面
        wx.navigateTo({
            url: '/pages/pay/pay'
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        // console.log(cart);
        // this.setData({

        // });
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
        // const cart = wx.getStorage({
        //     key: 'cart'
        // }) || [];
        // 每次展示时获取购物车、用户、地址信息
        const cart = wx.getStorageSync('cart') || [];
        // console.log(cart);
        const userInfo = wx.getStorageSync('userInfo') || {};
        const address = wx.getStorageSync("address") ? wx.getStorageSync("address") : {
            userName: '图图',
            fullAddress: '翻斗大街翻斗花园二号楼1001室',
            phone: '13333333333'
        };
        this.setData({
            userInfo,
            address,
            cart
        });
        wx.setStorage({
            key: 'address',
            data: address
        });
        this.setCart(cart);

        // console.log(wx.getStorageSync('address'));
    },
    // 全选按钮
    handleItemAllCheck(e) {
        const {
            cart
        } = this.data;
        // console.log();
        let isCheckedAll = e.detail.value.includes('true') ? true : false
        cart.forEach(v => v.checked = isCheckedAll);
        this.setCart(cart);
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