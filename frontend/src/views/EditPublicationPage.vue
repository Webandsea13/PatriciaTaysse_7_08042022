<template>
	<div class="home-section">
		<div class="container">
			<h2>Publication</h2>
			<div class="publication">
				<form action="" v-on:submit.prevent="updatePublication">
					<div clas="publication-header">
						<img
							v-if="currentUser.imageProfil"
							v-bind:src="currentUser.imageProfil"
							alt="image profil"
							class="imgProfilMini"
						/>
						<div v-else>
							<i class="fas fa-user-circle fa-2x"></i>
						</div>

						<p>Publié par {{ currentUser.name }}</p>
						<br />
						<p>
							le {{ new Date(publication.time).toLocaleString() }}
						</p>
					</div>
					<div>
						Changer le texte <br />
						<textarea
							type="textarea"
							autofocus
							class="new-publication-input"
							v-model="publication.text"
							:placeholder="publication.text"
							v-on:change="editText($event)"
						/>
					</div>
					<div v-if="publication.image">
						<img
							v-bind:src="publication.image"
							alt="image publication"
							class="imgPublication"
						/>
						<div>
							<label for="new-profil-url">Changer l'image</label>

							<br />
							<input
								id="new-profil-url"
								name="image"
								type="file"
								accept="image/*"
								v-on:change="editURL($event)"
							/>
						</div>
					</div>
					<div v-else>
						<label for="new-profil-url">Ajouter une image</label>

						<br />
						<input
							id="new-profil-url"
							name="image"
							type="file"
							accept="image/*"
							v-on:change="editURL($event)"
						/>
					</div>
					<button type="submit" class="btn">
						<span>valider les modifications</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchOnePublication } from "../api/publication";
export default {
	name: "EditPublicationPage",
	props: ["currentUser"],
	data() {
		return {
			publication: {},
			newImagePublication: "",
		};
	},
	async created() {
		await this.getOnePublication(this.$route.params.id);
	},
	methods: {
		async getOnePublication(pubId) {
			try {
				this.pubIDUrl = pubId;
				const pubID = this.pubIDUrl;
				const jsonRes = await fetchOnePublication(pubID);

				this.publication = jsonRes.results[0];
			} catch (error) {
				console.log(error);
			}
		},
		//récupérer url image
		editURL(e) {
			this.newImagePublication = e.target.files[0];
			console.log("RECUPERATION URL IMAGE");
			console.log(this.newImagePublication);
		},
		editText(e) {
			this.publication.text = e.target.value;
			console.log("RECUPERATION nouveau text");
			console.log(this.publication.text);
		},
		async updatePublication() {
			try {
				const publicationToSend = {
					text: this.publication.text,
				};
				const sPublication = JSON.stringify(publicationToSend);
				let formData = new FormData();
				formData.append("publication", sPublication);
				if (this.newImagePublication) {
					formData.append("image", this.newImagePublication);
				}
				const LStoken = localStorage.getItem("token");
				const token = JSON.parse(LStoken);
				const res = await fetch(
					"http://localhost:3000/api/publication/" +
						this.publication.id,
					{
						method: "PUT",
						body: formData,
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH updatePublication");
				console.log(jsonRes);
				this.$router.push("/publications");
				//this.$router.push("/profil/" + this.currentUser.id);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
