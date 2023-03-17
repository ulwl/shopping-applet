// pages/login/login.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import {
    login
} from '../../utils/wxUtils';
import request from '../../utils/reqLogin';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: true,
    },
    onChange(e) {
        this.setData({
            checked: e.detail
        })
    },
    async handleGetUserInfo(e) {
        // 用户的信息
        const {
            userInfo
        } = e.detail;
        // 用户向服务器端登录时需要携带的参数
        const {
            encryptedData,
            rawData,
            iv,
            signature
        } = e.detail;
        const {
            code
        } = await login();
        const loginParams = {
            encryptedData,
            rawData,
            iv,
            signature,
            code
        };
        // console.log(loginParams);
        // console.log(JSON.stringify(loginParams));
        const res = await request(
            '/users/wxlogin/',
            loginParams,
            'POST'
        );
        // 服务器端会返回一个token（项目接口不可用，所以用的假token）
        const token = res ? res.token : '"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"';
        // console.log(token);
        // 有用户信息和token才算登录成功
        if (userInfo && token) {
            Notify({
                type: 'success',
                message: '登录成功'
            });
            wx.setStorageSync('userInfo', userInfo);
            wx.setStorageSync("token", token);
            wx.navigateBack(1);
            // wx.reLaunch({
            //   url: '/pages/user/user',
            // })
        } else {
            Notify({
                type: 'warning',
                message: '登录失败'
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.hideHomeButton();
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