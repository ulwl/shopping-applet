// 同时请求的数量
let ajaxTimeCount = 0;

// 封装请求的方法
export default (location, data, method='GET') => {
    ajaxTimeCount++;
    wx.showLoading({
        title: '加载中',
    });
    
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    // const baseUrl = "https://api-ugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + location,
            method,
            data,
            success: (res) => {
                resolve(res.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimeCount--;
                if(ajaxTimeCount === 0) {
                    wx.hideLoading();
                }
            }
        })
    });
}