import { routes } from "../../../../enums/routes";
import TopView from "views/topView";
import { IJetApp } from "webix-jet";
import { authFormTypes } from "../../../../enums/authFormTypes";
import { IAuthButtonConfig } from "./interfaces";

webix.protoUI(
  {
    name: "authButton",
    defaults: {
      template({ value }) {
        return `<div class="authButton item pointer">${value}</div>`;
      },
    },
    $init(config: IAuthButtonConfig): void {
      this.$ready.unshift(() => this._viewCheckIn());
      config.onClick = {
        authButton: this._onAuthButtonClick,
      };
    },
    updateLabel(value: string): void {
      this.setValues({ value });
    },
    _onAuthButtonClick(): void {
      const TopView: TopView = this.$scope;
      const App: IJetApp = TopView.app;
      if (this.config.authButtonType === authFormTypes.LOGIN) {
        App.show(routes.AUTHVIEW + `?type=${authFormTypes.REGISTER}`);
      } else {
        App.show(routes.AUTHVIEW + `?type=${authFormTypes.LOGIN}`);
      }
    },

    _viewCheckIn(): void {
      const TopView: TopView = this.$scope;
      TopView.authButton = this;
    },
  },
  webix.ui.template
);
