import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AnalysisListPage from '@/pages/AnalysisListPage.vue'
import BlacklistPage from '@/pages/BlacklistPage.vue'

const routes = [
    { path: '/', redirect: '/page/home' },
    {
        path: '/page/home',
        name: 'Home',
        meta:{keepAlive: true},
        component: HomePage
    },
    {
        path: '/page/analysis_list',
        name: 'analysis_list',
        component: AnalysisListPage
    },
    {
        path: '/page/blacklist',
        name: 'blacklist',
        component: BlacklistPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
