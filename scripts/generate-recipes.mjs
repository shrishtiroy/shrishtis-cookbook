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

db.close();

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
console.log(`Wrote ${OUT_PATH}`);
