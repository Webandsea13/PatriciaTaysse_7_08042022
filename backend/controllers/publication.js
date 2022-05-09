const dbconnection = require("../db/db");

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
	console.log("NEW PUBLICATION");
	console.log(newPublication);
	//enregistrer le nouveau profil dans la db
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
	console.log("READ ALL PUBLICATION RESULTS");
	dbconnection.query(
		`SELECT * FROM publication   JOIN profil ON publication.profil_id = profil.id  ORDER BY publication.id DESC`,
		(error, results) => {
			if (error) {
				res.status(500).json({
					message: "Impossible de récupérer les données.",
					error: error,
				});
			} else {
				const dToken = req.dtoken;
				res.status(200).json({ results: results, dToken: dToken });
				console.log(res);
			}
		}
	);
};

exports.readProfilPublication = (req, res) => {
	console.log("REQUETE PROFIL PUBLICATION");
	dbconnection.query(
		`SELECT * FROM publication   WHERE profil_id=?  ORDER BY publication.id DESC`,
		req.params.id,
		(error, results) => {
			if (error) {
				res.status(500).json({
					message: "Impossible de récupérer les données.",
					error: error,
				});
			} else {
				res.status(200).json({ results });
				console.log(results);
			}
		}
	);
};

exports.deletePublication = (req, res) => {
	dbconnection.query(
		`DELETE  FROM publication WHERE id=?`,
		req.params.id,
		(error, results) => {
			if (error) {
				res.status(400).json({
					message: "impossible de supprimer les données.",
					error: error,
				});
			} else {
				res.status(200).json({ message: "Données effacées." });
			}
		}
	);
};
