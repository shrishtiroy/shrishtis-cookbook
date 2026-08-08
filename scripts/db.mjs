import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const DB_PATH = path.join(ROOT, 'db', 'recipes.db');
const SCHEMA_PATH = path.join(ROOT, 'db', 'schema.sql');

export const CHAPTERS = {
  showstoppers: { arrayName: 'SHOWSTOPPERS', idPrefix: 'ss', folder: 'showstoppers' },
  'college-meals': { arrayName: 'COLLEGE_MEALS', idPrefix: 'cm', folder: 'college-meals' },
  'healthy-recipes': { arrayName: 'HEALTHY_RECIPES', idPrefix: 'hr', folder: 'healthy-recipes' },
  'food-around-the-world': { arrayName: 'FOOD_AROUND_WORLD', idPrefix: 'fw', folder: 'food-around-the-world' },
  desserts: { arrayName: 'DESSERTS', idPrefix: 'ds', folder: 'desserts' },
};

export const CHAPTER_ORDER = [
  'showstoppers',
  'college-meals',
  'healthy-recipes',
  'food-around-the-world',
  'desserts',
];

export function openDb() {
  const db = new DatabaseSync(DB_PATH);
  db.exec(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  return db;
}
