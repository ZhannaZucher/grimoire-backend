const express =require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")
const multer = require('../middleware/multer-config')

router.post("/", auth, multer, booksCtrl.createBook)

router.put("/:id", auth, multer, booksCtrl.modifyBook)

router.delete("/:id", auth, booksCtrl.deleteBook)

router.get("/:id", booksCtrl.getOneBook)

router.get("/", booksCtrl.getAllBooks)

module.exports = router