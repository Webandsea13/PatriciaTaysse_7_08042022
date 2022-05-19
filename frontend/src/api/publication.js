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

export const fetchAllProfilPublications = async function (id) {
	const LStoken = localStorage.getItem("token");

	const token = JSON.parse(LStoken);

	const res = await fetch("http://localhost:3000/api/publication/" + id, {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const jsonRes = await res.json();
	console.log("JSON RES DU FETCH getProfilPublication");
	console.log(jsonRes);
	return jsonRes;
};

export const fetchPostNewPublication = async function (data) {
	const LStoken = localStorage.getItem("token");
	const token = JSON.parse(LStoken);

	const response = await fetch("http://localhost:3000/api/publication", {
		method: "POST",
		body: data,
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const jsonResponse = await response.json();

	return jsonResponse;
};

export const fetchDeletePublication = async function (id) {
	const LS = localStorage.getItem("token");

	const token = JSON.parse(LS);
	const response = await fetch(
		"http://localhost:3000/api/publication/" + id,
		{
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				Authorization: "Bearer " + token,
			},
		}
	);

	const jsonResponse = await response.json();
	return jsonResponse;
};

export const fetchDeleteProfil = async function (id) {
	const LS = localStorage.getItem("token");

	const token = JSON.parse(LS);

	const response = await fetch("http://localhost:3000/api/profil/" + id, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + token,
		},
	});

	const jsonResponse = await response.json();
	return jsonResponse;
};
