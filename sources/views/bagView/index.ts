import { IBaseData } from "sources/data/interfaces";
import { actionTypes } from "../../enums/actionTypes";
import BaseView from "views/baseView";
import { routes } from "../../enums/routes";

export default class BagView extends BaseView {
  config() {
    return {
      cols: [
        { view: "productsTree" },
        {
          rows: [
            {
              view: "productsDatatable",
              localId: "productsView:productsDatatable",

              columns: this._getBagTableColumns(),
            },
            {
              view: "datatableTotalCount",
            },
            {
              view: "button",
              value: "Make order",
              click: () => {
                this.app.show(routes.MAKEORDERVIEW);
              },
            },
          ],
          gravity: 2,
        },
      ],
    };
  }
  public init(): void {
    const { getBaseData } = this.getBaseService();
    const baseDataByBagType: IBaseData = getBaseData(actionTypes.BAG);
    this.loadData(baseDataByBagType);
  }
  private _getBagTableColumns(): {}[] {
    return [
      { id: "image", header: "Image", adjust: true },
      {
        id: "name",
        header: "Name",
        template: "#company# #model#",
        adjust: true,
        fillspace: true,
      },

      {
        id: "amount",
        header: "Amount",
        width: 300,
        template: "{common.counter()}",
        adjust: true,
      },
      { id: "price", header: "Price", adjust: true },
      { id: "sum", header: "Sum", adjust: true },
      {
        id: "remove",
        header: "",
        adjust: true,
        template:
          '<i class="webix_icon wxi-trash" style="cursor:pointer;"></i>',
      },
    ];
  }
}
