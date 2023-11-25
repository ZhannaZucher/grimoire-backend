# LeVieuxGrimoire Backend
![Nodejs](https://img.shields.io/badge/Node.js-43853d?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)

## Presentation

This project is a backend part for application "Le vieux grimoire" allowing you to reference and rate books.

User authentification with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [bcrypt](https://www.npmjs.com/package/bcrypt).

File uploading managed with [multer](https://www.npmjs.com/package/multer) and images optimized with [sharp](https://www.npmjs.com/package/sharp)

## Project setup

1. Install the source code to run the API forking and cloning it from [here](https://github.com/ZhannaZucher/grimoire-backend.git)

2. Clone the UI source code [here](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres.git)

### 1. Frontend :

Install the dependencies with <code>npm install</code> command in the terminal.

The run the app in dev mode with <code>npm start</code> command in the terminal which opens the disponible port [http://localhost:3000](http://localhost:3000).

### 2. Backend :

Install the dependencies with <code>npm install</code> command in the terminal.

Create your [MongoDB cluster](https://www.mongodb.com/), rename the file [.env.sample](https://github.com/ZhannaZucher/grimoire-backend/blob/master/.env_sample) into ".env" and replace file variables with your MongoDB credentials and your secret token.

Finally launch the server with <code>node server</code> or <code>nodemon server</code>.

## API Docs :

API documentation is available at [http://localhost:4000/api-docs/](http://localhost:4000/api-docs/)

### Disponible routes :

**/api/auth/signup** (POST): for user signup

**/api/auth/login** (POST): for user login

**/api/books** (GET): for fetching all books

**/api/books/:id** (GET): for fetching a specific book

**/api/books/bestrating** (GET): for fetching 3 bestrated books

**/api/books** (POST): for posting a book

**/api/books/:id** (PUT): for updating a posted book

**/api/books/:id** (DELETE): for deleting a posted book

**/api/books/:id/rating** (POST): for rating a book

## Dependencies :

![bcrypt](https://img.shields.io/badge/bcrypt-%5E5.1.1-blue)
![dotenv](https://img.shields.io/badge/dotenv-%5E16.3.1-blue)
![express](https://img.shields.io/badge/express-%5E4.18.2-blue)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-%5E9.0.2-blue)
![mongoose](https://img.shields.io/badge/mongoose-%5E7.0.0-blue)
![mongoose-unique-validator](https://img.shields.io/badge/mongoose--unique--validator-%5E4.0.0-blue)
![multer](https://img.shields.io/badge/multer-%5E1.4.5-blue)
![sharp](https://img.shields.io/badge/sharp-%5E0.32.6-blue)
![swagger-ui-express](https://img.shields.io/badge/swagger--ui--express-%5E5.0.0-blue)
![yamljs](https://img.shields.io/badge/yamljs-%5E0.3.0-blue)