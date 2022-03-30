import { IBagItem } from "../../data/interfaces";

export interface IDatatableTotalCount {
  sumValuesAndSetCount(bagData: Array<IBagItem>): void;
}
