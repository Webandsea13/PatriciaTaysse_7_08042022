<template>
	<div class="background">
		<HomeHeader></HomeHeader>
		<div class="home-section">
			<h1>Bienvenue</h1>
			<div class="container">
				<form class="new-publication-form">
					<h2>Quoi de neuf ?</h2>
					<textarea
						type="textarea"
						class="new-publication-input"
						placeholder="Ecrivez quelque chose !"
						required
						v-model="publication.text"
						autofocus
					></textarea>
					<div>
						<input
							type="text"
							class="new-publication-url"
							placeholder="Ajouter une image"
							v-model="publication.image"
						/>
						<button
							type="submit"
							class="btn"
							v-on:click="newPublication()"
						>
							<span>Publier</span>
						</button>
					</div>
				</form>
			</div>
			<div class="container">
				<h2>Publications récentes</h2>
			</div>
		</div>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";

export default {
	name: "PublicationsPage",
	data() {
		return {
			publications: [],
			publication: { text: "", image: "", profil_id: "" },
		};
	},
	components: { HomeHeader },
	methods: {
		//afficher toutes les publications à l 'ouverture de la page
		async created() {
			try {
				const res = await fetch(
					"http://localhost:3000/api/publication"
				);
				const jsonRes = await res.json();
				console.log(jsonRes);
				this.publications = jsonRes;
			} catch (error) {
				console.log(error);
			}
		},

		async newPublication() {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				console.log(user);
				this.publication.profil_id = user.profilID;
				const response = await fetch(
					"http://localhost:3000/api/publication",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json",
						},
						body: JSON.stringify(this.publication),
					}
				);
				const jsonResponse = await response.json();
				console.log(jsonResponse);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style scoped>
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
.new-publication-input {
	width: 600px;
	height: 100px;
	font-family: "Oxygen", sans-serif;
	resize: none;
	background-color: #fff9f8;
}
</style>
