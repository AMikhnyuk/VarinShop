type deliveryType = "Master" | "Additional";
type paymentType = "Card" | "Cash";
type statusType = "In progress" | "Completed" | "Declined";

export interface IProductItem {
  $height?: number;
  amount: number | string;
  image?: string;
  id: string;
  company: string;
  model: string;
  category: string;
  price: string;
  rating: string;
}
export interface IBagItem {
  id: string;
  company: string;
  model: string;
  category: string;
  price: string;
  rating: string;
}
export interface IHistoryItem {
  id: string;
  company: string;
  model: string;
  category: string;
  amount: string;
  address: string;
  dilivery: deliveryType;
  payment: paymentType;
  orderDate: string;
  status: statusType;
}
export interface IBaseData {
  productsData?: Array<IProductItem>;
  bagData?: Array<IBagItem>;
  historyData?: Array<IHistoryItem>;
}
