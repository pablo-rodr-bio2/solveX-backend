"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
class QuoteController {
    async readAll(req, res) {
        try {
            const quotes = await model_1.QuoteInstance.findAll();
            res.json(quotes);
        }
        catch (e) {
            res.status(500).json({ msg: "Failed to read quotes", route: "/api/quotes" });
        }
    }
    async readById(req, res) {
        try {
            const { id } = req.params;
            const quote = await model_1.QuoteInstance.findOne({ where: { id } });
            if (quote == null) {
                return res.status(404).json({ msg: "No quote with that Id", route: "/api/quote/:id" });
            }
            res.json(quote);
        }
        catch (e) {
            res.status(500).json({ msg: "Failed to read a quote by id", route: "/api/quote/:id" });
        }
    }
    async updateById(req, res) {
        try {
            const id = req.params.id;
            const quote = await model_1.QuoteInstance.findOne({ where: { id } });
            if (!quote) {
                return res.status(404).json({ msg: "Can't find any quote with that id", route: "/api/update/:id" });
            }
            const newQuote = req.body.quote;
            const updatedQuote = await quote.update({ quote: newQuote });
            res.status(201).json({ quote: updatedQuote });
        }
        catch (e) {
            res.status(500).json({ msg: "Failed to update a quote", route: "/api/update/:id" });
        }
    }
    async deleteById(req, res) {
        try {
            const id = req.params.id;
            const quote = await model_1.QuoteInstance.findOne({ where: { id } });
            if (!quote) {
                return res.status(404).json({ msg: "Can't find any quote with that id", route: "/api/delete/:id" });
            }
            const deletedQuote = await quote.destroy();
            res.json({ msg: "Quote succesfully deleted", quote: deletedQuote });
        }
        catch (e) {
            res.status(500).json({ msg: "Failed to update a quote", route: "/api/delete/:id" });
        }
    }
    async createQuote(req, res) {
        const id = await model_1.QuoteInstance.count() + 1;
        try {
            const quote = await model_1.QuoteInstance.create({ ...req.body, id });
            res.status(201).json({ quote, msg: "You have created a new quote" });
        }
        catch (e) {
            res.status(500).json({ msg: "Failed to create a new quote", route: "/api/new-quote" });
        }
    }
}
exports.default = new QuoteController();
