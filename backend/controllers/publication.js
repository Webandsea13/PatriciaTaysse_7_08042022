const dbconnection = require("../db/db");
const fs = require("fs");

exports.createPublication = (req, res) => {
	console.log("req.body", req.body);
	console.log("req.file", req.file);

	const publication = JSON.parse(req.body.publication);

	const newPublication = {
		text: publication.text,
		image: req.file
			? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
			: null,
		profil_id: publication.profil_id,
	};
	//console.log("NEW PUBLICATION");
	//console.log(newPublication);

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
	//console.log("REQUETE PROFIL PUBLICATION");
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

exports.deletePublication = async (req, res) => {
	try {
		/*dbconnection.query(
			`SELECT profil_id FROM publication WHERE id=?`,
			req.params.id,
			(error, results) => {
				if (error) {
					res.status(400).json({
						message:
							"impossible de trouver les données à supprimer.",
						error: error,
					});
				} else {
					await res.status(200).json({
						results,
					});
					const data=results.json();
					console.log(data);
				}
			}
		);*/
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
	} catch (error) {
		return res
			.status(500)
			.json({ error: error, message: "action impossible" });
	}
};
