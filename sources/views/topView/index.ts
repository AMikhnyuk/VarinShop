import { IBaseData } from "sources/data/interfaces";
import { actionTypes } from "../../enums/actionTypes";
import BaseView from "views/baseView";
import "../../ui/topToolbar/components/bagButton/index";
import "../../ui/topToolbar/components/greeatingsLabel/index";
import "../../ui/topToolbar/components/authButton/index";

export default class TopView extends BaseView {
  config() {
    return {
      rows: [
        {
          view: "topToolbar",
          css: "topToolbar",
          height: 50,
        },
        {
          $subview: true,
        },
      ],
    };
  }
  public init(): void {
    const { getBaseData } = this.getBaseService();
    const baseDataByTopType: IBaseData = getBaseData(actionTypes.TOP);
    const { bagData, user } = baseDataByTopType;
    if (user) {
      this.greetingsLabel.sayHello(user.name);
      this.authButton.updateLabel(true);
    }
    this.bagButton.updateBagCount(bagData?.length);
  }
}
