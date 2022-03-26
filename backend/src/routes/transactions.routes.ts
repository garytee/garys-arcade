import * as express from 'express';
import  { TransactionsModel } from '../models';
import { Helper, Middleware } from '../helpers';

let router = express.Router();

/* All transactions */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      return res.json(TransactionsModel.getTransactions());
    }
    catch(error: any) {
      console.log(Helper.generateLogMessage(req));
      return res.json({e: `an error occurred: ${error.stack}`});
    }
})


/* calcBalance */
router.get('/calcBalance', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      return res.json(TransactionsModel.calcBalance())
    }
    catch(error: any) {
      console.log(Helper.generateLogMessage(req));
      return res.json({e: `an error occurred: ${error.stack}`});
    }
})

/* A transaction by id */
router.get('/:id', Middleware.mustBeInteger, (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
      return res.json(TransactionsModel.getTransaction(parseInt(req.params.id)));
    }
    catch(error: any) {
      console.log(Helper.generateLogMessage(req));
      return res.json({e: `an error occurred: ${error.stack}`});
    }
   
})

/* Insert a new transaction */
router.post(
  "/",
  Middleware.checkFieldsTransaction,
  Middleware.checkTokenValue,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      return res.status(201).json(TransactionsModel.insertTransaction(req.body))
    } catch (error: any) {
      console.log(Helper.generateLogMessage(req))
      return res.json({ e: `an error occurred: ${error.stack}` })
    }
  }
)

export default router;