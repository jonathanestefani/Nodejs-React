import { IErrorCustomization } from '../interfaces/IErrorCustomization';

export class ErrorCustomization extends Error {
  public name: string = '';
  public errors: IErrorCustomization[] = [];

  constructor(message: string, errors: any[]) {
    super(message); // Chama o construtor da classe pai (Error) com a mensagem de erro
    this.name = this.constructor.name; // Define o nome da exceção como o nome da classe
    this.errors = errors; // Armazena o array de objetos na propriedade 'errors'
    Error.captureStackTrace(this, this.constructor); // Captura o stack trace
  }

  public getMessages(): Object {
    let response: any = {};
    let messages = this.errors;

    messages.forEach((value: any) => {
      Object.keys(value).map((item: any) => {
        if (response[item] == undefined) {
          response[item] = [];
        }

        if (typeof value[item] == "object") response[item] = value[item]
        else if (Array.isArray(value[item])) response[item].push(...value[item]);
        else response[item].push(value[item]);
      });
    });

    return response;
  }
}
