import { routes } from "../../../../enums/routes";
import TopView from "views/topView";
import { IJetApp } from "webix-jet";

webix.protoUI(
  {
    name: "authButton",
    defaults: {
      template({ isLoggined }) {
        return `<div class="authButton item pointer">${
          isLoggined ? "Logout" : "Login"
        }</div>`;
      },
    },
    $init(config: webix.ui.templateConfig): void {
      this.$ready.unshift(() => this._viewCheckIn());
      config.onClick = {
        authButton: this._onAuthButtonClick,
      };
    },
    updateLabel(isLoggined: boolean): void {
      this.setValues({ isLoggined });
    },
    _onAuthButtonClick(): void {
      const TopView: TopView = this.$scope;
      const App: IJetApp = TopView.app;
      App.show(routes.AUTHVIEW);
    },

    _viewCheckIn(): void {
      const TopView: TopView = this.$scope;
      TopView.authButton = this;
    },
  },
  webix.ui.template
);
