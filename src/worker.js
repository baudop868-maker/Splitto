// Splitto API — Cloudflare Worker with static assets and a D1 database.
// Anyone who knows a group's code can read and edit that group (the link is the key),
// so codes are long and random, and every body is validated and size-limited.

const ID = /^[a-z0-9]{6,16}$/;
const CUR = /^[A-Z]{3}$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const CATS = ['food', 'stay', 'travel', 'shop', 'fun', 'bills', 'other'];
const MODES = ['equal', 'shares', 'exact'];
const MAX_ITEMS = 2000;
const MAX_MEMBERS = 50;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
const fail = (status, error) => json({ error }, status);

const str = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
const optStr = (v, max) => v === undefined || v === '' || (typeof v === 'string' && v.length <= max);
const numOk = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;

function checkMeta(m) {
  if (!m || typeof m !== 'object') return 'meta';
  if (!str(m.name, 60)) return 'name';
  if (!CUR.test(m.currency || '')) return 'currency';
  if (!Array.isArray(m.members) || m.members.length < 1 || m.members.length > MAX_MEMBERS) return 'members';
  const ids = new Set();
  for (const p of m.members) {
    if (!p || !ID.test(p.id || '') || ids.has(p.id) || !str(p.name, 30)) return 'member';
    if (!optStr(p.iban, 40) || !optStr(p.paypal, 40) || !optStr(p.satispay, 20)) return 'member';
    ids.add(p.id);
  }
  return null;
}
const cleanMeta = m => ({
  name: m.name.trim(),
  currency: m.currency,
  created: numOk(m.created, 0, 1e14) ? m.created : Date.now(),
  members: m.members.map(p => {
    const o = { id: p.id, name: p.name.trim() };
    for (const k of ['iban', 'paypal', 'satispay']) if (p[k]) o[k] = String(p[k]).trim();
    return o;
  }),
});

function checkSplit(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  const keys = Object.keys(s);
  return keys.length > 0 && keys.length <= MAX_MEMBERS && keys.every(k => ID.test(k) && numOk(s[k], 0, 1e9));
}
function checkItem(kind, d) {
  if (!d || typeof d !== 'object') return 'body';
  if (kind === 'expenses') {
    if (!str(d.desc, 80) || !numOk(d.amount, 0.01, 1e9) || !CUR.test(d.currency || '') || !numOk(d.rate, 1e-7, 1e7)) return 'expense';
    if (!ID.test(d.payer || '') || !CATS.includes(d.cat) || !MODES.includes(d.mode) || !checkSplit(d.split)) return 'expense';
    if (!DAY.test(d.date || '') || !numOk(d.ts, 0, 1e14) || !optStr(d.addedBy, 16)) return 'expense';
    if (d.editedAt !== undefined && !numOk(d.editedAt, 0, 1e14)) return 'expense';
    return null;
  }
  if (!ID.test(d.from || '') || !ID.test(d.to || '') || d.from === d.to || !numOk(d.amount, 0.01, 1e9)) return 'payment';
  if (!DAY.test(d.date || '') || !numOk(d.ts, 0, 1e14)) return 'payment';
  return null;
}
const pick = (kind, d) =>
  kind === 'expenses'
    ? { desc: d.desc.trim(), amount: d.amount, currency: d.currency, rate: d.rate, payer: d.payer, cat: d.cat, mode: d.mode, split: d.split, date: d.date, ts: d.ts, addedBy: d.addedBy || '', ...(d.editedAt ? { editedAt: d.editedAt } : {}) }
    : { from: d.from, to: d.to, amount: d.amount, date: d.date, ts: d.ts };

let ready = null;
function migrate(db) {
  ready ??= db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS groups (id TEXT PRIMARY KEY, meta TEXT NOT NULL, created INTEGER NOT NULL, updated INTEGER NOT NULL)'),
    db.prepare('CREATE TABLE IF NOT EXISTS items (group_id TEXT NOT NULL, kind TEXT NOT NULL, id TEXT NOT NULL, data TEXT NOT NULL, updated INTEGER NOT NULL, PRIMARY KEY (group_id, kind, id))'),
  ]).catch(e => { ready = null; throw e; });
  return ready;
}

async function readBody(req, limit) {
  const text = await req.text();
  if (text.length > limit) throw new Error('too_large');
  return JSON.parse(text);
}
// Version = groups.updated; strictly increasing so clients can poll cheaply.
const bump = (db, id) => db.prepare('UPDATE groups SET updated = MAX(updated + 1, ?) WHERE id = ?').bind(Date.now(), id);

async function api(req, env, parts) {
  const db = env.DB;
  await migrate(db);
  const method = req.method;

  // POST /api/groups
  if (parts.length === 1 && parts[0] === 'groups' && method === 'POST') {
    const body = await readBody(req, 16000);
    const bad = checkMeta(body.meta);
    if (bad) return fail(400, bad);
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    const abc = 'abcdefghijkmnpqrstuvwxyz23456789';
    const id = [...bytes].map(b => abc[b % abc.length]).join('');
    const now = Date.now();
    await db.prepare('INSERT INTO groups (id, meta, created, updated) VALUES (?, ?, ?, ?)').bind(id, JSON.stringify(cleanMeta(body.meta)), now, now).run();
    return json({ id }, 201);
  }

  if (parts[0] !== 'groups' || !ID.test(parts[1] || '')) return fail(404, 'not_found');
  const gid = parts[1];
  const group = await db.prepare('SELECT meta, updated FROM groups WHERE id = ?').bind(gid).first();
  if (!group) return fail(404, 'not_found');

  // GET /api/groups/:id[?v=version]
  if (parts.length === 2 && method === 'GET') {
    const v = new URL(req.url).searchParams.get('v');
    if (v && Number(v) === group.updated) return new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
    const { results } = await db.prepare('SELECT kind, id, data FROM items WHERE group_id = ?').bind(gid).all();
    const out = { meta: JSON.parse(group.meta), exp: {}, pay: {}, v: group.updated };
    for (const r of results) (r.kind === 'expenses' ? out.exp : out.pay)[r.id] = JSON.parse(r.data);
    return json(out);
  }

  // PUT /api/groups/:id/meta
  if (parts.length === 3 && parts[2] === 'meta' && method === 'PUT') {
    const body = await readBody(req, 16000);
    const bad = checkMeta(body);
    if (bad) return fail(400, bad);
    await db.batch([db.prepare('UPDATE groups SET meta = ? WHERE id = ?').bind(JSON.stringify(cleanMeta(body)), gid), bump(db, gid)]);
    return json({ ok: true });
  }

  // PUT|DELETE /api/groups/:id/(expenses|payments)/:itemId
  if (parts.length === 4 && (parts[2] === 'expenses' || parts[2] === 'payments') && ID.test(parts[3])) {
    const kind = parts[2], iid = parts[3];
    if (method === 'DELETE') {
      await db.batch([db.prepare('DELETE FROM items WHERE group_id = ? AND kind = ? AND id = ?').bind(gid, kind, iid), bump(db, gid)]);
      return json({ ok: true });
    }
    if (method === 'PUT') {
      const body = await readBody(req, 8000);
      const bad = checkItem(kind, body);
      if (bad) return fail(400, bad);
      const count = await db.prepare('SELECT COUNT(*) AS n FROM items WHERE group_id = ?').bind(gid).first('n');
      if (count >= MAX_ITEMS) return fail(409, 'group_full');
      await db.batch([
        db.prepare('INSERT INTO items (group_id, kind, id, data, updated) VALUES (?, ?, ?, ?, ?) ON CONFLICT (group_id, kind, id) DO UPDATE SET data = excluded.data, updated = excluded.updated')
          .bind(gid, kind, iid, JSON.stringify(pick(kind, body)), Date.now()),
        bump(db, gid),
      ]);
      return json({ ok: true });
    }
  }
  return fail(405, 'method_not_allowed');
}

const PAGES = ['/', '/dividere-spese-viaggio/', '/dividere-spese-coinquilini/', '/dividere-conto-ristorante/', '/en/split-trip-expenses/', '/en/split-rent-roommates/', '/privacy/', '/chi-siamo/'];

const SECURITY = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
};

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/robots.txt')
      return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${url.origin}/sitemap.xml\n`, { headers: { 'content-type': 'text/plain' } });
    if (url.pathname === '/sitemap.xml') {
      const urls = PAGES.map(p => `<url><loc>${url.origin}${p}</loc></url>`).join('');
      return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'content-type': 'application/xml' } });
    }
    if (url.pathname.startsWith('/api/')) {
      // Only same-origin browser writes.
      if (req.method !== 'GET') {
        const origin = req.headers.get('origin');
        if (origin && origin !== url.origin) return fail(403, 'forbidden');
      }
      try {
        const res = await api(req, env, url.pathname.slice(5).split('/').filter(Boolean));
        for (const [k, v] of Object.entries(SECURITY)) res.headers.set(k, v);
        return res;
      } catch (e) {
        if (e instanceof SyntaxError || e.message === 'too_large') return fail(400, 'bad_body');
        console.error(e);
        return fail(500, 'server_error');
      }
    }
    const res = await env.ASSETS.fetch(req);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
    return out;
  },
};
