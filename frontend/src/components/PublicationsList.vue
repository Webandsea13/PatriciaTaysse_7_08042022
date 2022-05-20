<template>
	<div class="container">
		<h2>Publications</h2>
		<div v-for="item in datas" v-bind:key="item.id" class="publication">
			<div class="publication-header">
				<img
					v-if="item.avatar"
					v-bind:src="item.avatar"
					alt=""
					class="imgProfilMini"
				/>
				<div v-else>
					<i class="fas fa-user-circle fa-2x"></i>
				</div>
				<div class="publication-header-text">
					<p>
						Publié par
						<router-link :to="'/profil/' + item.creatorId"
							>{{ item.creatorName }}
						</router-link>
					</p>
					<p>
						le
						{{ new Date(item.createdAt).toLocaleString() }}
					</p>
				</div>
			</div>

			<h3>{{ item.content }}</h3>
			<img
				v-if="item.picture"
				v-bind:src="item.picture"
				alt=""
				class="imgPublication"
			/>

			<div
				class="profil action"
				v-if="item.creatorId == profilID || isAdmin == 1"
			>
				<router-link :to="'/publication/edit/' + item.publicationId"
					><i class="fas fa-edit"></i>Modifier la
					publication</router-link
				>

				<div
					class="lien"
					v-on:click="deletePublication(item.publicationId)"
				>
					<i class="fas fa-trash-alt"></i>Supprimer la publication
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchAllPublications } from "../api/publication";
import { fetchDeletePublication } from "../api/publication";

export default {
	name: "PublicationsList",
	props: ["currentUser"],
	data() {
		return {
			datas: [],
			profilID: "",
			isAdmin: "",
		};
	},
	async created() {
		await this.getAllPublications();
	},
	methods: {
		async getAllPublications() {
			try {
				const fetch = await fetchAllPublications();
				console.log("PUBLICATIONS SUR PUBLICATIONSPAGE");
				this.datas = fetch.results;
				console.log(this.datas);

				this.profilID = this.currentUser.id;
				this.isAdmin = this.currentUser.isAdmin;
			} catch (error) {
				console.log(error);
			}
		},
		async deletePublication(id) {
			try {
				const fetch = await fetchDeletePublication(id);
				console.log("RESPONSE FETCH DELETE");
				console.log(fetch);

				//réafficher les publications sans la pblication supprimée
				await this.getAllPublications();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
