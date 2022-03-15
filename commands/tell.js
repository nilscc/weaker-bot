import { client } from '../db.js'

export async function create(from, to, message) {
    const c = client();
    console.log("create message " + from + " -> " + to + ": " + message);

    await c.query('insert into tells ("from", "to", message) values ($1, $2, $3)',
        [ from, to, message ]);

    await c.end();
}

export async function checkUnread(user, say) {
    const c = client();
    const r = await c.query('select * from tells where lower("to") = $1', [user.toLowerCase()])

    for (let t of r.rows) {
        const ft = isToday(t.date) ? t.date.toLocaleTimeString() : t.date.toLocaleString();

        say(user + ': message from ' + t.from + ' (' + ft + '): ' + t.message);
        await c.query('delete from tells where id = $1', [t.id]);
    }

    await c.end();
}

function isToday(date) {
    const n = new Date();
    return date.getFullYear() == n.getFullYear() && date.getMonth() == n.getMonth() && date.getDate() == n.getDate();
}
