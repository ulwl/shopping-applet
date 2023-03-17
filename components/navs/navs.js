// components/navs/navs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navs: {
            type: Array,
            value: []
        }
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
        handleItemTap(e) {
            const {
                index
            } = e.currentTarget.dataset;
            const {
                navs
            } = this.data;
            navs.forEach(item => item.id === index ? item.isActive = true : item.isActive = false);
            this.setData({
                navs
            });
        }
    }
})