import express, { NextFunction, Request, Response } from 'express'
import db from "./config/database.config"
import { QuoteInstance } from "./model"
import QuoteValidator from "./validator"
import Middleware from "./middleware"
import QuoteController from "./controller"

db.sync().then(() => {
  console.log('connect to db')
})

const app = express()
const PORT = 5000

app.use(express.json())


app.get(
  "/api/quotes",
  QuoteController.readAll
)

app.get(
  "/api/quote/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  QuoteController.readById
)

app.put(
  "/api/update/:id",
  QuoteValidator.checkIdParam(),
  QuoteValidator.checkUpdateQuote(),
  Middleware.handleValidationError,
  QuoteController.updateById
)

app.delete(
  "/api/delete/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  QuoteController.deleteById
)


app.post(
  "/api/new-quote",
  QuoteValidator.checkCreateQuote(),
  Middleware.handleValidationError,
  QuoteController.createQuote
)

app.get("/", (req: Request, res: Response) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})