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
          height: 50,
        },
        {
          $subview: true,
        },
      ],
    };
  }
}
