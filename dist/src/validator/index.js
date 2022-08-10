"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class QuoteValidator {
    checkCreateQuote() {
        return [
            (0, express_validator_1.body)("id")
                .optional()
                .isUUID(4)
                .withMessage("The value 'id' should be UUID v4"),
            (0, express_validator_1.body)("quote")
                .notEmpty()
                .withMessage("The 'quote' value must not be empty"),
            (0, express_validator_1.body)("author")
                .notEmpty()
                .withMessage("The 'author' value must not be empty"),
        ];
    }
}
exports.default = new QuoteValidator();
