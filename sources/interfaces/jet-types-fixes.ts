import {
  IJetApp,
  IWebixFacade,
  IJetRouterFactory,
  IHash,
} from "webix-jet/dist/types/interfaces";

export interface IJetAppConfig {
  id?: string;
  debug?: boolean;
  app?: IJetApp;
  name?: string;
  version?: string;
  start?: string;
  webix?: IWebixFacade;
  container?: HTMLElement | string;
  animation?: boolean;
  router?: IJetRouterFactory;
  views?: Function | IHash;
}
