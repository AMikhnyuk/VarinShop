import { IBaseData } from "../../data/interfaces";
import { actionTypes } from "../../enums/actionTypes";
import BaseView from "views/baseView";

export default class HistoryView extends BaseView {
  config() {
    return {
      cols: [
        { view: "productsTree" },

        {
          view: "productsDatatable",
          localId: "productsView:productsDatatable",
          gravity: 2,

          columns: this._getHistoryTableColumns(),
        },
      ],
    };
  }
  public init(): void {
    const { getBaseData } = this.getBaseService();
    const baseDataByHistoryType: IBaseData = getBaseData(actionTypes.HISTORY);
    this.loadData(baseDataByHistoryType);
  }
  private _getHistoryTableColumns(): {}[] {
    return [
      {
        id: "name",
        header: "Product",
        template: "#company# #model#",
        adjust: true,
        fillspace: true,
      },

      {
        id: "amount",
        header: "Amount",
        width: 300,
        template: "{common.counter()}",
        adjust: true,
      },
      { id: "address", header: "Address", adjust: true },
      { id: "dilivery", header: "Dilivery", adjust: true },
      { id: "payment", header: "Payment", adjust: true },
      { id: "orderDate", header: "Order Date", adjust: true },
      { id: "status", header: "Status", adjust: true },
    ];
  }
}
