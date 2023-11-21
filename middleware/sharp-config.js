const sharp = require("sharp")


const imgResize = async (req, res, next) => {
	if (!req.file) {
		return next() //if there is no file uploaded inside the request, pass to next middleware
	} 
	const imgPath = req.file.path
	try {
		const imgBuffer =await sharp(imgPath).resize(400).toBuffer()//resize file and create the image buffer
		await sharp(imgBuffer).toFile(imgPath) //write output image data to a file
		next()
	} catch (error) {
		next(error)
	}
}

module.exports = imgResize