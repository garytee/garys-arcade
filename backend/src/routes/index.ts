import { Router } from 'express';
import GamesRoute from './games.routes';
import TransactionsRoute from './transactions.routes';

let router = Router();

router.use("/games", GamesRoute)
router.use("/transactions", TransactionsRoute)

export {
    router
}