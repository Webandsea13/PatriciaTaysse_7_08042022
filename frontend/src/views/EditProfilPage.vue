<template>
	<div class="home-section">
		<div>{{ profil }}</div>
		<div>{{ currentUser }}</div>
		<div class="container">
			<h2>Profil</h2>
			<div class="profil">
				<form action="">
					<div v-if="seeImageProfil">
						<img
							v-if="profil.imageProfil"
							v-bind:src="profil.imageProfil"
							alt=""
							class="imgProfil"
						/>
					</div>
					<div v-else>
						<i class="fas fa-user-circle fa-6x"></i>
					</div>
					<div v-if="profil.imageProfil == null">
						<label for="new-publication-url"
							>Ajouter une image:</label
						>

						<br />
						<input
							id="new-publication-url"
							name="image"
							type="file"
							accept="image/*"
							v-on:change="getURL($event)"
						/>
					</div>
					<div v-else class="lien" v-on:click="sansImage()">
						<i class="fas fa-trash-alt"></i>Supprimer image
					</div>

					<div>Nom :<input :placeholder="profil.name" /></div>
					<p>Email : <input :placeholder="profil.email" /></p>
					<p>
						Inscrit depuis le :
						{{ new Date(profil.time).toLocaleString() }}
					</p>
					<button type="submit" class="btn">
						<span>valider les modifications</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "EditProfilPage",
	props: ["currentUser"],
	data() {
		return {
			profil: {},
			seeImageProfil: true,
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

				const LStoken = localStorage.getItem("token");
				const token = JSON.parse(LStoken);
				const res = await fetch(
					"http://localhost:3000/api/profil/" + this.profilIDUrl,
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfil");
				console.log(jsonRes);
				this.profil = jsonRes.results;
				console.log(this.profil);

				//this.profilID = this.currentUser.id;
				//this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},
		sansImage() {
			console.log("clic sans image");
			this.seeImageProfil == false;
		},
	},
};
</script>

<style></style>
