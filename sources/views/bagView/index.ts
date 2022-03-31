import { IBagItem, IBaseData } from "sources/data/interfaces";
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
              css: "productsDatatable",
              localId: "productsView:productsDatatable",

              columns: this._getBagTableColumns(),
              onClick: this._getDatatableOnClick(),
            },
            {
              view: "datatableTotalCount",
              height: 50,
            },
            {
              cols: [
                {
                  view: "button",
                  value: "Make order",
                  click: () => {
                    this.app.show(routes.MAKEORDERVIEW);
                  },
                  width: 200,
                },
                {},
              ],
            },
          ],
          gravity: 4,
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
      {
        id: "image",
        header: "Image",
        adjust: true,
        template:
          "<div class='image'><img class='image_content' src='#image#'></div>",
      },
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
        adjust: true,
      },
      { id: "price", header: "Price", width: 100 },
      { id: "sum", header: "Sum", width: 100 },
      {
        id: "remove",
        header: "",
        adjust: true,
        template:
          '<i class="webix_icon wxi-trash trashButton" style="cursor:pointer;"></i>',
      },
    ];
  }
  private _getDatatableOnClick(): {} {
    return {
      trashButton(event: PointerEvent, item: { row: string; column: string }) {
        this.remove(item.row);
        const BagView: BagView = this.$scope;
        const currentDatatableData: Array<IBagItem> = Object.values(
          this.data.pull
        );
        BagView.datatableTotalCount.sumValuesAndSetCount(currentDatatableData);
        return false;
      },
    };
  }
}
