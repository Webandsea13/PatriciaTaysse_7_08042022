import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "../AppLayout";

import Login from "../views/LoginPage";
import Signup from "../views/SignupPage";
import Publications from "../views/PublicationsPage";
import Profil from "../views/ProfilPage";
import Users from "../views/UsersPage";

/**

Méthode 1 :
 /publications => liste des publications
	<menu />
	<afficher la liste des publications />
	<footer />
	
 /profil => modification / view du profil
	<menu />
	<afficher un formulaire de modification du profil />
	<footer />


Méthode 2 :
 /app => layout lorsqu'on est connecté
	<menu />
		/publications => liste des publications
			<afficher la liste des publications />
		/profil => modification / view du profil
			<afficher un formulaire de modification du profil />
	<footer />


 */

const routes = [
	{
		path: "/",
		component: AppLayout,
		children: [
			{
				path: "/",
				name: "Home",
				redirect: "/login",
			},
			{
				path: "/login",
				name: "LoginPage",
				component: Login,
			},
			{
				path: "/signup",
				name: "SignupPage",
				component: Signup,
			},
			{
				path: "/publications",
				name: "PublicationsPage",
				component: Publications,
			},
			{
				path: "/profil/:id",
				name: "ProfilPage",
				component: Profil,
			},
			{
				path: "/users",
				name: "UsersPage",
				component: Users,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
