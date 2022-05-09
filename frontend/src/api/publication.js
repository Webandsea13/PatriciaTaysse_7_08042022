export const fetchAllPublications = async function () {
	const LS = localStorage.getItem("token");
	console.log("TOKEN DU LOCAL STORAGE");
	console.log(LS);
	const token = JSON.parse(LS);
	console.log(token);

	const res = await fetch("http://localhost:3000/api/publication", {
		headers: { Authorization: "Bearer" + token },
	});
	const jsonRes = await res.json();
	console.log("JSON RES DU FETCH");
	console.log(jsonRes);
	return jsonRes.results;
};
