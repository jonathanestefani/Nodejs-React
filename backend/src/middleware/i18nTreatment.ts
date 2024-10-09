import express from 'express';
import i18n from '../i18n';

/**
 * Middleware para identificação de idioma.
 */
const i18nTreatment = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const language = req.headers['accept-language'] || 'pt';
  i18n.setLocale(language);
  next();
};

export default i18nTreatment;
