import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

export const ROUTES = {
    MAIN: Symbol.for('main'),

    PARSE: Symbol.for('parse'),
    CRB: Symbol.for('crb'),
    CONSULTANT: Symbol.for('consultant'),
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: ROUTES.MAIN,
        component: () => import('@/views/Main.vue')
    },
    {
        path: '/parse',
        name: ROUTES.PARSE,
        children: [
            {
                path: '/cbr',
                name: ROUTES.CRB,
                component: () => import('@/views/ParseCenterBank.vue')
            },
            {
                path: '/consultant',
                name: ROUTES.CONSULTANT,
                component: () => import('@/views/ParseConsultant.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
