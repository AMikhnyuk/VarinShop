export interface IAuthButton extends webix.ui.template {
  updateLabel(value: string): void;
  config: IAuthButtonConfig;
}
export interface IAuthButtonConfig extends webix.ui.templateConfig {
  authButtonType: string;
}
