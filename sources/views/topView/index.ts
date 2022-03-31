import { IBaseData } from "sources/data/interfaces";
import { actionTypes } from "../../enums/actionTypes";
import BaseView from "views/baseView";
import "../../ui/topToolbar/components/bagButton/index";

export default class TopView extends BaseView {
  config() {
    return {
      rows: [
        {
          view: "topToolbar",
          css: "topToolbar",
          height: 50,
          isLogginedUser: true,
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
    }
  }
}
