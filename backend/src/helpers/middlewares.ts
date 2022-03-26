import { Request, Response, NextFunction } from 'express';

import { Helper } from "../helpers"



const mustBeInteger = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}


const checkFieldsGame = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  const tokens = req.body.tokens
  if (name && Number.isInteger(tokens)) {
    next()
  } else {
    res.status(400).json({ message: "Game fields must include name and tokens must be an integer" })
  }
}


const checkFieldsTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { type, description, tokens } = req.body
  if (type && description && Number.isInteger(tokens)) {
    next()
  } 
  else {
    res
      .status(400)
      .json({ message: "Transaction field must include type, description, and tokens must be an integer" })
      console.log(Helper.generateLogMessage(req))
  }
}


const checkTokenValue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokens = req.body.tokens
  if (tokens <= 0) {
    res.status(400).json({ message: "Token value must be an greater than 0" })
    console.log(Helper.generateLogMessage(req))
  } else {
    next()
  }
}


export {
  mustBeInteger,
  checkFieldsGame,
  checkFieldsTransaction,
  checkTokenValue
}