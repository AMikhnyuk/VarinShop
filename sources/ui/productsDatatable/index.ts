import ProductsView from "views/productsView";
import BaseView from "views/baseView";
import { IProductItem } from "sources/data/interfaces";
import "./style.scss";

webix.protoUI(
  {
    name: "productsDatatable",
    defaults: {
      type: {
        counter: (obj, common, value, column, index) => {
          let html =
            "<div class='webix_el_group' style='width:80px; height:32px;'>";
          html +=
            "<button type='button' class='webix_inp_counter_prev' tabindex='-1' >-</button>";
          html += `<input type='text' readonly class='webix_inp_counter_value' style='height:28px;' value="${
            value || "1"
          }"></input>`;
          html +=
            "<button type='button' class='webix_inp_counter_next' tabindex='-1'>+</button></div>";
          return html;
        },
      },
    },
    $init(config: webix.ui.datatableConfig) {
      this.$ready.unshift(() => this._viewCheckIn());
      config.on = {
        onItemDblClick: this._onItemDblClick,
      };
    },
    _createProductWindowAndShow(clickedProductItem: IProductItem) {
      this.productPopup = webix
        .ui({
          view: "window",
          css: "productsWindow",
          modal: true,
          close: true,
          width: 400,
          heaght: 600,
          head: clickedProductItem.name,
          position: "center",
          body: {
            cols: this._getProductWindowCols(clickedProductItem),
            padding: 20,
            margin: 20,
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
      const dataWithHeightAndName = this._getDatatableDataWithHeight(data, 100);
      this.parse(dataWithHeightAndName);
    },
    _getProductWindowCols(
      clickedProductitem: IProductItem
    ): Array<webix.ui.templateConfig> {
      const { image, name, rating, price } = clickedProductitem;
      return [
        {
          type: "clean",
          template: `<img class="image" src="${image}">`,
        },
        {
          type: "clean",
          template: `<div class="info">
          <div><strong>Name</strong>: ${name}</div>
          <div><strong>Price</strong>: ${price}</div>
          <div><strong>Rating</strong>: ${rating}</div>
          </div>`,
        },
      ];
    },
    _getDatatableDataWithHeight(
      data: Array<IProductItem>,
      height: number
    ): Array<IProductItem> {
      const copiedData: Array<IProductItem> = webix.copy(data);
      copiedData.map((item) => {
        const { company, model } = item;
        item.$height = height;
        item.name = `${company} ${model}`;
      });
      return copiedData;
    },
    _onItemDblClick(clickedProduct: { row: string; column: string }) {
      if (clickedProduct.column !== "amount") {
        const clickedProductItem: IProductItem = this.getItem(
          clickedProduct.row
        );
        this._createProductWindowAndShow(clickedProductItem);
      }
    },
    _viewCheckIn(): void {
      const BaseView: BaseView = this.$scope;
      BaseView.productsDatatable = this;
    },
  },
  webix.ui.datatable
);
