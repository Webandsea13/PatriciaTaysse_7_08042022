<template>
	<div class="home-section">
		<div>{{ profil }}</div>
		<div>{{ currentUser }}</div>
	</div>
</template>

<script>
export default {
	name: "EditProfilPage",
	props: ["currentUser"],
	data() {
		return {
			profil: {},
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
	},
};
</script>

<style></style>
