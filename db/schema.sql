CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dish_id TEXT NOT NULL UNIQUE,      -- e.g. "ss12", "cm2b" — kept stable so page links don't break
  chapter TEXT NOT NULL,             -- showstoppers | college-meals | healthy-recipes | food-around-the-world | desserts
  name TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT '',
  region TEXT,                       -- food-around-the-world uses this instead of date for display
  note TEXT NOT NULL,
  tilt REAL NOT NULL,
  sort_order INTEGER NOT NULL,       -- position within its chapter
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS recipe_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  photo_path TEXT NOT NULL,          -- e.g. "/food-pics/desserts/tiramisu.JPG"
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_recipes_chapter ON recipes (chapter, sort_order);
CREATE INDEX IF NOT EXISTS idx_recipe_photos_recipe ON recipe_photos (recipe_id, sort_order);
