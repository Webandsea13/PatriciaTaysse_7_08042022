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
				<a v-on:click="deconnect()" href="">Se déconnecter</a>
			</router-link>
			<a href=""><font-awesome-icon icon="far fa-window-close" /></a>
			<a href=""><i class="far fa-window-close"></i></a>
			<i class="far fa-window-close"></i>
			<i class="fas fa-user-circle"></i>
			<font-awesome-icon icon="fas fa-user-circle" />
			<i class="fa-solid fa-user"></i>
			<font-awesome-icon icon="fa-solid fa-user" />
			<font-awesome-icon icon="fa-solid fa-user" />
			<font-awesome-icon icon="fas fa-user" />
			<i class="fas fa-robot"></i>
		</nav>
	</div>
</template>

<script>
export default {
	name: "HomeHeader",
	data() {},
	methods: {
		deconnect() {
			this.$router.push("/login");
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
}

#home-logo {
	height: 80px;
	width: 400px;
	object-fit: cover;
}
</style>
