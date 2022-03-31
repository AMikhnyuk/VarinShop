import { routes } from "../../enums/routes";
import TopView from "views/topView";
import "./style.scss";
import { authFormTypes } from "../../enums/authFormTypes";
import { ITopToolbarConfig } from "./components/interfaces";
webix.protoUI(
  {
    name: "topToolbar",
    defaults: {
      padding: 10,
    },
    $init(config: ITopToolbarConfig) {
      this.$ready.unshift(() => this._setLayout(config));
    },
    _setLayout(config: ITopToolbarConfig): void {
      const { isLogginedUser } = config;
      this.cols_setter([
        this._getLogoTemplate(isLogginedUser),
        {},
        this.getGreetingsLabel(isLogginedUser),
        {},
        this._getActionButtons(isLogginedUser),
      ]);
    },
    getGreetingsLabel(isLogginedUser: boolean): webix.ui.templateConfig {
      return {
        view: "greetingsLabel",
        type: "clean",
        hidden: !isLogginedUser,
      };
    },
    _getLogoTemplate(isLogginedUser: boolean): webix.ui.templateConfig {
      return {
        view: "template",
        type: "clean",
        template({ logo }) {
          return `<div class="logo item pointer">${logo || "Varin shop"}</div>`;
        },
        onClick: {
          logo: (): void => {
            if (isLogginedUser) {
              const TopView: TopView = this.$scope;
              TopView.app.show(routes.PRODUCTSVIEW);
            }
          },
        },
      };
    },
    _getActionButtons(isLogginedUser: boolean) {
      if (isLogginedUser) {
        return {
          type: "clean",
          cols: [
            {
              template: "<div class='logoutButton item pointer'>Logout</div>",
              type: "clean",
              onClick: {
                logoutButton() {
                  this.$scope.app.show(
                    routes.AUTHVIEW + `?type=${authFormTypes.LOGIN}`
                  );
                },
              },
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
      } else {
        return {
          view: "authButton",
          type: "clean",
          width: 100,
          authButtonType: authFormTypes.LOGIN,
        };
      }
    },
  },
  webix.ui.layout
);
