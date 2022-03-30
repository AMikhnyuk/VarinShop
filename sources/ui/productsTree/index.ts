import { IProductItem } from "sources/data/interfaces";
import BaseView from "views/baseView";
import ProductsView from "views/productsView";
import { IProductsDatatable } from "../productsDatatable/interfaces";

webix.protoUI(
  {
    name: "productsTree",
    defaults: {
      select: true,
    },
    $init(config: webix.ui.datatableConfig) {
      this.$ready.unshift(() => this._viewCheckIn());
      config.on = {
        onAfterSelect: this._onAfterSelect,
      };
    },
    loadData(productsData: Array<IProductItem>) {
      this._prepareDataAndLoad(productsData);
    },
    _onAfterSelect(selctedTreeItemId: string): void {
      const productsView: ProductsView = this.$scope;
      const productsDatatable: IProductsDatatable =
        productsView.productsDatatable;
      const selctedTreeItem: { value: string; filter: boolean } =
        this.getItem(selctedTreeItemId);
      if (productsDatatable) {
        productsDatatable.filter(
          `#${selctedTreeItem.filter}#`,
          selctedTreeItem.value
        );
      }
    },
    _prepareDataAndLoad(productsData: Array<IProductItem>): void {
      productsData.forEach((product: IProductItem) => {
        const currentCategory = this._findOneInTree(product.category);
        const currentCompany = this._findOneInTree(product.company);
        if (!currentCategory) {
          const newCategoryId = this.add({
            value: product.category,
            filter: "category",
          });
          if (!currentCompany) {
            this.add(
              { value: product.company, filter: "company" },
              0,
              newCategoryId
            );
          }
        } else {
          if (!currentCompany) {
            this.add(
              { value: product.company, filter: "company" },
              0,
              currentCategory.id
            );
          }
        }
      });
    },
    _findOneInTree(findValue: string) {
      return this.data.find(
        (product: { value: string }) => product.value === findValue,
        true
      );
    },
    _viewCheckIn(): void {
      const BaseView: BaseView = this.$scope;
      BaseView.productsTree = this;
    },
  },
  webix.ui.tree
);
