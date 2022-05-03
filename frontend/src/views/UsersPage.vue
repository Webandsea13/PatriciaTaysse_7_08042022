<template>
	<div class="background">
		<HomeHeader></HomeHeader>
		<div class="home-section">
			<h2>Tous les utilisateurs</h2>
			<div class="container">
				<div v-for="item in users" v-bind:key="item.id" class="user">
					<router-link to="/profil/?id=item.id"
						><p>{{ item.name }}</p></router-link
					>
					<p>
						Inscrit depuis le
						{{ new Date(item.time).toLocaleString() }}
					</p>

					<img
						v-if="item.imageProfil"
						v-bind:src="item.imageProfil"
						alt=""
						width="100"
						height="100"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";

export default {
	name: "UsersPage",
	components: { HomeHeader },
	data() {
		return {
			users: [],
		};
	},

	//afficher les profils au chargement de la page
	async created() {
		await this.viewUsers();
	},
	methods: {
		async viewUsers() {
			try {
				const res = await fetch("http://localhost:3000/api/profil");
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH");
				console.log(jsonRes);
				this.users = jsonRes.results;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
.home-section {
	width: 700px;
	position: relative;
	top: 120px;
}
.container {
	box-shadow: 3px 3px 10px grey;
	border-radius: 10px;
	background-color: white;
	padding: 20px;
	margin: 20px;
}
.user {
	padding: 20px 0px;
	border-bottom: 2px solid rgb(255, 215, 215);
}
</style>
