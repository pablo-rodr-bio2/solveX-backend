import express, { NextFunction, Request, Response } from 'express'
import db from "./config/database.config"
import { QuoteInstance } from "./model"
import QuoteValidator from "./validator"
import Middleware from "./middleware"

db.sync().then(() => {
  console.log('connect to db')
})

const app = express()
const PORT = 5000

app.use(express.json())


app.get(
  "/api/quotes",
  async (req: Request, res: Response) => {
    try {
      const quotes = await QuoteInstance.findAll()
      res.json(quotes)
    } catch (e) {
      res.json({ msg: "Failed to read quotes", status: 500, route: "/api/quotes" })
    }
  })

app.get(
  "/api/quote/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const quote = await QuoteInstance.findOne({ where: { id }})
      res.json(quote)
    } catch (e) {
      res.json({ msg: "Failed to read a quote by id", status: 500, route: "/api/quote/:id" })
    }
  })

app.post(
  "/api/new-quote",
  QuoteValidator.checkCreateQuote(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = await QuoteInstance.count() + 1
    try {
      const quote = await QuoteInstance.create({ ...req.body, id })
      res.json({ quote, msg: "You have created a new quote" })
    } catch (e) {
      res.json({ msg: "Failed to create a new quote", status: 500, route: "/api/new-quote" })
    }
  })

app.get("/", (req: Request, res: Response) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})