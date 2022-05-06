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
				<div
					v-for="item in publications"
					v-bind:key="item.id"
					class="publication"
				>
					<div class="publication-header">
						<img
							v-if="item.imageProfil"
							v-bind:src="item.imageProfil"
							alt=""
							class="imgProfilMini"
						/>
						<div v-else>
							<i class="fas fa-user-circle fa-2x"></i>
						</div>
						<div class="publication-header-text">
							<p>
								Publié par
								<router-link :to="'/profil/' + item.id"
									>{{ item.name }}
								</router-link>
							</p>
							<p>le {{ new Date(item.time).toLocaleString() }}</p>
						</div>
					</div>

					<h3>{{ item.text }}</h3>
					<img v-if="item.image" v-bind:src="item.image" alt="" />
					<!--
					<div class="profil action" v-if="(item.id = user.profilID)">
						<a
							><i class="fas fa-edit"></i>Modifier ma
							publication</a
						>
						<a
							><i class="fas fa-trash-alt"></i>Supprimer ma
							publication</a
						>
					</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";

import { fetchAllPublications } from "../api/publication";

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
		await this.getAllPublications();
	},
	methods: {
		async getAllPublications() {
			try {
				this.publications = await fetchAllPublications();
			} catch (error) {
				console.log(error);
			}
		},

		//récupérer url image
		getURL(e) {
			this.publication.image = e.target.files[0];
			console.log("RECUPERATION URL IMAGE");
			console.log(this.publication.image);
		},

		async newPublication() {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				//console.log(user);

				const publicationToSend = {
					text: this.publication.text,
					profil_id: user.profilID,
				};
				console.log("PUBLICATION TO SEND");
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
				console.log("RESPONSE FETCH POST");
				console.log(jsonResponse);

				//réafficher les publications avec la newPublication
				await this.getAllPublications();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style scoped>
.publication-header {
	display: flex;
	align-items: center;
}
.publication-header-text {
	margin-left: 10px;
}
.new-publication-input {
	width: 600px;
	height: 100px;
	font-family: "Oxygen", sans-serif;
	resize: none;
	background-color: #fff9f8;
}
.imgProfilMini {
	width: 30px;
	height: 30px;
	border-radius: 30px;
}
</style>
