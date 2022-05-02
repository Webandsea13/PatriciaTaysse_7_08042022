//configuration requete http avec envoi de fichier
const multer = require("multer");

//dictionnaire des mime type
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/gif": "gif",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + "_" + Date.now() + "." + extension);
	},
});

module.exports = multer({
	//fileFilter: function (req, file, cb) {},
	storage,
}).single("image");
