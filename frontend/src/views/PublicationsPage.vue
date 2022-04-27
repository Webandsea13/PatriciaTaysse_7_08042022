<template>
	<div class="background">
		<div class="home-header">
			<div class="home-header__logo">
				<img id="logo-home" src="../assets/icon-left-font.png" />
			</div>
			<nav>
				<a href=""></a>
				<a href=""></a>
			</nav>
		</div>
		<div class="home-publication">
			<h1>Bienvenue</h1>
			<div class="new-publication publication">
				<form class="input-publication">
					<h2>Quoi de neuf ?</h2>
					<textarea
						type="textarea"
						class="input-text"
						placeholder="Ecrivez quelque chose !"
						required
						v-model="publication.text"
						autofocus
					></textarea>
					<div>
						<input
							type="text"
							class="input-url"
							placeholder="Ajouter une image"
							v-model="publication.image"
						/>
						<button
							type="submit"
							class="publication-btn"
							v-on:click="newPublication()"
						>
							<span>Publier</span>
						</button>
					</div>
				</form>
			</div>
			<div class="publication">
				<h2>Publications récentes</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PublicationsPage",
	data() {
		return {
			publications: [],
			publication: { text: "", image: "", profil_id: "" },
		};
	},
	methods: {
		async created() {
			try {
				const res = await fetch(
					"http://localhost:3000/api/publication"
				);
				const jsonRes = await res.json();
				console.log(jsonRes);
				this.publications = jsonRes;
			} catch (error) {
				console.log(error);
			}
		},

		async newPublication() {
			try {
				const LS = localStorage.getItem("user");
				const user = JSON.parse(LS);
				console.log(user);
				this.publication.profil_id = user.profilID;
				const response = await fetch(
					"http://localhost:3000/api/publication",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json",
						},
						body: JSON.stringify(this.publication),
					}
				);
				const jsonResponse = await response.json();
				console.log(jsonResponse);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style scoped>
.background {
	height: 100vh;
	width: 100vw;
	background-color: rgb(255, 215, 215);

	display: flex;

	align-items: center;
	flex-direction: column;
	font-family: "Oxygen", sans-serif;
}
.home-header {
	background-color: white;
	height: 80px;
	width: 100vw;

	position: fixed;
}

#logo-home {
	height: 80px;
	width: 400px;
	object-fit: cover;
}

.home-publication {
	width: 700px;
	position: relative;
	top: 120px;
}
.publication {
	box-shadow: 3px 3px 10px grey;
	border-radius: 10px;
	background-color: white;
	padding: 20px;
	margin: 20px;
}
.input-text {
	width: 600px;
	height: 100px;
	font-family: "Oxygen", sans-serif;
	resize: none;
	background-color: #fff9f8;
}
.publication-btn {
	padding: 5x 10px;
	margin: 10px;
	height: 30px;
	width: 100px;

	border: 0;
	border-radius: 30px;
	outline: none;
	background: linear-gradient(to left top, #e66465, rgb(255, 215, 215));
	box-shadow: 5px 5px 10px grey;
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
}
.publication-btn:hover {
	background: linear-gradient(to left top, rgb(255, 215, 215), #e66465);
}
</style>
