export interface IBagButton extends webix.ui.template {
  updateBagCount(number: number): void;
  getCurrentBagCount(): string;
}
