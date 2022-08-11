import 'dotenv/config'
import express, {  Request, Response } from 'express'
import db from "./config/database.config"
import quoteRouter from "./routes"

db.sync().then(() => {
  console.log('Connected to db')
})

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Router for API endpoints
app.use("/api", quoteRouter)

app.get("/", (req: Request, res: Response) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})