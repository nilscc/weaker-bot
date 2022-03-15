import * as tell from './commands/tell.js';
import { client } from './db.js';

function say(channel, message) {
    console.log('<' + channel + '> ' + message);
}

tell.create('from', 'to', 'test test');

const c = client();
await c.query('insert into tells (date, "from", "to", message) values ($1, $2, $3, $4)',
    [ new Date('2021/12/24 20:00:00'), 'from', 'to', 'Merry Chrismas.' ]);
await c.end();

tell.checkUnread('#test', 'from', say);
tell.checkUnread('#test', 'to', say);
