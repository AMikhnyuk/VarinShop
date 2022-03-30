import { IBagItem } from "sources/data/interfaces";
import BaseView from "views/baseView";

webix.protoUI(
  {
    name: "datatableTotalCount",
    defaults: {
      template({ totalCount }) {
        return `<div><div">Total:</div><div>${totalCount || "0"}</div></div>`;
      },
    },
    $init() {
      this.$ready.unshift(() => this._viewCheckIn());
    },
    sumValuesAndSetCount(bagData: Array<IBagItem>): void {
      let totalCount: number = 0;
      bagData.forEach((bagItem: IBagItem) => {
        totalCount += +bagItem.price;
      });
      this.setValues({ totalCount });
    },
    _viewCheckIn(): void {
      const BaseView: BaseView = this.$scope;
      BaseView.datatableTotalCount = this;
    },
  },
  webix.ui.template
);
