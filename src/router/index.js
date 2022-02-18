import * as PAGES from './router-components';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: PAGES.StartTest,
        name: 'start-test'
    }, {
        path: '/passing-test',
        component: PAGES.PassingTest,
        name: 'passing-test'
    }, {
        path: '/result-test',
        component: PAGES.ResultTest,
        name: 'result-test'
    }, {
        path: '/expired-test',
        component: PAGES.ExpiredTest,
        name: 'expired-test'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
});

export default router;