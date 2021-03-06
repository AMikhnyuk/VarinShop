import TopView from "views/topView";

webix.protoUI(
  {
    name: "greetingsLabel",
    defaults: {
      template({ name }) {
        if (name) {
          return `<div class="greetingsLabel item">Hello, ${name}</div>`;
        } else {
          return "";
        }
      },
    },
    $init(config: webix.ui.templateConfig): void {
      this.$ready.unshift(() => this._viewCheckIn());
    },
    sayHello(name: string) {
      this.setValues({ name });
    },
    _viewCheckIn(): void {
      const TopView: TopView = this.$scope;
      TopView.greetingsLabel = this;
    },
  },
  webix.ui.template
);
