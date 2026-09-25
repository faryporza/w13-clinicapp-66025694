import 'dotenv/config';
import { getSqlPool } from './db.js';

const sqlQuery = process.argv.slice(2).join(' ') || 'SELECT * FROM doctors;';

async function main() {
  try {
    const pool = await getSqlPool();
    const result = await pool.request().query(sqlQuery);
    console.log(`\n Executed SQL: ${sqlQuery}\n`);
    if (result.recordset && result.recordset.length > 0) {
      console.table(result.recordset);
    } else {
      console.log(' (No rows returned or command completed)');
    }
    process.exit(0);
  } catch (error) {
    console.error(' Query Error:', error.message);
    process.exit(1);
  }
}

main();
