import { DATABASE, DB_SEARCH_PATH } from './config.js';
import pg from 'pg';
const { Client } = pg;

export function client() {
    const client = new Client(DATABASE);
    client.connect();
    client.query('set search_path = ' + DB_SEARCH_PATH);
    return client;
}
