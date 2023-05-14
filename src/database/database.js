import {Low} from'lowdb';
import { JSONFile } from 'lowdb/node'
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

let db;
const __dirname = dirname(fileURLToPath(import.meta.url))
export async function createConnection(){
    const file = join(__dirname, '../db.json');
    const adapter = new JSONFile(file);
    const defaultData = {tasks:[]}
    db = new Low(adapter, defaultData);

    // Read data from JSON file, this will set db.data content
    // If JSON file doesn't exist, defaultData is used instead
    await db.read();

    db.data ||= {tasks:[]};

    await db.write();
}

export const getConnection= ()=>db;