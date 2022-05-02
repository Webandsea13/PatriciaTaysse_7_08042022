export const getAllPublications = async function () {
	const res = await fetch("http://localhost:3000/api/publication");
	const jsonRes = await res.json();
	return jsonRes.results;
};
