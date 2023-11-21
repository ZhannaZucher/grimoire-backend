const multer = require("multer")

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images") //stocks img in 'images' folder
	}, 
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_") //removes whitespaces from original filname
		const extension = MIME_TYPES[file.mimetype] 
		callback(null, name + Date.now() + "." + extension) // creates a unique filename with valid extension
	}
})

module.exports = multer({storage}).single("image") 