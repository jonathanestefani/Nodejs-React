import connectDatabase from './data-source';

export const connectDatabaseIniciatize = async () =>
  await connectDatabase.initialize();
