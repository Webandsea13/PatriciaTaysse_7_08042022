<template>
	<div class="home-section">
		<div>{{ profil }}</div>
		<div>{{ currentUser }}</div>
		<div class="container">
			<h2>Profil</h2>
			<div class="profil">
				<form action="" v-on:submit.prevent="updateProfil">
					<div>
						<img
							v-if="profil.imageProfil"
							v-bind:src="profil.imageProfil"
							alt=""
							class="imgProfil"
						/>

						<div v-else>
							<i class="fas fa-user-circle fa-6x"></i>
						</div>
					</div>
					<div>
						<label for="new-profil-url">Changer l'image:</label>

						<br />
						<input
							id="new-profil-url"
							name="image"
							type="file"
							accept="image/*"
							v-on:change="editURL($event)"
						/>
					</div>

					<div>
						<div>
							Nom :<input
								v-model="profil.name"
								:placeholder="profil.name"
								v-on:change="editName($event)"
							/>
						</div>
						<div>
							Email :
							<input
								v-model="profil.email"
								:placeholder="profil.email"
								v-on:change="editEmail($event)"
							/>
						</div>
						<div>
							Inscrit depuis le :
							{{ new Date(profil.time).toLocaleDateString() }}
						</div>
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
import { fetchGetProfil } from "../api/profil";
//import { fetchPutNewProfil } from "../api/profil";
export default {
	name: "EditProfilPage",
	props: ["currentUser"],
	data() {
		return {
			profil: {},
			newImageProfil: "",
		};
	},
	async created() {
		await this.getProfil(this.$route.params.id);
	},
	methods: {
		async getProfil(profilId) {
			try {
				//recupération id en paramètres url
				this.profilIDUrl = profilId;
				console.log(" verification recupération id dans url");
				console.log(this.profilIDUrl);
				const id = this.profilIDUrl;
				const jsonRes = await fetchGetProfil(id);

				this.profil = jsonRes.results;
				console.log(this.profil);

				//this.profilID = this.currentUser.id;
				//this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},
		//récupérer url image
		editURL(e) {
			this.newImageProfil = e.target.files[0];
			console.log("RECUPERATION URL IMAGE");
			console.log(this.newImageProfil);
		},

		editName(e) {
			this.profil.name = e.target.value;
			console.log("RECUPERATION nouveau name");
			console.log(this.profil.name);
		},
		editEmail(e) {
			this.profil.email = e.target.value;
			console.log("RECUPERATION nouveau email");
			console.log(this.profil.email);
		},
		async updateProfil() {
			try {
				const profilToSend = {
					name: this.profil.name,
					email: this.profil.email,
				};
				const sProfil = JSON.stringify(profilToSend);
				let formData = new FormData();
				formData.append("profil", sProfil);
				if (this.newImageProfil) {
					formData.append("imageProfil", this.newImageProfil);
				}
				const LStoken = localStorage.getItem("token");
				const token = JSON.parse(LStoken);
				const res = await fetch(
					"http://localhost:3000/api/profil/" + this.profilIDUrl,
					{
						method: "PUT",
						body: formData,
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH updateProfil");
				console.log(jsonRes);
				this.$router.push("/profil/" + this.profilIDUrl);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
