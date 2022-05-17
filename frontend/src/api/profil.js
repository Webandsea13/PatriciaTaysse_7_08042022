export const getCurrentProfil = async function () {
	const LS = localStorage.getItem("token");
	const token = JSON.parse(LS);

	const response = await fetch("http://localhost:3000/api/profil/current", {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const jsonResponse = await response.json();
	return jsonResponse;
};

export const fetchSignup = async function (profil) {
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

export const fetchLogin = async function (profil) {
	const response = await fetch("http://localhost:3000/api/login", {
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
