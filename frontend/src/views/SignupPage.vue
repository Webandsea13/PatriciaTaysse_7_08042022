<template>
	<div>
		<div class="register-header">
			<div class="register-header-logo">
				<img
					id="register-logo"
					src="../assets/icon-left-font-monochrome-black.png"
					alt="logo groupomania"
				/>
			</div>
			<div class="register-header__title">
				<h1>Bienvenue sur votre réseau social d'entreprise</h1>
				<h2>S'inscrire, c'est facile et rapide</h2>

				<p>Partagez et restez en contact avec vos collègues.</p>
			</div>
		</div>
		<div class="register-section">
			<form class="register-form" v-on:submit.prevent="signup()">
				<input
					type="text"
					class="register-input"
					placeholder="nom"
					required
					v-model="profil.name"
					autofocus
				/>
				<input
					type="email"
					class="register-input"
					placeholder="email"
					required
					v-model="profil.email"
				/>
				<input
					type="password"
					class="register-input"
					placeholder="mot de passe"
					required
					v-model="profil.password"
				/>
				<button type="submit" class="btn register-btn">
					<span>S'inscrire</span>
				</button>
			</form>

			<router-link to="/login"
				>Déjà inscrit ? Connectez-vous !</router-link
			>
		</div>
	</div>
</template>

<script>
import { fetchSignup } from "../api/profil";

export default {
	name: "SignupPage",
	data() {
		return {
			profil: { name: "", email: "", password: "" },
		};
	},
	methods: {
		async signup() {
			try {
				const jsonResponse = await fetchSignup(this.profil);

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
