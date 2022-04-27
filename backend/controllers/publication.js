const dbconnection = require("../db/db");

exports.createPublication = (req, res) => {
	const newPublication = {
		text: req.body.text,
		image: req.body.image,
		profil_id: req.body.profil_id,
	};
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
	dbconnection.query(`SELECT * FROM publication`, (error, results) => {
		if (error) {
			res.status(500).json({
				message: "Impossible de récupérer les données.",
				error: error,
			});
		} else {
			res.status(200).json(results);
			console.log(results);
		}
	});
};
