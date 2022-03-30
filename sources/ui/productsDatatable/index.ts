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
    _onItemDblClick(clickedProduct: { row: string; column: string }) {
      if (clickedProduct.column !== "amount") {
        const clickedProductItem: IProductItem = this.getItem(
          clickedProduct.row
        );
        const windowHead: string = `${clickedProductItem.company} ${clickedProductItem.model}`;
        this._createProductWindowAndShow(windowHead);
      }
    },
    _viewCheckIn(): void {
      const BaseView: BaseView = this.$scope;
      BaseView.productsDatatable = this;
    },
  },
  webix.ui.datatable
);
