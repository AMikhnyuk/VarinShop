import { routes } from "../../enums/routes";
import BaseView from "views/baseView";

export default class MakeOrderView extends BaseView {
  config() {
    return {
      cols: [
        { view: "productsTree" },
        {
          view: "button",
          value: "checkout",
          click: () => {
            this.app.show(routes.HISTORYVIEW);
          },
        },
      ],
    };
  }
}
