<template>
	<div class="home-section">
		<h1>Bienvenue {{ user.name }}</h1>
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
		<div class="container">
			<h2>Publications récentes</h2>
			<div v-for="item in datas" v-bind:key="item.id" class="publication">
				<div class="publication-header">
					<img
						v-if="item.avatar"
						v-bind:src="item.avatar"
						alt=""
						class="imgProfilMini"
					/>
					<div v-else>
						<i class="fas fa-user-circle fa-2x"></i>
					</div>
					<div class="publication-header-text">
						<p>
							Publié par
							<router-link :to="'/profil/' + item.creatorId"
								>{{ item.creatorName }}
							</router-link>
						</p>
						<p>
							le
							{{ new Date(item.createdAt).toLocaleString() }}
						</p>
					</div>
				</div>

				<h3>{{ item.content }}</h3>
				<img v-if="item.picture" v-bind:src="item.picture" alt="" />

				<div
					class="profil action"
					v-if="item.creatorId == profilID || isAdmin == 1"
				>
					<a><i class="fas fa-edit"></i>Modifier la publication</a>
					<a v-on:click="deletePublication(item.publicationId)"
						><i class="fas fa-trash-alt"></i>Supprimer la
						publication</a
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchAllPublications } from "../api/publication";
import { fetchPostNewPublication } from "../api/publication";
import { fetchDeletePublication } from "../api/publication";

export default {
	name: "PublicationsPage",
	data() {
		return {
			datas: [],
			content: "",
			newPubli: { content: "", picture: "", profil_id: "" },
			sNewPubli: "",
			user: "",
			profilID: "",
			isAdmin: "",
		};
	},

	//afficher toutes les publications à l 'ouverture de la page
	async created() {
		await this.getAllPublications();
	},
	methods: {
		async getAllPublications() {
			try {
				const fetch = await fetchAllPublications();
				console.log("PUBLICATIONS SUR PUBLICATIONSPAGE");
				this.datas = fetch.results;
				console.log(this.datas);
				console.log("TOKEN DECODE");
				this.user = fetch.dToken;
				console.log(this.user);
				//const LS = localStorage.getItem("user");
				//const user = JSON.parse(LS);
				this.profilID = this.user.profilID;
				this.isAdmin = this.user.isAdmin;
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

		async deletePublication(id) {
			try {
				const fetch = await fetchDeletePublication(id);
				console.log("RESPONSE FETCH DELETE");
				console.log(fetch);

				//réafficher les publications sans la pblication supprimée
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
