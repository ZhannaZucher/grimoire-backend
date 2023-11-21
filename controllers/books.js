const Book = require("../models/Book")

exports.createBook = (req, res, next) => {
	const bookObject = JSON.parse(req.body.book)
	delete bookObject._id
	delete bookObject._userId

	const book = new Book({
		...bookObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	})

	book
	.save()
	.then(() => res.status(201).json({message: "Livre enregistré"}))
	.catch(error => res.status(400).json({error}))
}

exports.modifyBook = (req, res, next) => {
	//check if the request contains file property
	const bookObject =req.file ? {
		//if the request contains a file, we parse it and create the image url
		...JSON.parse(req.body.book),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
	} : {...req.body}

	delete bookObject._userId

	Book
	.findOne({_id: req.params.id})
	.then((book) => {
		if (book.userId != req.auth.userId) {
			res.status(401).json({message: "Not authorized"})
		} else {
			Book
			.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
			.then(() => res.status(200).json({message: "Object modified"})) 
	 		.catch(error => res.status(400).json({error}))
		}
	})
	.catch(error => res.status(400).json({error}))
}

exports.getOneBook = (req, res, next) => {
	Book
	.findOne({_id: req.params.id})
	.then(book => res.status(200).json(book))
	.catch(error => res.status(404).json({error}))
}

exports.getAllBooks = (req, res, next) => {
	// mock DB
	// const books = [
	// 	{
	// 		userId: "qsomihvqios",
	// 		title: "Vivre vite",
	// 		author: "Brigitte Giraud",
	// 		imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
	// 		year: 2022,
	// 		genre: "roman",
	// 		ratings: [
	// 			{
	// 			userId: "qsomihvqios",
	// 			grade: 5
	// 			}
	// 		],
	// 		averageRating: 5
	// 	},
	// 	{
	// 		userId: "oeihfzeomoihi",
	// 		title: "Triste tigre",
	// 		author: "Neige Sinno",
	// 		imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
	// 		year: 2020,
	// 		genre: "roman",
	// 		ratings: [
	// 			{
	// 			userId: "oeihfzeomoihi",
	// 			grade: 4
	// 			}
	// 		],
	// 		averageRating: 4
	// 	},
	// ]
	// res.status(200).json(books)

	Book
	.find()
	.then(books => res.status(200).json(books))
	.catch(error => res.status(400).json({error}))
}