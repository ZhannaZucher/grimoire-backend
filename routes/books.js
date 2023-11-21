const express =require("express")
const router = express.Router()
const booksCtrl = require("../controllers/books")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const imgResize = require("../middleware/sharp-config")

router.post("/", auth, multer, imgResize, booksCtrl.createBook)

router.put("/:id", auth, multer, imgResize, booksCtrl.modifyBook)

router.delete("/:id", auth, booksCtrl.deleteBook)

router.get("/:id", booksCtrl.getOneBook)

router.get("/", booksCtrl.getAllBooks)

module.exports = router