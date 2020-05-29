import {Category} from './category.model';

export class Transaction {
  public id: bigint;
  public name: string;
  public description: string;
  public price: bigint;
  public category: Category;
  public date: Date;
}
