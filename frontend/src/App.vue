<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: "App",
};
</script>

<style>
*,
::after,
::before {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Oxygen", sans-serif;
}
body {
	background-color: rgb(255, 215, 215);
}
.background {
	width: 100vw;

	display: flex;
	align-items: center;
	flex-direction: column;
}

.register-header {
	width: 440px;
	text-align: center;
	margin-bottom: 20px;
}

#register-logo {
	width: 440px;
	height: 200px;
	object-fit: cover;
}

.register-section {
	display: flex;

	flex-direction: column;
	width: 380px;

	margin: 20px;
	padding: 10px;
	padding-bottom: 40px;
	background: white;
}

.register-form {
	width: 320px;
	text-align: center;
}
.register-input {
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
.btn {
	padding: 10px 20px;
	border: 0;
	border-radius: 30px;
	outline: none;
	background: linear-gradient(to left top, #e66465, rgb(255, 215, 215));
	box-shadow: 5px 5px 10px grey;
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
	margin-top: 20px;
	margin-bottom: 20px;
}
.register-btn {
	height: 40px;
	width: 200px;
	margin-top: 40px;
	margin-bottom: 40px;
}
span {
	font-weight: bold;
}

.btn:hover {
	background: linear-gradient(to left top, rgb(255, 215, 215), #e66465);
}
a {
	margin-left: auto;
	margin-right: auto;
	margin: 5px;
	text-decoration: none;
	font-weight: bold;
	cursor: pointer;
	color: black;
}
a:hover {
	color: rgb(253, 45, 1);
}
a:visited {
	text-decoration: none;
	color: black;
}
.lien {
	margin-left: auto;
	margin-right: auto;
	margin: 5px;
	text-decoration: none;
	font-weight: bold;
	cursor: pointer;
}
.lien:hover {
	color: rgb(253, 45, 1);
}
.lien:visited {
	text-decoration: none;
	color: black;
}
.home-section {
	width: 700px;
	position: relative;
	top: 140px;
}
.container {
	box-shadow: 3px 3px 10px grey;
	border-radius: 10px;
	background-color: white;
	padding: 20px;
	margin: 20px;
}

.publication {
	padding: 20px 10px;
	border-bottom: 8px solid rgb(255, 215, 215);
}
h3 {
	margin: 10px 0px;
}
.imgPublication {
	width: 90%;
	height: 35%;
	object-fit: cover;
}

@media screen and (max-width: 767px) {
	.background {
		font-size: 12px;
	}
	#register-logo {
		width: 75vw;
		height: 120px;
		object-fit: cover;
	}
	.register-header,
	.register-section,
	.register-form {
		width: 75vw;
	}
	.register-input {
		width: 80%;
	}
	.home-section {
		width: 90vw;
	}
}
@media screen and (max-width: 500px) {
	.home-section {
		top: 190px;
	}
}
</style>
