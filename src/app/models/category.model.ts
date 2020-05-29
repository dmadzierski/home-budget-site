import {Serializable} from './Serilizable';

export class Category extends Serializable {
  description: string;
  id: bigint;
  name: string;
  transactionType: string;

  mapToView(): Category {
    this.transactionType = (
      this.transactionType.substring(0, 1).toUpperCase() +
      this.transactionType.substring(1, this.transactionType.length).toLowerCase()
    )
      .replace('_', ' ');
    return this;
  }

  public mapToEnum(): Category {
    this.transactionType = this.transactionType.toUpperCase().replace(' ', '_');
    return this;
  }

  public transactionTypeToString(): string {
    return (
      this.transactionType.substring(0, 1).toUpperCase() +
      this.transactionType.substring(1, this.transactionType.length).toLowerCase()
    )
      .replace('_', ' ');
  }

}
