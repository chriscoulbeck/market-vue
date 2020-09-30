import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Register.vue")
  },
  {
    path: "/product-detail",
    name: "ProductDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/product-detail/ProductDetail.vue")
  },
  {
    name:"Product",
    path:"/product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/post-product/PostProduct.vue")
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Login.vue")
  },
  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Account.vue")
  },
  {
    path: "/account/edit",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/edit-product/EditProduct.vue")
  },
  {
    path: "/post",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/post-product/PostProduct.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
