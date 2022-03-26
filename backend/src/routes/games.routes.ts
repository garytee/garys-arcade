import * as express from 'express';
import  { GamesModel } from '../models';
import { Helper, Middleware } from '../helpers';

let router = express.Router();

/* All games */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
      return res.json(GamesModel.getGames());
    }
    catch(error: any) {
      console.log(Helper.generateLogMessage(req));
      return res.json({e: `an error occurred: ${error.stack}`});
    }

})

/* A game by id */
router.get('/:id', Middleware.mustBeInteger, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
  try {
    return res.json(GamesModel.getGame(parseInt(req.params.id)));
  }
  catch(error: any) {
    console.log(Helper.generateLogMessage(req));
    return res.json({e: `an error occurred: ${error.stack}`});
  }

})


export default router;