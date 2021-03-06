// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
/*import VCharts from 'v-charts';*/
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)


Vue.use(ElementUI);
/*Vue.use(VCharts);*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    /* render: h => h(App),*/
    template: '<App/>'
})
