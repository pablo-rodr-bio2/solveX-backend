"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const model_1 = require("./model");
const validator_1 = __importDefault(require("./validator"));
const middleware_1 = __importDefault(require("./middleware"));
database_config_1.default.sync().then(() => {
    console.log('connect to db');
});
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.get("/api/quotes", async (req, res) => {
    try {
        const quotes = await model_1.QuoteInstance.findAll();
        res.json(quotes);
    }
    catch (e) {
        res.json({ msg: "Failed to read quotes", status: 500, route: "/api/quotes" });
    }
});
app.get("/api/quote/:id", validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await model_1.QuoteInstance.findOne({ where: { id } });
        if (quote == null) {
            return res.json({ msg: "No quote with that Id", status: 404, route: "/api/quote/:id" });
        }
        res.json(quote);
    }
    catch (e) {
        res.json({ msg: "Failed to read a quote by id", status: 500, route: "/api/quote/:id" });
    }
});
app.put("/api/update/:id", async (req, res) => {
    try {
    }
    catch (e) {
        res.json({ msg: "Failed to update quote", status: 500, route: "/api/update/:id" });
    }
    app.post("/api/new-quote", validator_1.default.checkCreateQuote(), middleware_1.default.handleValidationError, async (req, res) => {
        const id = await model_1.QuoteInstance.count() + 1;
        try {
            const quote = await model_1.QuoteInstance.create({ ...req.body, id });
            res.json({ quote, msg: "You have created a new quote" });
        }
        catch (e) {
            res.json({ msg: "Failed to create a new quote", status: 500, route: "/api/new-quote" });
        }
    });
    app.get("/", (req, res) => {
        res.send('hello world');
    });
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`);
    });
});
