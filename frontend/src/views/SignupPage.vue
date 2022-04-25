<template>
	<div class="background">
		<div class="register-header">
			<div class="register-header__logo">
				<img
					id="logo-register"
					src="../assets/icon-left-font-monochrome-black.png"
				/>
			</div>
			<div class="register-header__title">
				<h1>Bienvenue sur votre réseau social d'entreprise</h1>
				<h2>S'inscrire, c'est facile et rapide</h2>

				<p>Partagez et restez en contact avec vos collègues.</p>
			</div>
		</div>
		<div class="register-box">
			<form class="input-box">
				<input
					type="text"
					class="input-field"
					placeholder="nom"
					required
					v-model="profil.name"
					autofocus
				/>
				<input
					type="email"
					class="input-field"
					placeholder="email"
					required
					v-model="profil.email"
				/>
				<input
					type="text"
					class="input-field"
					placeholder="mot de passe"
					required
					v-model="profil.password"
				/>
			</form>
			<button type="submit" class="submit-btn" v-on:click="signup()">
				<span>S'inscrire</span>
			</button>
			<router-link to="/login"
				>Déjà inscrit ? Connectez-vous !</router-link
			>
		</div>
	</div>
</template>

<script>
import { signup } from "../api/profil";

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
				const jsonResponse = await signup(this.profil);
				console.log(jsonResponse);
				localStorage.setItem("user", JSON.stringify(jsonResponse));
				this.$router.push("/publications");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style>
.background {
	height: 100vh;
	width: 100vw;

	background-color: rgb(255, 215, 215);

	display: flex;

	align-items: center;
	flex-direction: column;
	font-family: "Oxygen", sans-serif;
}
.register-header {
	width: 440px;
	text-align: center;
}

#logo-register {
	width: 440px;
	height: 200px;
	object-fit: cover;
}
.register-header h1 {
	margin-bottom: 20px;
}
.register-box {
	display: flex;

	flex-direction: column;
	width: 380px;

	margin: 20px;
	padding: 10px;
	background: white;
}

.input-box {
	width: 320px;
	text-align: center;
}
.input-field {
	width: 100%;
	padding: 10px;
	margin: 20px;
	background: transparent;
	outline: none;
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1px solid grey;
}
.submit-btn {
	padding: 10px 20px;
	margin: 40px;
	height: 40px;
	width: 200px;

	border: 0;
	border-radius: 30px;
	outline: none;
	background: linear-gradient(to left top, #e66465, rgb(255, 215, 215));
	box-shadow: 5px 5px 10px grey;
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
}

.submit-btn:hover {
	background: linear-gradient(to left top, rgb(255, 215, 215), #e66465);
}
a {
	margin-left: auto;
	margin-right: auto;
	padding-bottom: 40px;
}
a:hover {
	color: #e66465;
}
a:visited {
	text-decoration: none;
}
@media screen and (max-width: 767px) {
	.background {
		font-size: 12px;
	}
	#logo {
		width: 75%;
		height: 120px;
		object-fit: cover;
	}
	.register-header,
	.register-box {
		width: 75%;
	}
	.input-box {
		width: 90%;
	}
	.input-field {
		width: 80%;
	}
}
</style>
