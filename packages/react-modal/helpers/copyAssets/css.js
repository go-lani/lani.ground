/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const watcher = chokidar.watch('public/css');

const log = console.log.bind(console);

const root = path.resolve();
const ASSET_DIR = 'public/';
const DESTINATION_ASSET_DIR = 'dist/assets';
const ASSET_PATH = path.join(root, ASSET_DIR);
const DESTINATION_ASSETS_PATH = path.join(root, DESTINATION_ASSET_DIR);

watcher.on('change', (path) => {
  log(`File ${path} has been changed`);
  fs.copySync(ASSET_PATH, DESTINATION_ASSETS_PATH);
});

process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});
