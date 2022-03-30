import { IBagItem, IHistoryItem, IProductItem } from "../../data/interfaces";

export interface IProductsTree extends webix.ui.tree {
  loadData(
    data: Array<IProductItem> | Array<IBagItem> | Array<IHistoryItem>
  ): void;
}
