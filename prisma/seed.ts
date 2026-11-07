import { PrismaClient } from '@prisma/client';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { seedCatalog } = require('./seed-catalog.cjs') as {
  seedCatalog: (db: PrismaClient) => Promise<object>;
};
const db = new PrismaClient();

seedCatalog(db)
  .then(summary => console.log(JSON.stringify(summary)))
  .catch(() => { console.error('Catalog seed failed; details suppressed to protect database credentials.'); process.exitCode = 1; })
  .finally(() => db.$disconnect());
