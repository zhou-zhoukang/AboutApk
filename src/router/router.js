import { createRouter, createWebHistory } from 'vue-router'
import BlackListPage from '@/pages/BlackListPage.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
    { path: '/', redirect: '/page/home' },
    {
        path: '/page/home',
        name: 'Home',
        meta:{keepAlive: true},
        component: HomePage
    },
    {
        path: '/page/blacklist',
        name: 'BlackList',
        component: BlackListPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
