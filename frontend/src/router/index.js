import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login";
import Signup from "../views/Signup";

import Publications from "../views/Publications";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/signup",
		name: "Signup",
		component: Signup,
	},

	{
		path: "/home",
		name: "Publications",
		component: Publications,
	},
];

const router = createRouter({
	routes,
});

export default router;
