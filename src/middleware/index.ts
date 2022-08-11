import { Request, Response, NextFunction} from "express"
import { validationResult } from "express-validator"

const jwt = require("jsonwebtoken")

class Middleware {

  handleValidationError(req: Request, res: Response, next: NextFunction){

      const error = validationResult(req)
      if (!error.isEmpty()){
        return res.status(406).json(error)
      }
      next()
  }

  // Middleware for verifying token authentication
  verifyToken(req: Request, res: Response, next: NextFunction) {

    if(req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) {

        try {

          // Get token from header
          const token = req.headers.authorization.split(" ")[1]

          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          // Verify user - it's always the same for token creation: 'admin'
          const userName = decoded.user.name
          if(userName == "admin"){
            next()
          } else {
            res.status(403).json({ msg: "User not authenticated"})
          }          
        } catch (error) {
          res.status(500).json({ msg: "Error with token authentication", error: error})
        }
      } else {
        res.status(403).json({ msg: "No authentication token with request"})
      }
  }
}

export default new Middleware()