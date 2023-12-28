import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
// import Category from "@/views/Category.vue";
// import NotFound from "@/views/NotFound.vue";
// import Search from "@/views/Search.vue";
// import Watch from "@/views/Watch.vue";
// import Channel from "@/views/Channel.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:category",
    name: "Category",
    component: () => import("@/views/Category.vue"),
    props: true,
  },

  {
    path: "/search/:searchTerms",
    name: "Search",
    component: () => import("@/views/Search.vue"),
    props: true,
  },
  {
    path: "/watch/:videoId",
    name: "Watch",
    component: () => import("@/views/Watch.vue"),
    props: true,
  },
  {
    path: "/channel/:channelId",
    name: "Channel",
    component: () => import("@/views/Channel.vue"),
    props: true,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link",
});

export default router;
