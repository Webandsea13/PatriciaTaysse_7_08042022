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
			<div v-if="currentUser"></div>
			<a v-on:click="deconnect()">
				<i class="fas fa-door-open"></i>Se déconnecter
			</a>
			<router-link to="/publications">
				<i class="fas fa-home"></i>
				Accueil
			</router-link>
			<router-link v-if="this.profil_id" :to="'/profil/' + profil_id">
				<i class="fas fa-user"></i>
				Voir mon profil
			</router-link>
			<router-link to="/users">
				<i class="fas fa-users"></i>
				Voir les autres utilisateurs
			</router-link>
		</nav>
	</div>
</template>

<script>
export default {
	name: "HomeHeader",
	props: ["currentUser"],
	data() {
		return {
			profil_id: "",
		};
	},
	created() {
		//utilisation userCurrent provenant des props
		this.profil_id = this.currentUser.id;
	},
	methods: {
		deconnect() {
			localStorage.removeItem("token");
			this.$router.push("/login");
		},
	},
};
</script>

<style>
.home-header {
	background-color: white;

	width: 100vw;
	display: flex;
	position: fixed;
	z-index: 5;
	padding: 10px 10px;
	justify-content: space-around;
	align-items: center;
}

#home-logo {
	height: 80px;
	width: 400px;
	object-fit: cover;
}
nav {
	display: flex;
	flex-direction: column;
}
@media screen and (max-width: 767px) {
	#home-logo {
		height: 60px;
		width: 300px;
		object-fit: cover;
	}
	.home-header {
		flex-wrap: wrap;
	}
}
</style>
