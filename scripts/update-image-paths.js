#!/usr/bin/env node
// Aggiorna riferimenti alle immagini in tutta la documentazione da _images/ a _images-compressed/.
// Uso:
//   node scripts/update-image-paths.js
//   node scripts/update-image-paths.js --dry-run  (per vedere cosa cambierebbe)

const fs = require('fs').promises;
const path = require('path');

const rootDir = process.cwd();
const targetGlob = 'docs';
const dryRun = process.argv.includes('--dry-run');

const markdownExt = new Set(['.md', '.mdx']);

function rewriteContent(content) {
  // Sostituisce tutti i percorsi _images/ in markdown o html o testo semplice
  return content.replace(/(\(|\[|\s|\"|\'|\=)\.?\/?_images\//g, (m)=>{
    return m.replace(/_images\//, '_images-compressed/');
  });
}

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!markdownExt.has(ext)) return null;

  const text = await fs.readFile(filePath, 'utf8');
  const updated = rewriteContent(text);
  if (updated !== text) {
    if (!dryRun) {
      await fs.writeFile(filePath, updated, 'utf8');
    }
    return { filePath, changed: true };
  }
  return null;
}

async function walkDir(dir) {
  let entries = await fs.readdir(dir, { withFileTypes: true });
  let changed = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const childChanges = await walkDir(entryPath);
      changed = changed.concat(childChanges);
      continue;
    }
    const result = await processFile(entryPath);
    if (result) changed.push(result);
  }
  return changed;
}

(async () => {
  try {
    const docsDir = path.join(rootDir, targetGlob);
    const stats = await fs.stat(docsDir);
    if (!stats.isDirectory()) {
      throw new Error(`${docsDir} non è una cartella`);
    }

    const changes = await walkDir(docsDir);
    console.log(`Aggiornati ${changes.length} file (dryRun=${dryRun})`);
    for (const c of changes) {
      console.log(` - ${c.filePath}`);
    }
    if (dryRun && changes.length > 0) {
      console.log('Esegui senza --dry-run per applicare le modifiche.');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
