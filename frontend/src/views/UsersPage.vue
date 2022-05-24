<template>
	<div class="home-section">
		<h2>Tous les utilisateurs</h2>
		<div class="container">
			<div v-for="item in users" v-bind:key="item.id" class="user">
				<div class="profil">
					<img
						v-if="item.imageProfil"
						v-bind:src="item.imageProfil"
						alt=""
						class="imgProfil"
					/>
					<div v-else>
						<i class="fas fa-user-circle fa-6x"></i>
					</div>
					<div>
						<router-link :to="'/profil/' + item.id"
							><p>{{ item.name }}</p></router-link
						>
						<p>
							Inscrit depuis le
							{{ new Date(item.time).toLocaleString() }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "UsersPage",
	data() {
		return {
			users: [],
			user: {},
		};
	},

	//afficher les profils au chargement de la page
	async created() {
		await this.viewUsers();
	},
	methods: {
		async viewUsers() {
			try {
				const LStoken = localStorage.getItem("token");
				const token = JSON.parse(LStoken);
				const res = await fetch("http://localhost:3000/api/profil", {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				const jsonRes = await res.json();

				this.users = jsonRes.results;
				this.user = jsonRes.dToken;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
.user {
	padding: 20px 0px;
	border-bottom: 2px solid rgb(255, 215, 215);
}
</style>
