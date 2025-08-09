const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const viewsDir = path.join(__dirname, '..', 'server', 'views');
const outputDir = path.join(__dirname, '..');

const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  const template = fs.readFileSync(filePath, 'utf8');
  const html = ejs.render(template, {}, { filename: filePath });
  const outPath = path.join(outputDir, file.replace(/\.ejs$/, '.html'));
  fs.writeFileSync(outPath, html);
  console.log(`Rendered ${file} -> ${outPath}`);
});
