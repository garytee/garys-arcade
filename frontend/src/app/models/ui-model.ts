import { BalanceHistory } from "./balance-history";
import { Games } from "./games";

export interface UiModel {
    transactions: BalanceHistory[];
    games: Games[];
}