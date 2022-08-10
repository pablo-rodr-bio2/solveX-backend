"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize({
    storage: "./quotes.sqlite",
    dialect: "sqlite",
    logging: false,
});
exports.default = db;
