// components/searchPage/seachPage.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        toSearchPage(e) {
            let pages = getCurrentPages();
            let currentPage = pages[pages.length - 1];
            if (currentPage.route !== 'pages/search/search') {
                wx.navigateTo({
                    url: '/pages/search/search',
                    // success: () => {
                    //     console.log('成功');
                    // }
                });
            }
        },
    }
})