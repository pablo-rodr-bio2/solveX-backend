import { Sequelize } from "sequelize";

const db = new Sequelize({
  storage: "./quotes.sqlite",
  dialect: "sqlite",
  logging: false,
});

export default db;