import {Category} from './category.model';
import {Serializable} from './Serilizable';

export class Transaction extends Serializable {
  public id: bigint;
  public name: string;
  public description: string;
  public price: bigint;
  public category: Category;
  public date: Date;
  public transactionIdReference: bigint;
}
