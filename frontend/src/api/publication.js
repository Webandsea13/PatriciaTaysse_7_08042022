export const fetchAllPublications = async function () {
	const res = await fetch("http://localhost:3000/api/publication");
	const jsonRes = await res.json();
	console.log("JSON RES DU FETCH");
	console.log(jsonRes);
	return jsonRes.results;
};
