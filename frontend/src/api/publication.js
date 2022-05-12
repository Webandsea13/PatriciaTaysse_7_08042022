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
