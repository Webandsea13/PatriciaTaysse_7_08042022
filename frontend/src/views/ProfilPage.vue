<template>
	<div class="home-section" v-if="profil">
		<div class="container">
			<h2>Profil</h2>
			<div class="profil">
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
					<h3>{{ profil.name }}</h3>

					<div>
						Inscrit depuis le
						{{ new Date(profil.time).toLocaleDateString() }}
					</div>
				</div>
			</div>
			<div
				class="profil action"
				v-if="profilID == profil.id || isAdmin == 1"
			>
				<div class="lien" v-on:click="editProfil(profil.id)">
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
						alt="image profil"
						class="imgProfilMini"
					/>
					<div v-else>
						<i class="fas fa-user-circle fa-2x"></i>
					</div>

					<p>Publié par</p>
					<h3>
						{{ profil.name }}
					</h3>
					<br />
					<p>le {{ new Date(item.time).toLocaleString() }}</p>
				</div>

				<h3>{{ item.text }}</h3>

				<img
					v-if="item.image"
					v-bind:src="item.image"
					alt="image publication"
					class="imgPublication"
				/>
				<div
					class="profil action"
					v-if="profilID == item.profil_id || isAdmin == 1"
				>
					<div class="lien" v-on:click="editPublication(item.id)">
						<i class="fas fa-edit"></i>Modifier la publication
					</div>

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
import { fetchGetProfil } from "../api/profil";
import { fetchAllProfilPublications } from "../api/publication";

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

				const id = this.profilIDUrl;
				const jsonRes = await fetchGetProfil(id);
				this.profil = jsonRes.results;

				this.profilID = this.currentUser.id;
				this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},

		async getProfilPublications(profilId) {
			try {
				this.profilIDUrl = profilId;
				console.log(" verification recupération id dans url");
				console.log(this.profilIDUrl);

				const id = this.profilIDUrl;
				const jsonRes = await fetchAllProfilPublications(id);

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
		editProfil(id) {
			this.$router.push("/profil/edit/" + id);
		},
		editPublication(id) {
			console.log("CLIC MODIFIER PUBLICATION");
			this.$router.push("/publication/edit/" + id);
		},
	},
};
</script>

<style>
p {
	display: inline;
	margin-left: 5px;
	margin-right: 5px;
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
