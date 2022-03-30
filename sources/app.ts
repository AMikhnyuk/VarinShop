import { JetApp, HashRouter, IJetApp } from "webix-jet";
import { IJetAppConfig } from "./interfaces/jet-types-fixes";

export default class MyApp extends JetApp implements IJetApp {
  constructor(config) {
    const defaults: IJetAppConfig = {
      router: HashRouter,
      debug: true,
      start: "topView.index/productsView.index",
    };

    super({ ...defaults, ...config });
  }
}
//
webix.ready(() => new MyApp({}).render());
