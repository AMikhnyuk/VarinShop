import { IBaseData } from "sources/data/interfaces";
import BASEDATA from "../../data/index";
import { actionTypes } from "../../enums/actionTypes";
import { IBaseService } from "./interfaces";

function getBaseData(actionType: actionTypes): IBaseData {
  const { productsData, bagData, historyData, user } = BASEDATA as IBaseData;
  switch (actionType) {
    case actionTypes.PRODUCTS:
      return { productsData };
    case actionTypes.BAG:
      return { bagData };
    case actionTypes.HISTORY:
      return { historyData };
    case actionTypes.TOP:
      return { bagData, user: null };
  }
}

export default function getBaseService(): IBaseService {
  return {
    getBaseData(actionType: actionTypes): IBaseData {
      return getBaseData(actionType);
    },
  };
}
