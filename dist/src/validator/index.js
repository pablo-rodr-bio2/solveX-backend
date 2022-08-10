"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class QuoteValidator {
    checkCreateQuote() {
        return [
            (0, express_validator_1.body)("quote")
                .notEmpty()
                .withMessage("The 'quote' value must not be empty"),
            (0, express_validator_1.body)("author")
                .notEmpty()
                .withMessage("The 'author' value must not be empty"),
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)("id")
                .notEmpty()
                .withMessage("The 'id' value must not be empty")
                .isInt()
                .withMessage("The 'id' value must be an integer value")
        ];
    }
}
exports.default = new QuoteValidator();
