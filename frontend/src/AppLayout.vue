<template>
	<div class="background">
		<HomeHeader v-if="currentUser" :currentUser="currentUser"></HomeHeader>
		<router-view :currentUser="currentUser"></router-view>
	</div>
</template>

<script>
import HomeHeader from "./components/HomeHeader.vue";

import { getCurrentProfil } from "./api/profil";

export default {
	name: "AppLayout",
	components: { HomeHeader },
	data() {
		return {
			currentUser: null,
		};
	},
	async created() {
		await this.tryFetchCurrentUser();
	},
	async beforeRouteUpdate(to, from, next) {
		await this.tryFetchCurrentUser();
		next();
	},
	methods: {
		async tryFetchCurrentUser() {
			const LS = localStorage.getItem("token");
			const token = JSON.parse(LS);

			if (token == null) {
				this.currentUser = null;
				return;
			}

			try {
				const currentUserProfil = await getCurrentProfil();
				this.currentUser = currentUserProfil;
				//console.log("CREATION CURRENT USER ");
				//console.log(this.currentUser);
			} catch (error) {
				this.currentUser = null;
				console.log(error);
			}
		},
	},
};
</script>
