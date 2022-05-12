export const fetchAllPublications = async function () {
	const LS = localStorage.getItem("token");
	//console.log("TOKEN DU LOCAL STORAGE");
	//console.log(LS);
	const token = JSON.parse(LS);
	//console.log(token);

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
