<template>
	<LoginPage />
</template>

<script>
import LoginPage from "./views/Login.vue";

export default {
	name: "App",
	components: {
		LoginPage,
	},
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
</style>
