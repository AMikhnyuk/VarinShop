import getBaseService from "../../services/baseService";
import { IProductsDatatable } from "../../ui/productsDatatable/interfaces";
import { JetView } from "webix-jet";
import "../../ui/topToolbar/index";
import "../../ui/productsTree/index";
import "../../ui/productsDatatable/index";
import "../../ui/datatableTotalCount/index";
import "../../ui/topToolbar/components/authButton/index";
import "../../ui/topToolbar/components/greeatingsLabel/index";
import { IProductsTree } from "../../ui/productsTree/interfaces";
import { IBagButton } from "sources/ui/topToolbar/components/bagButton/interfaces";
import { IBaseData } from "sources/data/interfaces";
import { IBaseService } from "sources/services/baseService/interfaces";
import { IDatatableTotalCount } from "sources/ui/datatableTotalCount/interfaces";
import { IGreetingsLabel } from "sources/ui/topToolbar/components/greeatingsLabel/interfaces";
import { IAuthButton } from "sources/ui/topToolbar/components/authButton/interfaces";

export default class BaseView extends JetView {
  productsDatatable: IProductsDatatable;
  productsTree: IProductsTree;
  bagButton: IBagButton;
  greetingsLabel: IGreetingsLabel;
  datatableTotalCount: IDatatableTotalCount;
  authButton: IAuthButton;
  public loadData(baseData: IBaseData) {
    const { productsData, bagData, historyData } = baseData;
    if (productsData) {
      this.productsDatatable.loadData(productsData);
      this.productsTree.loadData(productsData);
    }
    if (bagData) {
      this.productsDatatable.loadData(bagData);
      this.productsTree.loadData(bagData);
      this.datatableTotalCount.sumValuesAndSetCount(bagData);
    }
    if (historyData) {
      this.productsDatatable.loadData(historyData);
      this.productsTree.loadData(historyData);
    }
  }
  public getBaseService(): IBaseService {
    return getBaseService();
  }
}
