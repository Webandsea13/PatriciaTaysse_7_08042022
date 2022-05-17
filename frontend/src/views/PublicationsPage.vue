<template>
	<div class="home-section">
		<h1>Bienvenue {{ currentUser.name }}</h1>

		<div class="container">
			<form
				class="new-publication-form"
				v-on:submit.prevent="newPublication"
			>
				<h2>Quoi de neuf?</h2>
				<textarea
					type="textarea"
					class="new-publication-input"
					placeholder="Ecrivez quelque chose !"
					required
					v-model="newPubli.content"
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
		<PublicationsList :currentUser="currentUser"></PublicationsList>
	</div>
</template>

<script>
import { fetchAllPublications } from "../api/publication";
import { fetchPostNewPublication } from "../api/publication";
//import { fetchDeletePublication } from "../api/publication";

import PublicationsList from "../components/PublicationsList.vue";

export default {
	name: "PublicationsPage",
	props: ["currentUser"],
	components: { PublicationsList },
	data() {
		return {
			content: "",
			newPubli: { content: "", picture: "", profil_id: "" },
			sNewPubli: "",
		};
	},

	//afficher toutes les publications à l 'ouverture de la page
	//async created() {
	//	await this.getAllPublications();
	//},
	methods: {
		async getAllPublications() {
			try {
				const fetch = await fetchAllPublications();
				console.log("PUBLICATIONS SUR PUBLICATIONSPAGE");
				this.datas = fetch.results;
				console.log(this.datas);

				this.profilID = this.currentUser.id;
				this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},

		//récupérer url image
		getURL(e) {
			this.newPubli.picture = e.target.files[0];
			console.log("RECUPERATION URL IMAGE");
			console.log(this.newPubli.picture);
		},

		async newPublication() {
			try {
				const publicationToSend = {
					content: this.newPubli.content,
				};
				console.log("PUBLICATION TO SEND");
				console.log(publicationToSend);
				let sNewPubli = JSON.stringify(publicationToSend);
				let formData = new FormData();
				formData.append("publication", sNewPubli);
				if (this.newPubli.picture) {
					formData.append("image", this.newPubli.picture);
				}

				await fetchPostNewPublication(formData);

				//réafficher les publications avec la newPublication
				await this.getAllPublications();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
.publication-header {
	display: flex;
	align-items: center;
}
.publication-header-text {
	margin-left: 10px;
}
.new-publication-input {
	width: 97%;
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
@media screen and (max-width: 767px) {
}
</style>
