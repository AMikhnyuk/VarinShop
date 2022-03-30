import { routes } from "../../enums/routes";
import TopView from "views/topView";

webix.protoUI(
  {
    name: "topToolbar",
    $init(config: webix.ui.layoutConfig) {
      this.$ready.unshift(() => this._setLayout());
    },
    _setLayout(): void {
      this.cols_setter([
        this._getLogoTemplate(),
        {},
        this._getUserGreetingsTemplate(),
        {},
        this._getActionButtons(),
      ]);
    },
    _getLogoTemplate(): webix.ui.templateConfig {
      return {
        view: "template",
        type: "clean",
        template({ logo }) {
          return `<div class="logo">${logo || "Varin shop"}</div>`;
        },
        onClick: {
          logo: (): void => {
            const TopView: TopView = this.$scope;
            TopView.app.show(routes.PRODUCTSVIEW);
          },
        },
      };
    },
    _getUserGreetingsTemplate(): webix.ui.templateConfig {
      return {
        view: "template",
        type: "clean",
        template({ userName }) {
          return `Hi, ${userName || "User"}!`;
        },
      };
    },
    _getActionButtons() {
      return {
        type: "clean",
        cols: [
          {
            template: "Login",
            type: "clean",
          },
          {},
          {
            type: "clean",
            template: "History",
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
