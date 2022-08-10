import express, {Request, Response} from "express"
import { QuoteInstance } from "../model"

class QuoteController{
  
  async readAll(req: Request, res: Response)  {
    try {
      const quotes = await QuoteInstance.findAll()
      res.json(quotes)
    } catch (e) {
      res.json({ msg: "Failed to read quotes", status: 500, route: "/api/quotes" })
    }
  }

  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const quote = await QuoteInstance.findOne({ where: { id }})
      if (quote == null) {
        return res.json({ msg: "No quote with that Id", status: 404, route: "/api/quote/:id"})
      }
      res.json(quote)
    } catch (e) {
      res.json({ msg: "Failed to read a quote by id", status: 500, route: "/api/quote/:id" })
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const id  = req.params.id
      const quote = await QuoteInstance.findOne({ where: { id }})
      if(!quote) {
        return res.json({ msg: "Can't find any quote with that id", status: 404, route: "/api/update/:id"})
      }
      const newQuote = req.body.quote
      const updatedQuote = await quote.update({ quote: newQuote})
      res.json({ quote: updatedQuote})
    } catch (e) {
      res.json({ msg: "Failed to update a quote", status: 500, route: "/api/update/:id" })
    }
  }

  async deleteById (req: Request, res: Response) {
    try {
      const id = req.params.id
      const quote = await QuoteInstance.findOne({ where: { id } })
      if (!quote) {
        return res.json({ msg: "Can't find any quote with that id", status: 404, route: "/api/delete/:id" })
      }
      const deletedQuote = await quote.destroy()
      res.json({ msg: "Quote succesfully deleted", quote: deletedQuote })
    } catch (e) {
      res.json({ msg: "Failed to update a quote", status: 500, route: "/api/delete/:id" })
    }
  }

  async createQuote (req: Request, res: Response) {
    const id = await QuoteInstance.count() + 1
    try {
      const quote = await QuoteInstance.create({ ...req.body, id })
      res.json({ quote, msg: "You have created a new quote" })
    } catch (e) {
      res.json({ msg: "Failed to create a new quote", status: 500, route: "/api/new-quote" })
    }
  }

}

export default new QuoteController()