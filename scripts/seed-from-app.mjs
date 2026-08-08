#!/usr/bin/env node
// One-time migration: extracts the hardcoded recipe arrays that currently
// live in src/App.jsx and inserts them into db/recipes.db. Safe to re-run —
// it wipes and reinserts every time rather than trying to diff.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, CHAPTERS, CHAPTER_ORDER } from './db.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const APP_JSX = path.join(ROOT, 'src', 'App.jsx');

function extractArray(source, arrayName) {
  const start = source.indexOf(`const ${arrayName} = [`);
  if (start === -1) throw new Error(`Could not find ${arrayName} in App.jsx`);
  const bracketStart = source.indexOf('[', start);
  const end = source.indexOf('\n];', start);
  if (end === -1) throw new Error(`Could not find the end of ${arrayName} in App.jsx`);
  const literal = source.slice(bracketStart, end + 2); // include the closing ']'
  // The array literal is plain JS (strings/numbers/booleans) — safe to eval
  // since it's our own tracked source file, not external input.
  return new Function(`return (${literal});`)();
}

const source = fs.readFileSync(APP_JSX, 'utf8');
const db = openDb();

db.exec('DELETE FROM recipe_photos');
db.exec('DELETE FROM recipes');

const insertRecipe = db.prepare(
  `INSERT INTO recipes (dish_id, chapter, name, date, region, note, tilt, sort_order)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
);
const insertPhoto = db.prepare(
  `INSERT INTO recipe_photos (recipe_id, photo_path, caption, sort_order) VALUES (?, ?, ?, ?)`
);

let totalRecipes = 0;
for (const chapterKey of CHAPTER_ORDER) {
  const { arrayName } = CHAPTERS[chapterKey];
  const dishes = extractArray(source, arrayName);

  dishes.forEach((d, i) => {
    const info = insertRecipe.run(
      d.id,
      chapterKey,
      d.name,
      d.date ?? '',
      d.region ?? null,
      d.note,
      d.tilt,
      i
    );
    const recipeId = info.lastInsertRowid;
    d.photos.forEach((photoPath, j) => {
      insertPhoto.run(recipeId, photoPath, d.captions?.[j] ?? null, j);
    });
    totalRecipes++;
  });

  console.log(`Seeded ${dishes.length} recipes for ${chapterKey}`);
}

db.close();
console.log(`Done. ${totalRecipes} recipes total in db/recipes.db`);
