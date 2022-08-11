"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const jwt = require("jsonwebtoken");
class Middleware {
    handleValidationError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(406).json(error);
        }
        next();
    }
    // Middleware for verifying token authentication
    verifyToken(req, res, next) {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                // Get token from header
                const token = req.headers.authorization.split(" ")[1];
                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Verify user - it's always the same for token creation: 'admin'
                const userName = decoded.user.name;
                if (userName == "admin") {
                    next();
                }
                else {
                    res.status(403).json({ msg: "User not authenticated" });
                }
            }
            catch (error) {
                res.status(500).json({ msg: "Error with token authentication", error: error });
            }
        }
        else {
            res.status(403).json({ msg: "No authentication token with request" });
        }
    }
}
exports.default = new Middleware();
