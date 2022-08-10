import { body } from "express-validator"

class QuoteValidator {
  checkCreateQuote(){
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The value 'id' should be UUID v4"),
      body("quote")
        .notEmpty()
        .withMessage("The 'quote' value must not be empty"),
      body("author")
        .notEmpty()
        .withMessage("The 'author' value must not be empty"),
    ]
  }
}

export default new QuoteValidator()