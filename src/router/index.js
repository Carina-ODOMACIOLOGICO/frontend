import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/upload_file/:type/:id_document",
    name: "UploadFile",
    props: true,
    component: () => import("../views/UploadFile.vue"),
  },
  {
    path: "/upload_file/:type/:id_document",
    name: "UploadCSV",
    props: true,
    component: () => import("../views/UploadFile.vue"),
  },
  {
    path: "/documents",
    name: "Documents",
    component: () => import("../views/Documents.vue"),
  },
  {
    path: "/config/:id_document/:schema",
    name: "Config",
    props: true,
    component: () => import("../views/Config.vue"),
  },
  {
    path: "/filldata/:id_document/:id_link",
    name: "Filldata",
    props: true,
    component: () => import("../views/Filldata.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/train/:id_document/:schema",
    name: "Train",
    props: true,
    component: () => import("../views/Train.vue"),
  },
  {
    path: "/dataset/:id_document/:schema",
    name: "Dataset",
    props: true,
    component: () => import("../views/Dataset.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
