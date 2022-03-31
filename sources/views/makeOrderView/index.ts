import { routes } from "../../enums/routes";
import BaseView from "views/baseView";
import { IBaseData } from "sources/data/interfaces";
import { actionTypes } from "../../enums/actionTypes";

export default class MakeOrderView extends BaseView {
  config() {
    return {
      cols: [
        { view: "productsTree" },

        {
          view: "form",
          elements: this._getFormElements(),
          elementsConfig: this._getFormElementsConfig(),
          rules: this._getFormRules(),
        },
      ],
    };
  }
  private _getFormElements(): {}[] {
    const root: MakeOrderView = this;
    return [
      {
        view: "text",
        name: "name",
        label: "Your Name",
        required: true,
        invalidMessage: "Your Name can not be empty",
      },
      {
        view: "text",
        name: "email",
        label: "Email",
        required: true,
        invalidMessage: "Incorrect email",
      },
      {
        view: "text",
        name: "phone",
        label: "Phone",
        required: true,
        invalidMessage: "Incorrect phone",
      },
      {
        view: "select",
        label: "Delivery type",
        options: [
          { id: "master", value: "Master" },
          { id: "additional", value: "Additional" },
        ],
      },
      {
        view: "text",
        label: "Delivery address",
        name: "address",
        required: true,
        invalidMessage: "Delivery Address can not be empty",
      },
      {
        view: "select",
        label: "Payment type",
        options: [
          { id: "card", value: "Card" },
          { id: "cash", value: "Cash" },
        ],
      },
      {
        view: "button",
        value: "Checkout",
        click() {
          const form: webix.ui.form = this.getFormView();
          if (form.validate()) {
            root.app.show(routes.HISTORYVIEW);
          }
        },
      },
    ];
  }
  private _getFormElementsConfig(): {} {
    return {
      labelWidth: 200,
      bottomPadding: 15,
    };
  }
  private _getFormRules() {
    return {
      name: webix.rules.isNotEmpty,
      email: (value: string): boolean => {
        return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          value
        );
      },
      phone: (value: string): boolean => {
        return /^\+?\d{3}\(?\d{2}\)?\d{3}-?\d{2}-?\d{2}$/.test(value);
      },
      address: webix.rules.isNotEmpty,
    };
  }
}
