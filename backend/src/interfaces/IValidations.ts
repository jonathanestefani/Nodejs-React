import { EMethod, IRepository } from "../depencies";
import { ErrorCustomization } from "../exception/ErrorCustomization";
import { IErrorCustomization } from "./IErrorCustomization";

export interface IValidations {
  messages: IErrorCustomization[];
  execute(data: any, repository: IRepository, method?: EMethod): Promise<ErrorCustomization | boolean>;
}