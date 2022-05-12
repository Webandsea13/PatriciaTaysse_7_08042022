<template>
	<div class="background">
		<HomeHeader></HomeHeader>
		<div class="home-section" v-if="profil">
			<h2>Profil</h2>

			<div class="container">
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
					<div>
						<p>Nom : {{ profil.name }}</p>
						<p>Email : {{ profil.email }}</p>
						<p>
							Inscrit depuis le :
							{{ new Date(profil.time).toLocaleString() }}
						</p>
					</div>
				</div>
				<div
					class="profil action"
					v-if="profilID == profil.id || isAdmin == 1"
				>
					<a><i class="fas fa-edit"></i>Modifier le profil</a>
					<a v-on:click="deleteProfil()"
						><i class="fas fa-trash-alt"></i>Supprimer le profil</a
					>
				</div>
			</div>

			<h2>Publications</h2>
			<div class="container">
				{{ profilPublications }}
				<div
					v-for="item in profilPublications"
					v-bind:key="item.id"
					class="publication"
				>
					<p>Publié par {{ profil.name }}</p>
					<p>le {{ new Date(item.time).toLocaleString() }}</p>
					<h3>{{ item.text }}</h3>
					<img v-if="item.image" v-bind:src="item.image" alt="" />
					<div
						class="profil action"
						v-if="profilID == item.profil_id || isAdmin == 1"
					>
						<a
							><i class="fas fa-edit"></i>Modifier la
							publication</a
						>
						<a v-on:click="deletePublication(item.id)"
							><i class="fas fa-trash-alt"></i>Supprimer la
							publication</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader.vue";
export default {
	name: "ProfilPage",
	components: { HomeHeader },
	data() {
		return {
			profil: null,
			profilPublications: [],
			profilID: "",
			isAdmin: "",
			profilIDUrl: "",
		};
	},
	//afficher le profil et ses publications au chargement de la page
	async created() {
		await this.getProfil(this.$route.params.id);
		await this.getProfilPublications(this.$route.params.id);
	},
	async beforeRouteUpdate(to, from, next) {
		console.log("to", to);
		await this.getProfil(to.params.id);
		await this.getProfilPublications(to.params.id);
		next();
	},
	methods: {
		async getProfil(profilId) {
			try {
				//recupération isAdmin dans token LS
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				this.profilID = user.profilID;
				this.isAdmin = user.isAdmin;
				//recupération id en paramètres url
				this.profilIDUrl = profilId;
				console.log(" verification recupération id dans url");
				console.log(this.profilIDUrl);

				const res = await fetch(
					"http://localhost:3000/api/profil/" + this.profilIDUrl
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfil");
				console.log(jsonRes);
				this.profil = jsonRes;
			} catch (error) {
				console.log(error);
			}
		},

		async getProfilPublications(profilId) {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				this.profilID = user.profilID;
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
				const LS = localStorage.getItem("token");

				const token = JSON.parse(LS);

				const response = await fetch(
					"http://localhost:3000/api/profil/" + this.profil.id,
					{
						method: "DELETE",
						headers: {
							"content-type": "application/json",
							Authorization: "Bearer " + token,
						},
					}
				);

				const jsonResponse = await response.json();
				console.log("RESPONSE FETCH DELETE");
				console.log(jsonResponse);
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
				const LS = localStorage.getItem("token");

				const token = JSON.parse(LS);

				const response = await fetch(
					"http://localhost:3000/api/publication/" + id,
					{
						method: "DELETE",
						headers: {
							"content-type": "application/json",
							Authorization: "Bearer " + token,
						},
					}
				);

				const jsonResponse = await response.json();
				console.log("RESPONSE FETCH DELETE");
				console.log(jsonResponse);

				//réafficher les publications sans la pblication supprimée
				await this.getProfilPublications(this.$route.params.id);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
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
