import { body, param } from "express-validator"

class QuoteValidator {
  checkCreateQuote(){
    return [
      body("quote")
        .notEmpty()
        .withMessage("The 'quote' value must not be empty"),
      body("author")
        .notEmpty()
        .withMessage("The 'author' value must not be empty"),
    ]
  }
  checkIdParam(){
    return [
      param("id")
        .notEmpty()
        .withMessage("The 'id' value must not be empty")
        .isInt()
        .withMessage("The 'id' value must be an integer value")
    ]
  }
}

export default new QuoteValidator()