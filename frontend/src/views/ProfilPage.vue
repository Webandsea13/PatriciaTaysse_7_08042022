<template>
	<div class="background">
		<HomeHeader></HomeHeader>
		<div class="home-section">
			<h2>Profil</h2>

			<div class="container">
				<div class="profil">
					<img
						v-if="profil[0].imageProfil"
						v-bind:src="profil[0].imageProfil"
						alt=""
						class="imgProfil"
					/>
					<div v-else>
						<i class="fas fa-user-circle fa-6x"></i>
					</div>
					<div>
						<p>Nom : {{ profil[0].name }}</p>
						<p>Email : {{ profil[0].email }}</p>
						<p>
							Inscrit depuis le :
							{{ new Date(profil[0].time).toLocaleString() }}
						</p>
					</div>
				</div>
				<div class="profil action" v-if="profilID == profil[0].id">
					<a><i class="fas fa-edit"></i>Modifier mon profil</a>
					<a><i class="fas fa-trash-alt"></i>Supprimer mon profil</a>
				</div>
			</div>

			<h2>Publications</h2>
			<div class="container">
				<div
					v-for="item in profilPublications"
					v-bind:key="item.id"
					class="publication"
				>
					<p>Publié par {{ profil[0].name }}</p>
					<p>le {{ new Date(item.time).toLocaleString() }}</p>
					<h3>{{ item.text }}</h3>
					<img v-if="item.image" v-bind:src="item.image" alt="" />
					<div
						class="profil action"
						v-if="profilID == item.profil_id"
					>
						<a
							><i class="fas fa-edit"></i>Modifier ma
							publication</a
						>
						<a
							><i class="fas fa-trash-alt"></i>Supprimer ma
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
	Name: "ProfilPage",
	components: { HomeHeader },
	data() {
		return {
			profil: [],
			profilPublications: [],
			profilID: "",
			profilIDUrl: "",
		};
	},
	//afficher le profil et ses publications au chargement de la page
	async created() {
		await this.getProfil();
		await this.getProfilPublications();
	},
	methods: {
		async getProfil() {
			try {
				this.profilIDUrl = this.$route.params.id;
				console.log(" verification recupération id dans url");
				console.log(this.profilIDUrl);

				const res = await fetch(
					"http://localhost:3000/api/profil/" + this.profilIDUrl
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfil");
				console.log(jsonRes);
				this.profil = jsonRes.results;
			} catch (error) {
				console.log(error);
			}
		},

		async getProfilPublications() {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				this.profilID = user.profilID;
				const res = await fetch(
					"http://localhost:3000/api/publication/" + this.profilIDUrl
				);
				const jsonRes = await res.json();
				console.log("JSON RES DU FETCH getProfilPublication");
				console.log(jsonRes);
				this.profilPublications = jsonRes.results;
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
</style>
