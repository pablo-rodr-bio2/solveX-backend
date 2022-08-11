"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const routes_1 = __importDefault(require("./routes"));
database_config_1.default.sync().then(() => {
    console.log('connect to db');
});
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send('hello world');
});
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
