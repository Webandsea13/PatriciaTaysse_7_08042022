export const signup = async function (profil) {
	const response = await fetch("http://localhost:3000/api/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify(profil),
	});
	const jsonResponse = await response.json();
	return jsonResponse;
};
