<template>
	<div>
		<div class="register-header">
			<div class="register-header-logo">
				<img
					id="register-logo"
					src="../assets/icon-left-font-monochrome-black.png"
					alt="groupomania"
				/>
			</div>
			<div class="register-header-title">
				<h1>Bienvenue sur votre réseau social d'entreprise</h1>
				<h2>Connectez-vous !</h2>

				<p>Partagez et restez en contact avec vos collègues.</p>
			</div>
		</div>
		<div class="register-section">
			<form class="register-form" v-on:submit.prevent="login()">
				<input
					type="email"
					class="register-input"
					placeholder="email"
					required
					v-model="profil.email"
					autofocus
				/>
				<input
					type="text"
					class="register-input"
					placeholder="mot de passe"
					required
					v-model="profil.password"
				/>
				<button type="submit" class="btn register-btn">
					<span>Se connecter</span>
				</button>
			</form>

			<router-link to="/signup">
				Pas encore inscrit ? Rejoignez Groupomania !
			</router-link>
		</div>
	</div>
</template>

<script>
import { fetchLogin } from "../api/profil";
export default {
	name: "LoginPage",
	data() {
		return {
			profil: { email: "", password: "" },
		};
	},
	created() {
		const LS = localStorage.getItem("token");
		const token = JSON.parse(LS);
		if (token) {
			this.$router.push("/publications");
		}
	},
	methods: {
		async login() {
			try {
				const jsonResponse = await fetchLogin(this.profil);
				console.log(jsonResponse);
				const token = jsonResponse.token;

				localStorage.setItem("token", JSON.stringify(token));

				this.$router.push("/publications");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
