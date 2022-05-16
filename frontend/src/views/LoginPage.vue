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
			<form class="register-form">
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
			</form>
			<button type="submit" class="btn register-btn" v-on:click="login()">
				<span>Se connecter</span>
			</button>
			<router-link to="/signup">
				Pas encore inscrit ? Rejoignez Groupomania !
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "LoginPage",
	data() {
		return {
			profil: { email: "", password: "" },
		};
	},
	methods: {
		async login() {
			try {
				const response = await fetch(
					"http://localhost:3000/api/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json",
						},
						body: JSON.stringify(this.profil),
					}
				);
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				const token = jsonResponse.token;
				localStorage.setItem("user", JSON.stringify(jsonResponse));
				localStorage.setItem("token", JSON.stringify(token));

				//window.location.href = "/publications";
				this.$router.push("/publications");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
