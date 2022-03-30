import { IBagItem, IHistoryItem, IProductItem } from "../../data/interfaces";

export interface IProductsDatatable extends webix.ui.datatable {
  loadData(
    data: Array<IProductItem> | Array<IBagItem> | Array<IHistoryItem>
  ): void;
}
