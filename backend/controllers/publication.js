const dbconnection = require("../db/db");

exports.createPublication = (req, res) => {
	const newPublication = {
		text: req.body.text,
		image: req.body.image,
		profil_id: req.body.profil_id,
	};
	console.log(publication);
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
