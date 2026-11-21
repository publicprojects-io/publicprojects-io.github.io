// The theme picker loads one stylesheet at a time from /themes/, so every Lily
// default theme is published as a file. static/themes/ is generated: never edit it.
import { cp, mkdir, rm } from 'node:fs/promises';

const source = new URL('../node_modules/@lilydesignsystem/themes/dist/', import.meta.url);
const target = new URL('../static/themes/', import.meta.url);
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true, filter: (path) => !path.endsWith('.map') });
