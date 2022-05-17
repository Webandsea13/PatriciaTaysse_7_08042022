//importation bcrypt
//const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const dbconnection = require("../db/db");

exports.getCurrentProfil = (req, res, next) => {
	const currentUserID = req.dToken.profilID;

	dbconnection.query(
		`SELECT * FROM profil WHERE id = ?`,
		currentUserID,
		(error, results) => {
			if (error) {
				return res.status(500).json({
					message: "Impossible de récupérer les données.",
					error: error,
				});
			}

			const user = results[0];

			return res.status(200).json({
				id: user.id,
				email: user.email,
				name: user.name,
				imageProfil: user.imageProfil,
				isAdmin: user.isAdmin,
			});
		}
	);
};

exports.readAllProfil = (req, res, next) => {
	console.log("requete get profils");
	dbconnection.query(`SELECT * FROM profil`, (error, results) => {
		if (error) {
			res.status(500).json({
				message: "Impossible de récupérer les données.",
				error: error,
			});
		} else {
			const dToken = req.dToken;
			res.status(200).json({ results: results, dToken: dToken });
			console.log(results);
		}
	});
};

exports.readOneProfil = (req, res) => {
	//console.log("controller requete get OneProfil");

	dbconnection.query(
		`SELECT * FROM profil WHERE id=?`,
		req.params.id,
		(error, results) => {
			if (error) {
				res.status(500).json({
					message: "Impossible de récupérer les données.",
					error: error,
				});
			} else {
				const dToken = req.dToken;
				res.status(200).json({ results: results[0], dToken: dToken });
				//console.log(results);
			}
		}
	);
};

exports.deleteProfil = async (req, res) => {
	try {
		const results = await dbconnection
			.promise()
			.query(`SELECT * FROM profil WHERE id=?`, req.params.id);
		console.log("RECUPERATION PROFIL AVANT SUPPRESSION");
		const dataArray = results[0];
		const data = dataArray[0];
		if (data.id == req.dToken.profilID || req.dToken.isAdmin == 1) {
			console.log("REUSSI");
			if (data.imageProfil != null) {
				const filename = data.imageProfil.split("/images/")[1];
				fs.unlink(`images/${filename}`, (error) => {
					if (error) {
						console.log("UNLINK IMPOSSIBLE");
						console.log(error);
					} else {
						console.log("UNLINK EFFECTUE");
					}
				});
			}

			dbconnection.query(
				`DELETE  FROM profil WHERE id=?`,
				req.params.id,
				(error, results) => {
					if (error) {
						res.status(400).json({
							message:
								"impossible de supprimer les données du profil.",
							error: error,
						});
					} else {
						res.status(200).json({
							message: "Données profil effacées.",
						});
					}
				}
			);
		} else {
			throw "requete non autorisée !!!";
		}
	} catch (error) {
		res.status(400).json({
			message: "impossible de trouver les données à supprimer.",
			error: error,
		});
	}
};

exports.updateProfil = async (req, res) => {
	console.log("UPDTATE PROFIL");
};

exports.signup = (req, res) => {
	const profil = {
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
	};
	//enregistrer le nouveau profil dans la db
	dbconnection.query(`INSERT INTO profil SET ?`, profil, (error, results) => {
		if (error) {
			res.status(500).json({
				error: error,
				message: "Impossible de créer le profil.",
			});
		} else {
			dbconnection.query(
				`SELECT * FROM profil WHERE email=?`,
				profil.email,
				(error, results) => {
					if (error) {
						res.status(500).json({
							error: error,
							message: "accès db impossible",
						});
					} else {
						const token = jwt.sign(
							{
								profilID: results[0].id,
								isAdmin: results[0].isAdmin,
								name: results[0].name,
								imageProfil: results[0].imageProfil,
							},
							process.env.JWT_KEY,
							{ expiresIn: "12h" }
						);
						res.status(201).json({
							token: token,
							//profilID: results[0].id,
							//isAdmin: results[0].isAdmin,
						});
					}
				}
			);
		}
	});
};

//fonction signup pour enregistrer un nouvel utilisateur

// exports.signup = (req, res) => {
// 	bcrypt
// 		.hash(req.body.password, 10)
// 		.then((hash) => {
// 			const user = new User({
// 				email: req.body.email,
// 				password: hash,
// 			});

exports.login = (req, res) => {
	const email = req.body.email;
	//rechercher email dans db
	dbconnection.query(
		"SELECT * FROM profil WHERE email=?",
		email,
		(error, results) => {
			if (error) {
				res.status(500).json({
					error: error,
					message: "accès db impossible",
				});
			} else {
				console.log(results);

				//si results est un tableau vide (le profil n'existe pas)
				if (results == 0) {
					return res
						.status(404)
						.json({ message: "profil inexistant" });
				}
				//comparaison  mot de passe DB et mot de passe login
				if (results[0].password == req.body.password) {
					const token = jwt.sign(
						{
							profilID: results[0].id,
							isAdmin: results[0].isAdmin,
							name: results[0].name,
							imageProfil: results[0].imageProfil,
						},
						process.env.JWT_KEY,
						{ expiresIn: "12h" }
					);

					res.status(200).json({
						token: token,
						//profilID: results[0].id,
						//isAdmin: results[0].isAdmin,
					});
				} else {
					res.status(401).json({ message: "mot de passe incorrect" });
				}
			}
		}
	);
};

// exports.login = async (req, res, next) => {
// 	try {
// 		//chercher si utilisateur bien présent dans base de données
// 		const user = await User.findOne({ email: req.body.email });
// 		if (!user) {
// 			return res.status(401).json({
// 				error: "Vous devez d'abord vous inscrire pour vous connecter.",
// 			});
// 		}

// 		//controler validité du password
// 		const valid = await bcrypt.compare(req.body.password, user.password);
// 		//mot de passe incorrect
// 		if (!valid) {
// 			return res.status(401).json({
// 				error: "Le mot de passe est incorrect.",
// 			});
// 		}
// 		//utilsateur présent et password correct : envoi dans la réponse du userId et du token
// 		return res.status(200).json({
// 			userId: user._id,
// 			token: jwt.sign({ userId: user._id }, `${process.env.KEY_TOKEN}`, {
// 				expiresIn: "10h",
// 			}),
// 		});
// 	} catch {
// 		(error) => {
// 			return res.status(500).json({ error });
// 		};
// 	}
// };
