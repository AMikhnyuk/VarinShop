import { routes } from "../../../../enums/routes";
import TopView from "views/topView";
import { IJetApp } from "webix-jet";

webix.protoUI(
  {
    name: "bagButton",
    defaults: {
      template({ count }) {
        return `<div class="bagButton" style="cursor:pointer;">Bag(${
          count || "0"
        })</div>`;
      },
    },
    $init(config: webix.ui.templateConfig): void {
      this.$ready.unshift(() => this._viewCheckIn());
      config.onClick = {
        bagButton: this._onBagButtonClick,
      };
    },
    _onBagButtonClick() {
      const TopView: TopView = this.$scope;
      const App: IJetApp = TopView.app;
      App.show(routes.BAGVIEW);
    },
    updateBagCount(number: number): void {
      const { count } = this.getValues();
      if (count) {
        this.setValues({ count: count + number });
      } else {
        this.setValues({ count: number });
      }
    },
    getCurrentBagCount(): string {
      return this.getValues().count || "0";
    },
    _viewCheckIn(): void {
      const TopView: TopView = this.$scope;
      TopView.bagButton = this;
    },
  },
  webix.ui.template
);
