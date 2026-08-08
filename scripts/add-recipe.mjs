#!/usr/bin/env node
// Adds a new recipe to db/recipes.db, copies its photo into public/food-pics/,
// and regenerates src/generated/recipes.json so it shows up in `npm run dev`
// right away. Commit db/recipes.db (and the new photo) and push — Vercel
// rebuilds from the DB automatically.
//
// Usage:
//   node scripts/add-recipe.mjs --date "MM.DD.YY" --title "Dish Name" \
//     --description "Recipe note text" --image /path/to/photo.jpg --chapter showstoppers
//
// Chapters: showstoppers, college-meals, healthy-recipes, food-around-the-world, desserts
//
// --country (optional) — only used by food-around-the-world entries, shown
// in place of the date on that chapter's pages, e.g. --country korea

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, CHAPTERS } from './db.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      args[key] = argv[i + 1];
      i++;
    }
  }
  return args;
}

function slugify(title) {
  return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function randomTilt() {
  const magnitude = Number((Math.random() * 1.6 + 1).toFixed(1));
  return Math.random() < 0.5 ? -magnitude : magnitude;
}

export function addRecipe({ date, title, description, image, chapter, country, region }) {
  if (!title || !description || !image || !chapter) {
    throw new Error('title, description, image, and chapter are all required');
  }

  const chapterKey = chapter.trim().toLowerCase();
  const config = CHAPTERS[chapterKey];
  if (!config) {
    throw new Error(`Unknown chapter "${chapter}". Valid chapters: ${Object.keys(CHAPTERS).join(', ')}`);
  }

  const resolvedRegion = country ?? region ?? null;
  if (chapterKey === 'food-around-the-world' && !resolvedRegion && !date) {
    console.warn('Warning: no --country or --date given for a food-around-the-world entry — nothing will show in the date/country spot.');
  }
  if (chapterKey !== 'food-around-the-world' && !date) {
    throw new Error('date is required for this chapter');
  }

  if (!fs.existsSync(image)) {
    throw new Error(`Image not found at ${image}`);
  }

  const destDir = path.join(ROOT, 'public', 'food-pics', config.folder);
  const ext = path.extname(image);
  const destName = `${slugify(title)}${ext}`;
  const destPath = path.join(destDir, destName);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(image, destPath);
  const photoPath = `/food-pics/${config.folder}/${destName}`;

  const db = openDb();

  const maxSortRow = db.prepare(
    `SELECT COALESCE(MAX(sort_order), -1) AS m FROM recipes WHERE chapter = ?`
  ).get(chapterKey);
  const nextSort = maxSortRow.m + 1;

  const maxIdRow = db.prepare(
    `SELECT dish_id FROM recipes WHERE chapter = ? ORDER BY id DESC`
  ).all(chapterKey);
  const nums = maxIdRow
    .map(r => r.dish_id.match(new RegExp(`^${config.idPrefix}(\\d+)`)))
    .filter(Boolean)
    .map(m => parseInt(m[1], 10));
  const nextNum = nums.length ? Math.max(...nums) + 1 : 1;
  const dishId = `${config.idPrefix}${nextNum}`;

  const info = db.prepare(
    `INSERT INTO recipes (dish_id, chapter, name, date, region, note, tilt, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(dishId, chapterKey, title, date ?? '', resolvedRegion, description, randomTilt(), nextSort);

  db.prepare(
    `INSERT INTO recipe_photos (recipe_id, photo_path, caption, sort_order) VALUES (?, ?, ?, ?)`
  ).run(info.lastInsertRowid, photoPath, null, 0);

  db.close();

  return { id: dishId, photoPath };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const args = parseArgs(process.argv.slice(2));
    const result = addRecipe(args);
    console.log(`Added recipe "${args.title}" as ${result.id} with photo ${result.photoPath}`);
    console.log('Run `npm run dev` (or `node scripts/generate-recipes.mjs`) to see it, then commit db/recipes.db and the new photo.');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
