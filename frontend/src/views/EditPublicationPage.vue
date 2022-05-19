<template>
	<div class="home-section">
		<div>{{ publication }}</div>
	</div>
</template>

<script>
import { fetchOnePublication } from "../api/publication";
export default {
	name: "EditPublicationPage",
	props: ["currentUser"],
	data() {
		return {
			publication: {},
		};
	},
	async created() {
		await this.getOnePublication(this.$route.params.id);
	},
	methods: {
		async getOnePublication(pubId) {
			try {
				this.pubIDUrl = pubId;
				const pubID = this.pubIDUrl;
				const jsonRes = await fetchOnePublication(pubID);
				console.log("jsonRes", jsonRes);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
