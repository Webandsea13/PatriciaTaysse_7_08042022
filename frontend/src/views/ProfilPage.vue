<template>
	<div class="home-section" v-if="profil">
		<div class="container">
			<h2>Profil</h2>
			<div class="profil">
				<img
					v-if="profil.imageProfil"
					v-bind:src="profil.imageProfil"
					alt=""
					class="imgProfil"
				/>
				<div v-else>
					<i class="fas fa-user-circle fa-6x"></i>
				</div>
				<div v-if="modif">
					<div>
						Nom :
						<input type="text" :placeholder="profil.name" />
					</div>
				</div>

				<div v-else>Nom : {{ profil.name }}</div>
				<p>Email : {{ profil.email }}</p>
				<p>
					Inscrit depuis le :
					{{ new Date(profil.time).toLocaleString() }}
				</p>
			</div>
			<div
				class="profil action"
				v-if="profilID == profil.id || isAdmin == 1"
			>
				<div v-if="modif" v-on:click="updateProfil()" class="lien">
					<i class="fas fa-paper-plane"></i>Envoyer les modifications
				</div>
				<div v-else class="lien" v-on:click="edit()">
					<i class="fas fa-edit"></i>Modifier le profil
				</div>
				<a v-on:click="deleteProfil()"
					><i class="fas fa-trash-alt"></i>Supprimer le profil</a
				>
			</div>
		</div>

		<div class="container">
			<h2>Publications</h2>

			<div
				v-for="item in profilPublications"
				v-bind:key="item.id"
				class="publication"
			>
				<div class="publication-header">
					<img
						v-if="profil.imageProfil"
						v-bind:src="profil.imageProfil"
						alt=""
						class="imgProfilMini"
					/>

					<p>Publié par {{ profil.name }}</p>
					<br />
					<p>le {{ new Date(item.time).toLocaleString() }}</p>
				</div>
				<textarea v-if="idPublicationToModify == item.id"></textarea>
				<h3 v-else>{{ item.text }}</h3>

				<img
					v-if="item.image"
					v-bind:src="item.image"
					alt=""
					class="imgPublication"
				/>
				<div
					class="profil action"
					v-if="profilID == item.profil_id || isAdmin == 1"
				>
					<div class="lien" v-on:click="edit(item.id)">
						<i class="fas fa-edit"></i>Modifier la publication
					</div>
					<div v-if="modif">Bonjour la modif</div>
					<p class="lien" v-on:click="deletePublication(item.id)">
						<i class="fas fa-trash-alt"></i>Supprimer la publication
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchDeletePublication } from "../api/publication";
import { fetchDeleteProfil } from "../api/publication";

export default {
	name: "ProfilPage",
	props: ["currentUser"],
	data() {
		return {
			profil: null,
			profilPublications: [],
			profilID: "",
			isAdmin: "",
			profilIDUrl: "",
			modif: false,
		};
	},
	//afficher le profil et ses publications au chargement de la page
	async created() {
		await this.getProfil(this.$route.params.id);
		await this.getProfilPublications(this.$route.params.id);
	},
	//afficher mon profil après avoir visité un autre profil
	async beforeRouteUpdate(to, from, next) {
		console.log("to", to);
		await this.getProfil(to.params.id);
		await this.getProfilPublications(to.params.id);
		next();
	},
	methods: {
		async getProfil(profilId) {
			try {
				//recupération id en paramètres url
				this.profilIDUrl = profilId;
				console.log(" verification recupération id dans url");
				console.log(this.profilIDUrl);
				// ATTENTION !!! remplacer la récupération de user localStorage par user dToken
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

				this.profilID = this.currentUser.id;
				this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},

		async getProfilPublications(profilId) {
			try {
				const LStoken = localStorage.getItem("token");

				const token = JSON.parse(LStoken);

				//recupération id en paramètres url
				this.profilIDUrl = profilId;

				const res = await fetch(
					"http://localhost:3000/api/publication/" + this.profilIDUrl,
					{
						headers: {
							accept: "application/json",
							"content-type": "application/json",
							Authorization: "Bearer " + token,
						},
					}
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfilPublication");
				console.log(jsonRes);
				this.profilPublications = jsonRes.results;
			} catch (error) {
				console.log(error);
			}
		},
		async deleteProfil() {
			try {
				const fetch = await fetchDeleteProfil(this.profil.id);
				console.log(fetch);

				//retourner en page signup si profil supprimé par son auteur
				//retourner en page d'accueil si profil supprimé par admin
				if (this.isAdmin == 1) {
					this.$router.push("/publications");
				} else {
					this.$router.push("/signup");
				}
			} catch (error) {
				console.log(error);
			}
		},
		async deletePublication(id) {
			try {
				const fetch = await fetchDeletePublication(id);
				console.log("RESPONSE FETCH DELETE");
				console.log(fetch);

				//réafficher les publications sans la publication supprimée
				await this.getProfilPublications(this.$route.params.id);
			} catch (error) {
				console.log(error);
			}
		},
		edit(id) {
			this.idPublicationToModify = id;
		},
		updateProfil() {
			console.log("CLIC MODIFIER PROFIL");
			this.modif = !this.modif;
		},
	},
};
</script>

<style>
p {
	display: inline;
}
.imgProfil {
	width: 100px;
	height: 100px;
	border-radius: 100px;
}
.profil {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.action {
	padding-top: 10px;
}
svg {
	color: #e66465;
}
@media screen and (max-width: 767px) {
	.imgProfil {
		width: 70px;
		height: 70px;
	}
}
</style>
