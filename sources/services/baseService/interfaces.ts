import { IBaseData } from "sources/data/interfaces";
import { actionTypes } from "../../enums/actionTypes";

export interface IBaseService {
  getBaseData(actionType: actionTypes): IBaseData;
}
