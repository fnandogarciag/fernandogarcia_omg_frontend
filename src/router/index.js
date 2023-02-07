import { createRouter, createWebHistory } from "vue-router";
import { guestMiddleware, authMiddleware } from "./middleware";

import NoContentView from "@/views/NoContentView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductView from "@/views/ProductView.vue";

const routes = [
  {
    path: "/",
    redirect: () => {
      return { name: "login" };
    },
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: guestMiddleware,
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    beforeEnter: guestMiddleware,
    component: RegisterView,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "/forgot-password",
    beforeEnter: guestMiddleware,
    component: NoContentView,
    meta: {
      title: "Forget Password",
    },
  },
  {
    path: "/products",
    name: "products",
    beforeEnter: authMiddleware,
    component: ProductsView,
    meta: {
      title: "Products",
    },
  },
  {
    path: "/products/create",
    name: "products.create",
    beforeEnter: authMiddleware,
    component: ProductView,
    meta: {
      title: "Product Create",
    },
  },
  {
    path: "/products/:id",
    name: "products.index",
    beforeEnter: authMiddleware,
    component: ProductView,
    meta: {
      title: "Product Edit",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
