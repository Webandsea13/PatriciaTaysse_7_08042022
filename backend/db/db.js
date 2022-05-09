const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");
const dbconnection = mysql.createConnection({
	host: "localhost",
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

dbconnection.connect((err) => {
	if (err) {
		console.log("La connexion a échoué");
		console.log(err);
	} else {
		console.log("Connexion à la base de données RESEAU_SOCIAL réussie !");
	}
});

module.exports = dbconnection;
