//importation bcrypt
//const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const dbconnection = require("../db/db");

exports.readAllProfil = (req, res, next) => {
	console.log("requete get profils");
	dbconnection.query(`SELECT * FROM profil`, (error, results) => {
		if (error) {
			res.status(500).json({
				message: "Impossible de récupérer les données.",
				error: error,
			});
		} else {
			res.status(200).json({ results });
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
				res.status(200).json(results[0]);
				//console.log(results);
			}
		}
	);
};

exports.deleteProfil = (req, res) => {
	dbconnection.query(
		`DELETE  FROM profil WHERE id=?`,
		req.params.id,
		(error, results) => {
			if (error) {
				res.status(400).json({
					message: "impossible de supprimer les données du profil.",
					error: error,
				});
			} else {
				res.status(200).json({ message: "Données profil effacées." });
			}
		}
	);
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
							},
							process.env.JWT_KEY,
							{ expiresIn: "12h" }
						);
						res.status(201).json({
							token: token,
							profilID: results[0].id,
							isAdmin: results[0].isAdmin,
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
						},
						process.env.JWT_KEY,
						{ expiresIn: "12h" }
					);

					res.status(200).json({
						token: token,
						profilID: results[0].id,
						isAdmin: results[0].isAdmin,
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
