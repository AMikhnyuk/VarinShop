import BaseView from "views/baseView";
import { actionTypes } from "../../enums/actionTypes";
import { IBaseData, IProductItem } from "sources/data/interfaces";

export default class ProductsView extends BaseView {
  public config(): webix.ui.layoutConfig {
    return {
      cols: [
        { view: "productsTree" },
        {
          view: "productsDatatable",
          css: "productsDatatable",
          localId: "productsView:productsDatatable",
          gravity: 4,
          columns: this._getProductsTableColumns(),
          onClick: this._getOnClickConfig(),
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
        width: 150,
        template:
          "<div class='image'><img class='image_content' src='#image#'></div>",
      },
      {
        id: "name",
        header: [
          "Name",
          {
            content: "textFilter",
          },
        ],
        template: "#company# #model#",
        adjust: true,
        fillspace: true,
      },
      { id: "price", header: "Price", width: 150 },
      { id: "rating", header: "Rating", width: 150 },
      {
        id: "amount",
        header: "Amount",
        template: "<div style='width:120px''>{common.counter()}</div>",
        adjust: true,
      },
      {
        id: "buy",
        header: "Buy",
        width: 100,
        template: '<div class="buyButton" style="cursor:pointer;">BUY</div>',
      },
    ];
  }
  private _getOnClickConfig() {
    return {
      webix_inp_counter_prev(e, id: { column: string; row: string }): void {
        var item = this.getItem(id.row);
        item[id.column] = (item[id.column] || 1) - 1;
        this.updateItem(id.row);
      },
      webix_inp_counter_next(e, id: { column: string; row: string }): void {
        var item = this.getItem(id.row);
        item[id.column] = 1 + item[id.column] || 2;
        this.updateItem(id.row);
      },
      buyButton(e, id: { column: string; row: string }): void {
        const BaseView: BaseView = this.$scope.getParentView();
        const clickedItem: IProductItem = this.getItem(id.row);
        BaseView.bagButton.updateBagCount(+clickedItem.amount || 1);

        webix.message(
          `${clickedItem.amount || 1} ${clickedItem.company} ${
            clickedItem.model
          } added to your bag`
        );
      },
    };
  }
}
