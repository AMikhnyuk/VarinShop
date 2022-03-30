import BaseView from "views/baseView";
import { actionTypes } from "../../enums/actionTypes";
import { IBaseData } from "sources/data/interfaces";

export default class ProductsView extends BaseView {
  public config(): webix.ui.layoutConfig {
    return {
      cols: [
        { view: "productsTree" },
        {
          view: "productsDatatable",
          css: "productsDatatable",
          localId: "productsView:productsDatatable",
          gravity: 2,
          columns: this._getProductsTableColumns(),
        },
      ],
    };
  }
  public init() {
    const { getBaseData } = this.getBaseService();
    const baseDataByProductType: IBaseData = getBaseData(actionTypes.PRODUCTS);
    this.loadData(baseDataByProductType);
  }
  private _getProductsTableColumns(): {}[] {
    return [
      {
        id: "image",
        header: "Image",
        width: 100,
        template:
          "<div class='image'><img class='image_content' src='#image#'></div>",
      },
      {
        id: "name",
        header: "Name",
        template: "#company# #model#",
        adjust: true,
        fillspace: true,
      },
      { id: "price", header: "Price", adjust: true },
      { id: "rating", header: "Rating", adjust: true },
      {
        id: "amount",
        header: "Amount",
        width: 300,
        template: "{common.counter()}",
        adjust: true,
      },
      {
        id: "buy",
        header: "Buy",
        adjust: true,
        template: '<div class="buyButton" style="cursor:pointer;">BUY</div>',
      },
    ];
  }
}
