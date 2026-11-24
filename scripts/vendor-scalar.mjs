/**
 * Copies Scalar's standalone API reference script into static/vendor/scalar/, so the page /api-reference serves it from
 * this site and loads nothing from a CDN. npm checks the package's integrity when it downloads it.
 *
 *   node scripts/vendor-scalar.mjs 1.76.2
 *
 * Then change SCALAR_VERSION in src/pages/api-reference.js and delete the old file.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('Usage: node scripts/vendor-scalar.mjs <exact version, e.g. 1.76.2>');
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), 'scalar-'));
try {
  execFileSync('npm', ['pack', `@scalar/api-reference@${version}`, '--pack-destination', work], { stdio: 'inherit' });
  execFileSync('tar', ['-xzf', join(work, `scalar-api-reference-${version}.tgz`), '-C', work]);
  const pkg = join(work, 'package');
  // The source map is not shipped: drop its comment so browsers do not ask for it.
  const script = readFileSync(join(pkg, 'dist/browser/standalone.js'), 'utf8').replace(/\n?\/\/# sourceMappingURL=\S+\s*$/, '\n');
  const out = join(process.cwd(), 'static/vendor/scalar');
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, `api-reference-${version}.js`), script);
  // The package ships no LICENSE file: record the licence it declares.
  const { license } = JSON.parse(readFileSync(join(pkg, 'package.json'), 'utf8'));
  const text = existsSync(join(pkg, 'LICENSE')) ? readFileSync(join(pkg, 'LICENSE'), 'utf8')
    : `@scalar/api-reference ${version}, licence: ${license}. Source: https://github.com/scalar/scalar\n`;
  writeFileSync(join(out, 'LICENSE'), text);
  console.log(`static/vendor/scalar/api-reference-${version}.js (${(script.length / 1e6).toFixed(1)} MB)`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
