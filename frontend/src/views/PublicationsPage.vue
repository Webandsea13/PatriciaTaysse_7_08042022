<template>
	<div class="home-section">
		<h1 v-if="currentUser">Bienvenue {{ currentUser.name }}</h1>

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
					v-model="newPubli.content"
					autofocus
				></textarea>
				<div>
					<label for="new-publication-url">Ajoutez une image !</label>

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
		<PublicationsList
			:currentUser="currentUser"
			ref="publicationsList"
		></PublicationsList>
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

				this.datas = fetch.results;

				this.profilID = this.currentUser.id;
				this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},

		//récupérer url image
		getURL(e) {
			this.newPubli.picture = e.target.files[0];
		},

		async newPublication() {
			try {
				const publicationToSend = {
					content: this.newPubli.content,
				};

				let sNewPubli = JSON.stringify(publicationToSend);
				let formData = new FormData();
				formData.append("publication", sNewPubli);
				if (this.newPubli.picture) {
					formData.append("image", this.newPubli.picture);
				}

				await fetchPostNewPublication(formData);

				//réafficher le component PublicationList avec la newPublication
				this.$refs.publicationsList.getAllPublications();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
h1 {
	text-align: center;
}
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
	outline: none;
	padding: 10px;
	margin: 10px;
}
.imgProfilMini {
	width: 30px;
	height: 30px;
	border-radius: 30px;
	object-fit: cover;
}
@media screen and (max-width: 767px) {
}
</style>
