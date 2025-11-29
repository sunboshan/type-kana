import { cpSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

mkdirSync(join(root, 'build'), { recursive: true });

cpSync(
  join(root, '.svelte-kit/output/client'),
  join(root, 'build'),
  { recursive: true }
);

cpSync(
  join(root, '.svelte-kit/output/prerendered/pages'),
  join(root, 'build'),
  { recursive: true }
);

console.log('✓ Build files copied to build/');
