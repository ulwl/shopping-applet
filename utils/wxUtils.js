export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 5000,
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject(err);
            }
        });
    });
}