<template>
	<div class="home-header">
		<div class="home-header-logo">
			<img
				id="home-logo"
				src="../assets/icon-left-font-monochrome-black.png"
				alt="logo groupomania"
			/>
		</div>
		<nav>
			<router-link to="/login">
				<a v-on:click="deconnect()">Se déconnecter</a>
			</router-link>
			<router-link to="/publications">
				<a v-on:click="goHome()">Home</a>
			</router-link>
			<router-link to="/profil">
				<a v-on:click="myProfil()">Voir mon profil</a>
			</router-link>
			<router-link to="/users">
				<a v-on:click="viewUsers()">Voir les autres utilisateurs</a>
			</router-link>
		</nav>
	</div>
</template>

<script>
export default {
	name: "HomeHeader",
	data() {
		return {};
	},
	methods: {
		deconnect() {
			this.$router.push("/login");
		},
		myProfil() {},
		goHome() {
			this.$router.push("/publications");
		},
	},
};
</script>

<style>
.home-header {
	background-color: white;
	height: 80px;
	width: 100vw;
	display: flex;
	position: fixed;
	z-index: 5;
}

#home-logo {
	height: 80px;
	width: 400px;
	object-fit: cover;
}
</style>
