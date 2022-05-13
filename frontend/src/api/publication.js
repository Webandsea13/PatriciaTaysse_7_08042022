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
