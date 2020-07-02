import {Transaction} from './transaction.model';

export class Wallet {
  name: string;
  balance: bigint;
  id: bigint;
  transactions: Array<Transaction>;
}
