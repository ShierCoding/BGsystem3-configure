import * as VueRouter from "vue-router";
import HomeView from "./view/HomeView.vue";
import ConfigView from "./view/ConfigView.vue";
import AboutMe from "./view/AboutMe.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/about", component: AboutMe },
    { path: "/config/:path", component: ConfigView },
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});