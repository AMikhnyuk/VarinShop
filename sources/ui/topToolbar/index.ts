import { routes } from "../../enums/routes";
import TopView from "views/topView";
import "./style.scss";
webix.protoUI(
  {
    name: "topToolbar",
    defaults: {
      padding: 10,
    },
    $init(config: webix.ui.layoutConfig) {
      this.$ready.unshift(() => this._setLayout());
    },
    _setLayout(): void {
      this.cols_setter([
        this._getLogoTemplate(),
        {},
        {
          view: "greetingsLabel",
          type: "clean",
        },
        {},
        this._getActionButtons(),
      ]);
    },
    _getLogoTemplate(): webix.ui.templateConfig {
      return {
        view: "template",
        type: "clean",
        template({ logo }) {
          return `<div class="logo item pointer">${logo || "Varin shop"}</div>`;
        },
        onClick: {
          logo: (): void => {
            const TopView: TopView = this.$scope;
            TopView.app.show(routes.PRODUCTSVIEW);
          },
        },
      };
    },
    _getActionButtons() {
      return {
        type: "clean",
        cols: [
          {
            view: "authButton",
            type: "clean",
          },
          {},
          {
            type: "clean",
            template: "<div class='item pointer'>History</div>",
          },
          {},
          {
            view: "bagButton",
            type: "clean",
          },
        ],
      };
    },
  },
  webix.ui.layout
);
