#!/usr/bin/env node
// Reads db/recipes.db and writes src/generated/recipes.json, which App.jsx
// imports at build time. This file is gitignored — it's regenerated on
// every `npm run dev` / `npm run build` from the SQLite file, which is the
// source of truth checked into git.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, CHAPTERS, CHAPTER_ORDER } from './db.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(ROOT, 'src', 'generated');
const OUT_PATH = path.join(OUT_DIR, 'recipes.json');

const db = openDb();

const result = {};
for (const chapterKey of CHAPTER_ORDER) {
  const { arrayName } = CHAPTERS[chapterKey];
  const recipes = db.prepare(
    `SELECT id, dish_id, name, date, region, note, tilt
     FROM recipes WHERE chapter = ? ORDER BY sort_order ASC, id ASC`
  ).all(chapterKey);

  const photoStmt = db.prepare(
    `SELECT photo_path, caption FROM recipe_photos WHERE recipe_id = ? ORDER BY sort_order ASC, id ASC`
  );

  result[arrayName] = recipes.map((r) => {
    const photos = photoStmt.all(r.id);
    const entry = {
      id: r.dish_id,
      name: r.name,
      date: r.date ?? '',
      photos: photos.map((p) => p.photo_path),
      note: r.note,
      tilt: r.tilt,
    };
    if (photos.length > 1) {
      entry.dual = true;
      entry.captions = photos.map((p) => p.caption ?? '');
    }
    if (r.region) entry.region = r.region;
    return entry;
  });
}

// Recipes aren't necessarily inserted in date order (e.g. backfilled entries,
// or recipes pushed out of order), so pick the most recent by the recipe's
// own `date` field ("MM.DD.YY") rather than by row id / insertion order.
function parseRecipeDate(dateStr) {
  if (!dateStr) return null;
  const [mm, dd, yy] = dateStr.split('.').map(Number);
  if (!mm || !dd || !yy) return null;
  return new Date(2000 + yy, mm - 1, dd).getTime();
}

const allRows = db.prepare(
  `SELECT id, dish_id, chapter, name, date, region, note, created_at
   FROM recipes`
).all();

const latestRow = allRows.reduce((latest, row) => {
  const rowTime = parseRecipeDate(row.date);
  if (rowTime === null) return latest;
  if (!latest) return row;
  const latestTime = parseRecipeDate(latest.date);
  if (rowTime > latestTime) return row;
  if (rowTime === latestTime && row.id > latest.id) return row;
  return latest;
}, null) ?? allRows.reduce((latest, row) => (!latest || row.id > latest.id ? row : latest), null);

if (latestRow) {
  const photos = db.prepare(
    `SELECT photo_path FROM recipe_photos WHERE recipe_id = ? ORDER BY sort_order ASC, id ASC`
  ).all(latestRow.id);
  const totalCount = db.prepare(`SELECT COUNT(*) AS c FROM recipes`).get().c;

  result.LATEST = {
    id: latestRow.dish_id,
    chapter: latestRow.chapter,
    name: latestRow.name,
    date: latestRow.date ?? '',
    region: latestRow.region ?? null,
    note: latestRow.note,
    photo: photos[0]?.photo_path ?? null,
    totalCount,
  };
}

db.close();

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
console.log(`Wrote ${OUT_PATH}`);
