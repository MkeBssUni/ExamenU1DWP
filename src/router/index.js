import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

const routes=[
    {
        path:"/",
        redirect:'/autos'
    },{
        path:'/',
        component:{
            render(c){
                return c('router-view')
            }
        },children:[{
            path:'/autos',
            name:'autos',
            component:()=>import('../components/LandigPage.vue')
        },{
            path:'/all',
            name:'all',
            component:()=>import('../components/TablePagination.vue')
        },{
            path:'/newCar',
            name:'newCar',
            component:()=>import('../components/FormCar.vue')
        }]
    }]

const router = new VueRouter({ routes, })
export default router;