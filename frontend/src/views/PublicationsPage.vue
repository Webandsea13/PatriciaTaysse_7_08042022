<template>
	<div class="background">
		<HomeHeader></HomeHeader>
		<div class="home-section">
			<h1>Bienvenue</h1>
			<div class="container">
				<form
					class="new-publication-form"
					v-on:submit.prevent="newPublication"
				>
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
						<label for="url">Ajouter une image:</label>

						<br />
						<input
							id="new-publication-url"
							name="image"
							type="file"
							accept="image/*"
							v-on:change="getURL($event)"
						/>
					</div>
					<button type="submit" class="btn">
						<span>Publier</span>
					</button>
				</form>
			</div>
			<div class="container">
				<h2>Publications récentes</h2>
				<div v-for="item in publications" v-bind:key="item.id">
					<img
						v-if="item.image"
						v-bind:src="item.image"
						alt=""
						width="400"
						height="200"
					/>
					<p>{{ new Date(item.time).toLocaleString() }}</p>
					<p>publié par {{ item.profil_id }}</p>
					<p>{{ item.text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";

import { getAllPublications } from "../api/publication";

export default {
	name: "PublicationsPage",
	data() {
		return {
			publications: [],
			publication: { text: "", image: "", profil_id: "" },
			spublication: "",
		};
	},
	components: { HomeHeader },

	//afficher toutes les publications à l 'ouverture de la page
	async created() {
		await this.fetchAllPublications();
	},
	methods: {
		async fetchAllPublications() {
			try {
				this.publications = await getAllPublications();
			} catch (error) {
				console.log(error);
			}
		},

		//récupérer url image
		getURL(e) {
			this.publication.image = e.target.files[0];
			console.log(this.publication.image);
		},

		async newPublication() {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				console.log(user);

				const publicationToSend = {
					text: this.publication.text,
					profil_id: user.profilID,
				};

				console.log(publicationToSend);

				let spublication = JSON.stringify(publicationToSend);
				let formData = new FormData();
				formData.append("publication", spublication);
				if (this.publication.image) {
					formData.append("image", this.publication.image);
				}

				const response = await fetch(
					"http://localhost:3000/api/publication",
					{
						method: "POST",

						body: formData,
					}
				);
				const jsonResponse = await response.json();
				console.log(jsonResponse);

				await this.fetchAllPublications();
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
