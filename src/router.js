import { createRouter, createWebHistory } from "vue-router";
import Game from "./pages/Game.vue";
import Start from "./pages/Start.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: Start,
  },
  {
    path: "/game/:id/:name",
    name: "Game",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
