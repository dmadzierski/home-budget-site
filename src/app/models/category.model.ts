import {Serializable} from './Serilizable';

export class Category extends Serializable {
  description: string;
  id: bigint;
  name: string;
  transactionType: string;

}
