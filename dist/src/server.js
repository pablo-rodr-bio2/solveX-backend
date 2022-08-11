"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const routes_1 = __importDefault(require("./routes"));
database_config_1.default.sync().then(() => {
    console.log('Connected to db');
});
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express_1.default.json());
// Router for API endpoints
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send('hello world');
});
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
