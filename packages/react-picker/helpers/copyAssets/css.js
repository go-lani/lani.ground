/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const root = path.resolve();
const SOURCE_CSS_DIR = 'src/styles';
const DESTINATION_CSS_DIR = 'dist/styles';
const SOURCE_CSS_PATH = path.join(root, SOURCE_CSS_DIR);
const DESTINATION_CSS_PATH = path.join(root, DESTINATION_CSS_DIR);

// dist/styles 디렉토리가 없으면 생성
if (!fs.existsSync(DESTINATION_CSS_PATH)) {
  fs.mkdirSync(DESTINATION_CSS_PATH, { recursive: true });
}

// 초기 복사
fs.copySync(SOURCE_CSS_PATH, DESTINATION_CSS_PATH);

// CSS 파일 변경 감시
const watcher = chokidar.watch(SOURCE_CSS_PATH, {
  ignored: /(^|[\/\\])\../, // 숨김 파일 무시
  persistent: true,
});

const log = console.log.bind(console);

watcher
  .on('add', (path) => log(`File ${path} has been added`))
  .on('change', (path) => {
    log(`File ${path} has been changed`);
    fs.copySync(SOURCE_CSS_PATH, DESTINATION_CSS_PATH);
  })
  .on('unlink', (path) => log(`File ${path} has been removed`));

process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});
