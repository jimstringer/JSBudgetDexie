// db.ts
import AppDB from './AppDB';
import { populate } from './populate';

export const db = new AppDB();

db.on('populate', populate);

export function resetDatabase() {
  return db.transaction('rw', db.categorys, db.transactions, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
    //await populate();
  });
}
