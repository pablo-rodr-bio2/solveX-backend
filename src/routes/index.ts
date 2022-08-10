import express from "express"
import QuoteValidator from "../validator"
import Middleware from "../middleware"
import QuoteController from "../controller"

const router = express.Router()

router.get(
  "/quotes",
  QuoteController.readAll
)

router.get(
  "/quote/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  QuoteController.readById
)

router.put(
  "/update/:id",
  QuoteValidator.checkIdParam(),
  QuoteValidator.checkUpdateQuote(),
  Middleware.handleValidationError,
  QuoteController.updateById
)

router.delete(
  "/delete/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  QuoteController.deleteById
)


router.post(
  "/new-quote",
  QuoteValidator.checkCreateQuote(),
  Middleware.handleValidationError,
  QuoteController.createQuote
)


export default router