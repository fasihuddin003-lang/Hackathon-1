import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';

console.log('creating db...');
const db = new Database(':memory:');
console.log('db created');

console.log('calling betterAuth...');
const auth = betterAuth({ 
  database: db, 
  emailAndPassword: { enabled: true },
});
console.log('auth created:', typeof auth);
