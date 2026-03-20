#!/usr/bin/env node
// Compress images from an input folder into an output folder (lossless PNG compression).
// Also renames files/dirs with a cleaner slugified naming convention.
// Usage:
//   npm run compress-images
//   npm run compress-images -- _images _images-compressed

const fs = require('fs').promises;
const path = require('path');
const imagemin = require('imagemin').default;
const imageminOptipng = require('imagemin-optipng');

const rawArgs = process.argv.slice(2);
const quiet = rawArgs.includes('--quiet');
const dryRun = rawArgs.includes('--dry-run');
const cleanArgs = rawArgs.filter((a) => a !== '--quiet' && a !== '--dry-run');

const inputDir = cleanArgs[0] || '_images';
const outputDir = cleanArgs[1] || '_images-compressed';

const supportedExtensions = new Set(['.png']);
const usedDestPaths = new Set();

function slugify(name) {
  const ext = path.extname(name);
  const base = name.slice(0, name.length - ext.length);

  const slug = base
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug ? `${slug}${ext}` : name;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getUniqueDestPath(destPath) {
  let candidate = destPath;
  const dir = path.dirname(destPath);
  const ext = path.extname(destPath);
  const base = path.basename(destPath, ext);

  let counter = 1;
  while (usedDestPaths.has(candidate) || (await fileExists(candidate))) {
    candidate = path.join(dir, `${base}-${counter}${ext}`);
    counter += 1;
  }

  usedDestPaths.add(candidate);
  return candidate;
}

async function compressFile(srcPath, destPath) {
  const ext = path.extname(srcPath).toLowerCase();

  const stats = await fs.stat(srcPath);
  const originalSize = stats.size;

  if (supportedExtensions.has(ext)) {
    const buffer = await fs.readFile(srcPath);
    const compressed = await imagemin.buffer(buffer, {
      plugins: [imageminOptipng({ optimizationLevel: 3 })],
    });

    if (!dryRun) {
      await fs.writeFile(destPath, compressed);
    }

    return {
      compressed: true,
      originalSize,
      newSize: compressed.length,
    };
  }

  if (!dryRun) {
    await fs.copyFile(srcPath, destPath);
  }

  return {
    compressed: false,
    originalSize,
    newSize: originalSize,
  };
}

function addTotals(a, b) {
  return {
    files: a.files + b.files,
    compressedFiles: a.compressedFiles + b.compressedFiles,
    originalBytes: a.originalBytes + b.originalBytes,
    newBytes: a.newBytes + b.newBytes,
  };
}

async function walkAndCompress(srcDir, destDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  let totals = { files: 0, compressedFiles: 0, originalBytes: 0, newBytes: 0 };

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const safeName = slugify(entry.name);
    const destPath = path.join(destDir, safeName);

    if (entry.isDirectory()) {
      await ensureDir(destPath);
      const childTotals = await walkAndCompress(srcPath, destPath);
      totals = addTotals(totals, childTotals);
      continue;
    }

    const uniqueDestFile = await getUniqueDestPath(destPath);
    await ensureDir(path.dirname(uniqueDestFile));

    const { compressed, originalSize, newSize } = await compressFile(srcPath, uniqueDestFile);
    totals.files += 1;
    totals.originalBytes += originalSize;
    totals.newBytes += newSize;
    if (compressed) totals.compressedFiles += 1;

    const relPath = path.relative(process.cwd(), uniqueDestFile);
    const relSrc = path.relative(process.cwd(), srcPath);

    if (!quiet) {
      if (safeName !== entry.name) {
        console.log(`${compressed ? '✔' : '·'} ${relSrc} → ${relPath}`);
      } else {
        console.log(`${compressed ? '✔' : '·'} ${relPath}`);
      }
    }
  }

  return totals;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

(async () => {
  try {
    const absInput = path.resolve(process.cwd(), inputDir);
    const absOutput = path.resolve(process.cwd(), outputDir);

    await ensureDir(absOutput);

    console.log(`Compressing images from ${absInput} → ${absOutput}`);
    if (dryRun) {
      console.log('Dry run enabled; no files will be written.');
    }

    const totals = await walkAndCompress(absInput, absOutput);

    const saved = totals.originalBytes - totals.newBytes;
    const savedPct = totals.originalBytes ? (saved / totals.originalBytes) * 100 : 0;

    console.log('---');
    console.log(`Processed ${totals.files} files (${totals.compressedFiles} compressed).`);
    console.log(`Size: ${(totals.originalBytes / 1024).toFixed(1)} KB → ${(totals.newBytes / 1024).toFixed(1)} KB (${savedPct.toFixed(1)}% saved)`);
    console.log('Done. Review the output folder before replacing the originals.');
  } catch (error) {
    console.error('Error compressing images:', error);
    process.exit(1);
  }
})();
