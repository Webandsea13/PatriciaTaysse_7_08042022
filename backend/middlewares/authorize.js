const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
	try {
		//recupération token dans le authorization du header de la requete
		//(split crée un tableau des éléments de authorization en enlevant les espaces,  et on récupère le deuxième élément du tableau)

		const tokenAuth = req.headers.authorization.split(" ")[1];

		//decoder le token
		const decodedToken = jwt.verify(tokenAuth, `${process.env.JWT_KEY}`);
		//console.log("DECODEDTOKEN");
		//console.log(decodedToken);

		req.dToken = decodedToken;

		next();
	} catch (error) {
		res.status(401).json({
			error: error,
			message: "Requête non authentifiée",
		});
	}
};
