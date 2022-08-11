"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const middleware_1 = __importDefault(require("../middleware"));
const controller_1 = __importDefault(require("../controller"));
const router = express_1.default.Router();
router.get("/quotes", controller_1.default.readAll);
router.get("/quote/:id", validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, controller_1.default.readById);
router.put("/update/:id", validator_1.default.checkIdParam(), validator_1.default.checkUpdateQuote(), middleware_1.default.handleValidationError, controller_1.default.updateById);
router.delete("/delete/:id", validator_1.default.checkIdParam(), middleware_1.default.handleValidationError, controller_1.default.deleteById);
router.post("/new-quote", validator_1.default.checkCreateQuote(), middleware_1.default.handleValidationError, controller_1.default.createQuote);
exports.default = router;
