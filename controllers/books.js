const Book = require("../models/Book")
const fs = require("fs")

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
	.then(() => res.status(201).json({message: "Book created"}))
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
			const filename = book.imageUrl.split('/images/')[1]
			fs.unlink(`images/${filename}`, () => {
			Book
			.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
			.then(() => res.status(200).json({message: "Object modified"})) 
	 		.catch(error => res.status(400).json({error}))
			})
		}
	})
	.catch(error => res.status(400).json({error}))
}

exports.deleteBook = (req, res, next) => {
	Book
	.findOne({_id: req.params.id})
	.then(book => {
		if (book.userId != req.auth.userId) {
			res.status(401).json({message: 'Not authorized'})
		} else {
			const filename = book.imageUrl.split('/images/')[1]
			fs.unlink(`images/${filename}`, () => {
				Book
				.deleteOne({_id: req.params.id})
				.then(() => { res.status(200).json({message: 'Object deleted'})})
            .catch(error => res.status(401).json({ error }))
			})
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
	Book
	.find()
	.then(books => res.status(200).json(books))
	.catch(error => res.status(400).json({error}))
}

exports.addBookRating = (req, res, next) => {  
    Book
	 .findOne({ _id: req.params.id })
    .then(book => {
		//check if the current user has already rated this book
      const alreadyRatedByCurrentUser = book.ratings.find(rating => rating.userId === req.auth.userId)

      if (alreadyRatedByCurrentUser) {
        return res.status(401).json({ error: "Already rated" })
      } 

		//update the book with user's new rating
      book.ratings.push({userId: req.auth.userId, grade: req.body.rating})
      //update the book's average rating
		const totalRatings = book.ratings.reduce((sum, value) => sum + value.grade, 0)
		// book.averageRating = Math.round(totalRatings / book.ratings.length)
		book.averageRating = Number((totalRatings / book.ratings.length).toFixed(1))

      book
		.save()
      .then(() => res.status(200).json(book))
      .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}

exports.getBestrating = (req, res, next) => {
	Book.find().sort({averageRating: -1}).limit(3)
	.then(bestrating => res.status(200).json(bestrating))
	.catch(error => res.status(400).json({error}))
}
