import ProductsView from "views/productsView";
import BaseView from "views/baseView";
import { IProductItem } from "sources/data/interfaces";
import "./style.scss";

webix.protoUI(
  {
    name: "productsDatatable",
    defaults: {
      type: {
        height: 200,
      },
    },
    $init(config: webix.ui.datatableConfig) {
      this.$ready.unshift(() => this._viewCheckIn());
      config.on = {
        onItemDblClick: this._onItemDblClick,
        onItemClick: this._onItemClick,
      };
    },
    _onItemClick(item: { column: string; row: string }) {
      if (item.column === "buy") {
        const BaseView: BaseView = this.$scope.getParentView();
        const clickedItem: IProductItem = this.getItem(item.row);
        BaseView.bagButton.updateBagCount(1);

        webix.message(
          `${"1"} ${clickedItem.company} ${clickedItem.model} added to your bag`
        );
      }
    },
    _createProductWindowAndShow(windowHead: string) {
      this.productPopup = webix
        .ui({
          view: "window",
          modal: true,
          close: true,
          head: windowHead,
          position: "center",
          body: {
            cols: [{ template: "Image" }, { template: "Info" }],
          },
          on: {
            onHide() {
              this.destructor();
            },
          },
        })
        .show();
    },
    loadData(data: Array<IProductItem>): void {
      const dataWithHeight = this._getDatatableDataWithHeight(data, 100);
      this.parse(dataWithHeight);
    },
    _getDatatableDataWithHeight(
      data: Array<IProductItem>,
      height: number
    ): Array<IProductItem> {
      const copiedData: Array<IProductItem> = webix.copy(data);
      copiedData.map((item) => {
        item.$height = height;
      });
      return copiedData;
    },
    _onItemDblClick(clickedProduct: { row: string }) {
      const clickedProductItem: IProductItem = this.getItem(clickedProduct.row);
      const windowHead: string = `${clickedProductItem.company} ${clickedProductItem.model}`;
      this._createProductWindowAndShow(windowHead);
    },
    _viewCheckIn(): void {
      const BaseView: BaseView = this.$scope;
      BaseView.productsDatatable = this;
    },
  },
  webix.ui.datatable
);
