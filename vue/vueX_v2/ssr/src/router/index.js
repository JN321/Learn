import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// export default new Router({
//     routers: [
//         {
//             path: '/',
//             name: 'HelloWorld',
//             component: HelloWorld
//         }
//     ]
// })
export default function createRouter() {
    return new Router({
        routes: [
            {
                path: '/',
                name: 'HelloWorld',
                component: HelloWorld
            }
        ]
    })
}
