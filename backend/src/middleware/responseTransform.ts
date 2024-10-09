import { plainToInstance } from 'class-transformer';
import { Response, Request, NextFunction } from 'express';

/**
 * Middleware para conversão de dados.
 */
export function responseTransform(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const oldJson = res.json;

  res.json = function (data: any): Response {
    if (data && typeof data === 'object') {
      const transformedData = Array.isArray(data)
        ? data.map((item) => plainToInstance(item.constructor, item))
        : plainToInstance(data.constructor, data);
      return oldJson.call(this, transformedData);
    } else {
      return oldJson.call(this, data);
    }
  };

  next();
}
