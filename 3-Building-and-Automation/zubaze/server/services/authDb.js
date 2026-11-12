/**
 * Auth credential store (SQLite via better-sqlite3).
 *
 * This is the ONLY module that knows about the credential database, so it can
 * be swapped for Postgres/another store later without touching the routes.
 *
 * NOTE (production): the default path is a local file. On ephemeral hosts
 * (e.g. Railway without a volume) this will not persist — set AUTH_DB_PATH to
 * a mounted volume, or replace this module with a Postgres implementation.
 */

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH =
  process.env.AUTH_DB_PATH || path.join(__dirname, '..', 'data', 'auth.db');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS auth_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    user_type TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`);

function createAuthUser({ id, email, passwordHash, userType, name }) {
  db.prepare(
    `INSERT INTO auth_users (id, email, password_hash, user_type, name, created_at)
     VALUES (@id, @email, @password_hash, @user_type, @name, @created_at)`
  ).run({
    id,
    email,
    password_hash: passwordHash,
    user_type: userType,
    name,
    created_at: Date.now(),
  });
  return getAuthUserById(id);
}

function getAuthUserByEmail(email) {
  return db.prepare(`SELECT * FROM auth_users WHERE email = ?`).get(email);
}

function getAuthUserById(id) {
  return db.prepare(`SELECT * FROM auth_users WHERE id = ?`).get(id);
}

module.exports = { createAuthUser, getAuthUserByEmail, getAuthUserById };
