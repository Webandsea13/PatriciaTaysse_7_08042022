<template>
	<div class="background">
		<HomeHeader></HomeHeader>
		<div class="home-section">
			<h2>Mon profil</h2>
			<div class="container">
				<p>{{ profil }}</p>
				<img
					v-if="profil.imageProfil"
					v-bind:src="profil.imageProfil"
					alt=""
					width="100"
					height="100"
				/>
			</div>
			<!--
			<h2>Mes publications</h2>
			<div class="container">
				<div
					v-for="item in publications"
					v-bind:key="item.id"
					class="publication"
				>
					<p>Publié par {{ item.name }}</p>
					<p>le {{ new Date(item.time).toLocaleString() }}</p>
					<h3>{{ item.text }}</h3>
					<img v-if="item.image" v-bind:src="item.image" alt="" />
				</div>
			</div>
			-->
		</div>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
export default {
	Name: "ProfilPage",
	components: { HomeHeader },
	data() {
		return {
			profil: {},
			//publications: [],
			profil_id: "",
		};
	},
	//afficher les profils au chargement de la page
	async created() {
		await this.getProfil();
		//await this.getProfilPublications();
	},
	methods: {
		async getProfil() {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				this.profil_id = user.profilID;
				const res = await fetch(
					"http://localhost:3000/api/profil/" + this.profil_id
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfil");
				console.log(jsonRes);
				this.profil = jsonRes.results;
			} catch (error) {
				console.log(error);
			}
		},
		/*
		async getProfilPublications() {
			try {
				const res = await fetch(
					"http://localhost:3000/api/publication/id"
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfilPublication");
				console.log(jsonRes);
				this.publications = jsonRes.results;
			} catch (error) {
				console.log(error);
			}
		},*/
	},
};
</script>

<style></style>

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

.publication {
	padding: 20px 10px;
	border-bottom: 8px solid rgb(255, 215, 215);
}
h3 {
	margin: 10px 0px;
}
.publication img {
	width: 400px;
	height: 250px;
	object-fit: cover;
}
</style>
