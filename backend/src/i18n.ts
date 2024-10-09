import * as i18n from 'i18n';

// configuração de internacionalização
i18n.configure({
  locales: ['pt', 'en'],
  directory: __dirname + '/locales/',
  defaultLocale: 'pt', // Local padrão
  queryParameter: 'language', // Nome do parâmetro de consulta para mudar o local
  autoReload: true, // Recarga automática dos arquivos de tradução em caso de mudanças
  syncFiles: true, // Sincroniza os arquivos de tradução com a configuração padrão
  cookie: 'language', // Nome do cookie que guarda a informação do local
  updateFiles: false,
  objectNotation: true,
});

export default i18n;
