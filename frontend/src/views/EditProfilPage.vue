<template>
	<div class="home-section">
		<div class="container">
			<h2>Profil</h2>
			<div class="profil">
				<form action="" v-on:submit.prevent="updateProfil">
					<div class="edit">
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

					<div>
						<div>
							Changer le nom<input
								class="edit-input"
								v-model="profil.name"
								:placeholder="profil.name"
								v-on:change="editName($event)"
							/>
						</div>

						<div>
							Inscrit depuis le
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

				const id = this.profilIDUrl;
				const jsonRes = await fetchGetProfil(id);

				this.profil = jsonRes.results;
			} catch (error) {
				console.log(error);
			}
		},
		//récupérer url image
		editURL(e) {
			this.newImageProfil = e.target.files[0];
		},

		editName(e) {
			this.profil.name = e.target.value;
		},

		async updateProfil() {
			try {
				const profilToSend = {
					name: this.profil.name,
				};
				const sProfil = JSON.stringify(profilToSend);
				let formData = new FormData();
				formData.append("profil", sProfil);
				if (this.newImageProfil) {
					formData.append("image", this.newImageProfil);
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

<style>
.edit {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.edit-input {
	padding: 10px;
	margin: 20px;
	outline: none;
	border-top: 0;
	border-right: 0;
	border-left: 0;
	border-bottom: 1px solid grey;
	background-color: #fff9f8;
}
</style>
