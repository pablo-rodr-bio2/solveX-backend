import express, {  Request, Response } from 'express'
import db from "./config/database.config"
import quoteRouter from "./routes"


db.sync().then(() => {
  console.log('connect to db')
})

const app = express()
const PORT = 5000

app.use(express.json())

app.use("/api", quoteRouter)

app.get("/", (req: Request, res: Response) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})