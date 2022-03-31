import { authFormTypes } from "../../enums/authFormTypes";
import { IFormConfigByType } from "./interfaces";
import BaseView from "views/baseView";

export default class AuthView extends BaseView {
  window: webix.ui.window;
  config() {
    return {
      rows: [
        {
          view: "topToolbar",
          css: "topToolbar",
          height: 50,
          isLogginedUser: false,
        },
        {
          view: "form",
          id: "authForm",
          elements: [],
          elementsConfig: {
            labelWidth: 200,
          },
          paddingY: 20,
          paddingX: 400,
        },
      ],
    };
  }
  urlChange() {
    const authFormType: authFormTypes = this.getParam("type", false);
    if (authFormType) {
      this._cereateForm(authFormType);
      this._updateAuthButton(authFormType);
    }
  }
  private _updateAuthButton(authFormType: authFormTypes) {
    switch (authFormType) {
      case authFormTypes.LOGIN:
        this.authButton.updateLabel("Login");
        this.authButton.config.authButtonType = authFormTypes.LOGIN;
        break;
      case authFormTypes.REGISTER:
        this.authButton.updateLabel("Register");
        this.authButton.config.authButtonType = authFormTypes.REGISTER;
        break;
    }
  }
  private _cereateForm(authFormType: authFormTypes): void {
    const formConfig: Array<IFormConfigByType> =
      this._getFormConfigByType(authFormType);
    webix.ui(formConfig, $$("authForm"));
  }
  private _getFormConfigByType(
    authFormType: authFormTypes
  ): Array<IFormConfigByType> {
    const head = (head: string): webix.ui.templateConfig => {
      return { template: head, type: "section" };
    };
    const email: webix.ui.textConfig = {
      view: "text",
      label: "E-Mail Address",
    };
    const password: webix.ui.textConfig = {
      view: "text",
      label: "Password",
    };
    const confirmPassword: webix.ui.textConfig = {
      view: "text",
      label: "Confirm Password",
    };
    const name: webix.ui.textConfig = {
      view: "text",
      label: "Name",
    };
    const button = (value: string): webix.ui.buttonConfig => {
      return {
        view: "button",
        value,
        width: 100,
      };
    };
    switch (authFormType) {
      case authFormTypes.LOGIN:
        return [
          head("Login"),
          email,
          password,
          { cols: [{}, button("Login")] },
        ];
      case authFormTypes.REGISTER:
        return [
          head("Register"),
          name,
          email,
          password,
          confirmPassword,
          { cols: [{}, button("Register")] },
        ];
    }
  }
}
