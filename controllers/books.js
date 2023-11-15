exports.getAllBooks = (req, res) => {

	const books = [
		{
			userId: "qsomihvqios",
			title: "Vivre vite",
			author: "Brigitte Giraud",
			imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
			year: 2022,
			genre: "roman",
			ratings: [
				{
				userId: "qsomihvqios",
				grade: 5
				}
			],
			averageRating: 5
		},
		{
			userId: "oeihfzeomoihi",
			title: "Triste tigre",
			author: "Neige Sinno",
			imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
			year: 2020,
			genre: "roman",
			ratings: [
				{
				userId: "oeihfzeomoihi",
				grade: 4
				}
			],
			averageRating: 4
		},
	]

	res.status(200).json(books)
}