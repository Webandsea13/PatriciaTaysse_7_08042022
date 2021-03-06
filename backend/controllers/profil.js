const bcrypt = require("bcrypt");

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
	dbconnection.query(`SELECT * FROM profil`, (error, results) => {
		if (error) {
			res.status(500).json({
				message: "Impossible de récupérer les données.",
				error: error,
			});
		} else {
			const dToken = req.dToken;
			res.status(200).json({ results: results, dToken: dToken });
			//console.log(results);
		}
	});
};

exports.readOneProfil = (req, res) => {
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
	try {
		const results = await dbconnection
			.promise()
			.query(`SELECT * FROM profil WHERE id=?`, req.params.id);
		console.log("RECUPERATION PROFIL AVANT MODIFICATION");
		const dataArray = results[0];
		const data = dataArray[0];
		if (data.id == req.dToken.profilID || req.dToken.isAdmin == 1) {
			console.log("AUTH REUSSI");

			//console.log("req.file", req.file);
			const newProfil = JSON.parse(req.body.profil);
			//console.log("profil parsé  ", newProfil);

			const profil_id = req.dToken.profilID;
			if (req.file) {
				//pour enlever image profil si changement
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
				//ajout de la nouvelle image
				const newImageProfil = `${req.protocol}://${req.get(
					"host"
				)}/images/${req.file.filename}`;

				const newName = newProfil.name;
				dbconnection.query(
					`UPDATE profil  SET   name='${newName}', imageProfil='${newImageProfil}' WHERE id=?`,
					req.params.id,
					(error, results) => {
						if (error) {
							res.status(500).json({
								message: "Impossible de modifier les données.",
								error: error,
							});
						} else {
							res.status(200).json({
								message: "données profil modifiées",
							});
						}
					}
				);
			} else {
				//console.log("pas de req.file");

				const newName = newProfil.name;
				//modifier le profil
				dbconnection.query(
					`UPDATE profil  SET   name='${newName}'  WHERE id=?`,
					req.params.id,
					(error, results) => {
						if (error) {
							res.status(500).json({
								message: "Impossible de modifier les données.",
								error: error,
							});
						} else {
							res.status(200).json({
								message: "données profil modifiées",
							});
						}
					}
				);
			}
		} else {
			throw "requete non autorisée !!!";
		}
	} catch (error) {
		res.status(400).json({
			message: "impossible de trouver les données à modifier.",
			error: error,
		});
	}
};

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		const hashPassword = hash;

		const profil = {
			email: req.body.email,
			name: req.body.name,
			password: hashPassword,
		};

		//enregistrer le nouveau profil dans la db
		dbconnection.query(
			`INSERT INTO profil SET ?`,
			profil,
			(error, results) => {
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
								});
							}
						}
					);
				}
			}
		);
	});
};

exports.login = (req, res) => {
	try {
		const email = req.body.email;
		//rechercher email dans db
		dbconnection.query(
			"SELECT * FROM profil WHERE email=?",
			email,
			(error, results) => {
				if (error) {
					return res.status(500).json({
						error: error,
						message: "accès db impossible",
					});
				}
				console.log(results);

				//si results est un tableau vide (le profil n'existe pas)
				if (results == 0) {
					return res
						.status(404)
						.json({ message: "profil inexistant" });
				}

				//comparaison  mot de passe DB et mot de passe login
				bcrypt
					.compare(req.body.password, results[0].password)
					.then((valid) => {
						//mot de passe incorrect
						if (!valid) {
							return res.status(401).json({
								error: "Le mot de passe est incorrect.",
							});
						}

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
						});
					});
			}
		);
	} catch (error) {
		res.status(401).json({ message: "problème de connexion" });
		console.log(error);
	}
};
