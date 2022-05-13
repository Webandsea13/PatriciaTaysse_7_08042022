export const fetchAllPublications = async function () {
	const LS = localStorage.getItem("token");
	const token = JSON.parse(LS);

	const res = await fetch("http://localhost:3000/api/publication", {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const jsonRes = await res.json();

	return jsonRes;
};

/*export const fetchPostNewPublication = async function () {
	const LS = localStorage.getItem("user");
	const user = JSON.parse(LS);
	//console.log(user);
	const LStoken = localStorage.getItem("token");
	const token = JSON.parse(LStoken);
	const publicationToSend = {
		text: this.newPubli.text,
		profil_id: user.profilID,
	};
	console.log("PUBLICATION TO SEND");
	console.log(publicationToSend);
	let sNewPubli = JSON.stringify(publicationToSend);
	let formData = new FormData();
	formData.append("publication", sNewPubli);
	if (this.newPubli.image) {
		formData.append("image", this.newPubli.image);
	}
	const response = await fetch("http://localhost:3000/api/publication", {
		method: "POST",
		body: formData,
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const jsonResponse = await response.json();

	return jsonResponse;
};*/
