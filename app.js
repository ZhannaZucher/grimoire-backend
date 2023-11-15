const express = require("express")
const mongoose = require("mongoose")
const booksRoutes = require("./routes/books")

mongoose.connect("mongodb+srv://jzucher:I33qXryVTfIyKnMW@cluster0.vdm32en.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

//intercepts the requests with Content-Type 'application/json' and puts its content in req.body
app.use(express.json())

//config preventing CORS errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use("/api/books", booksRoutes)

module.exports = app