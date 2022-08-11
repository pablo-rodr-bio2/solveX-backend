import express from "express"
import QuoteValidator from "../validator"
import Middleware from "../middleware"
import QuoteController from "../controller"

const router = express.Router()


router.get(
  "/auth",
  QuoteController.getToken
)

router.get(
  "/quotes",
  Middleware.verifyToken,
  QuoteController.readAll
)

router.get(
  "/quote/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  Middleware.verifyToken,
  QuoteController.readById
)

router.put(
  "/update/:id",
  QuoteValidator.checkIdParam(),
  QuoteValidator.checkUpdateQuote(),
  Middleware.handleValidationError,
  Middleware.verifyToken,
  QuoteController.updateById
)

router.delete(
  "/delete/:id",
  QuoteValidator.checkIdParam(),
  Middleware.handleValidationError,
  Middleware.verifyToken,
  QuoteController.deleteById
)


router.post(
  "/new-quote",
  QuoteValidator.checkCreateQuote(),
  Middleware.handleValidationError,
  Middleware.verifyToken,
  QuoteController.createQuote
)


export default router