const express =require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const imgResize = require("../middleware/sharp-config")

router.post("/", auth, multer, imgResize, booksCtrl.createBook)

router.post("/:id/rating", auth, booksCtrl.addBookRating)

router.put("/:id", auth, multer, imgResize, booksCtrl.modifyBook)

router.delete("/:id", auth, booksCtrl.deleteBook)

router.get("/bestrating", booksCtrl.getBestrating)

router.get("/:id", booksCtrl.getOneBook)

router.get("/", booksCtrl.getAllBooks)

module.exports = router