// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: getApp().data.themeColor,
    userInfo: {},
    collectNums: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setData({
    //   userInfo: wx.getStorageSync('userInfo'),
    //   // collectNums: wx.getStorageSync('collect').length
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
      // 每次出现时，都会获取收藏和用户的信息
    const collectNums = wx.getStorageSync('collect').length;
    this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        collectNums
      });
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