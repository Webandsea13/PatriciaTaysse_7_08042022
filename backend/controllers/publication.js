const dbconnection = require("../db/db");
const fs = require("fs");

exports.createPublication = (req, res) => {
	//console.log("req.body", req.body);
	//console.log("req.file", req.file);
	//console.log("req.dToken", req.dToken);

	const publication = JSON.parse(req.body.publication);
	const profil_id = req.dToken.profilID;

	const newPublication = {
		text: publication.content,
		image: req.file
			? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
			: null,
		profil_id: profil_id,
	};

	//enregistrer la nouvelle publication dans la db
	dbconnection.query(
		`INSERT INTO publication SET ?`,
		newPublication,
		(error, results) => {
			if (error) {
				res.status(500).json({
					error: error,
					message: "Impossible d'enregistrer la publication.",
				});
			} else {
				res.status(201).json({ message: "publication enregistrée." });
			}
		}
	);
};

exports.readAllPublication = (req, res) => {
	dbconnection.query(
		`
		SELECT 
			profil.id as creatorId,
			profil.name as creatorName,
			profil.isAdmin as isAdmin,
			profil.imageProfil as avatar,
			publication.id as publicationId,
			publication.text as content,
			publication.time as createdAt,
			publication.image as picture

		FROM publication
		JOIN profil ON publication.profil_id = profil.id
		ORDER BY publication.id DESC
		`,
		(error, results) => {
			if (error) {
				console.log(error);
				res.status(500).json({
					message: "Impossible de récupérer les données.",
					error: error,
				});
			} else {
				const dToken = req.dToken;
				res.status(200).json({ results: results, dToken: dToken });
			}
		}
	);
};

exports.readProfilPublication = async (req, res) => {
	try {
		const results = await dbconnection
			.promise()
			.query(
				`SELECT * FROM publication   WHERE profil_id=?  ORDER BY publication.id DESC`,
				req.params.id
			);
		const data = results[0];
		return res.status(200).json({ results: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Impossible de récupérer les données.",
			error: error,
		});
	}
};

exports.readOnePublication = (req, res) => {
	dbconnection.query(
		`SELECT * FROM publication WHERE id=? `,
		req.params.id,
		(error, results) => {
			if (error) {
				console.log(error);
				res.status(500).json({
					message: "Impossible de récupérer les données.",
					error: error,
				});
			} else {
				res.status(200).json({ results: results });
			}
		}
	);
};

exports.deletePublication = async (req, res) => {
	try {
		const results = await dbconnection
			.promise()
			.query(
				`SELECT * FROM publication WHERE publication.id=?`,
				req.params.id
			);
		//console.log("RECUPERATION DE LA PUBLICATION AVANT SUPPRESSION ");
		//console.log(results[0]);
		const dataArray = results[0];
		const data = dataArray[0];
		//console.log(data);
		if (data.profil_id == req.dToken.profilID || req.dToken.isAdmin == 1) {
			//console.log("REUSSI");
			if (data.image != null) {
				const filename = data.image.split("/images/")[1];
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
				`DELETE  FROM publication WHERE id=?`,
				req.params.id,
				(error, results) => {
					if (error) {
						res.status(400).json({
							message:
								"impossible de supprimer les données publication.",
							error: error,
						});
					} else {
						res.status(200).json({
							message: "Données publication effacées.",
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

exports.updatePublication = async (req, res) => {
	try {
		const results = await dbconnection
			.promise()
			.query(
				`SELECT profil_id FROM publication WHERE id=?`,
				req.params.id
			);

		const dataArray = results[0];
		const data = dataArray[0];
		if (data.profil_id == req.dToken.profilID || req.dToken.isAdmin == 1) {
			console.log("AUTH REUSSI");

			//On parse pour envoyer dans formData
			const newPublication = JSON.parse(req.body.publication);

			if (req.file) {
				//gestion ancienne image si elle existe
				if (data.image != null) {
					const filename = data.image.split("/images/")[1];
					fs.unlink(`images/${filename}`, (error) => {
						if (error) {
							console.log("UNLINK IMPOSSIBLE");
							console.log(error);
						} else {
							console.log("UNLINK EFFECTUE");
						}
					});
				}

				//gestion nouvelle image
				const newImagePublication = `${req.protocol}://${req.get(
					"host"
				)}/images/${req.file.filename}`;
				const newText = newPublication.text;

				dbconnection.query(
					`UPDATE publication  SET text='${newText}' ,   image='${newImagePublication}' WHERE id=?`,
					req.params.id,
					(error, results) => {
						if (error) {
							res.status(500).json({
								message: "Impossible de modifier les données.",
								error: error,
							});
						} else {
							res.status(200).json({
								message: "données publication modifiées",
							});
						}
					}
				);
			} else {
				//console.log("pas de req.file");
				const newText = newPublication.text;
				//modifier le profil
				dbconnection.query(
					`UPDATE publication  SET text='${newText}'   WHERE id=?`,
					req.params.id,
					(error, results) => {
						if (error) {
							res.status(500).json({
								message: "Impossible de modifier les données.",
								error: error,
							});
						} else {
							res.status(200).json({
								message: "données publication modifiées",
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
