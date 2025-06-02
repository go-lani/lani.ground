/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const root = path.resolve();
const SOURCE_CSS_DIR = 'src/styles';
const DESTINATION_CSS_DIR = 'dist/styles';
const SOURCE_CSS_PATH = path.join(root, SOURCE_CSS_DIR);
const DESTINATION_CSS_PATH = path.join(root, DESTINATION_CSS_DIR);

// dist/styles 디렉토리가 없으면 생성
if (!fs.existsSync(DESTINATION_CSS_PATH)) {
  fs.mkdirSync(DESTINATION_CSS_PATH, { recursive: true });
}

// CSS 파일들을 복사
fs.copySync(SOURCE_CSS_PATH, DESTINATION_CSS_PATH);

process.on('SIGINT', () => {
  process.exit(0);
});
