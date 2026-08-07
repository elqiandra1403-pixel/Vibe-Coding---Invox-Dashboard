const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const lightPath = path.join(projectRoot, 'Color Mode', 'Light.tokens.json');
const darkPath = path.join(projectRoot, 'Color Mode', 'Dark.tokens.json');

const lightJson = JSON.parse(fs.readFileSync(lightPath, 'utf8'));
const darkJson = JSON.parse(fs.readFileSync(darkPath, 'utf8'));

function flattenTokens(obj, prefix = '') {
  let res = {};
  for (const key in obj) {
    if (key.startsWith('$')) continue;
    const val = obj[key];
    const sanitizedKey = key.replace(/\s+/g, '-');
    const newPrefix = prefix ? `${prefix}-${sanitizedKey}` : sanitizedKey;
    if (val && typeof val === 'object') {
      if (val.$type === 'color' || (val.$value && val.$value.hex)) {
        let hex = val.$value.hex;
        if (val.$value.alpha !== undefined && val.$value.alpha < 1 && hex && hex.length === 7) {
          const alphaHex = Math.round(val.$value.alpha * 255).toString(16).padStart(2, '0').toUpperCase();
          hex = hex + alphaHex;
        }
        res[`--invox-${newPrefix}`] = hex;
      } else {
        Object.assign(res, flattenTokens(val, newPrefix));
      }
    }
  }
  return res;
}

const lightTokens = flattenTokens(lightJson);
const darkTokens = flattenTokens(darkJson);

let cssLines = [];
cssLines.push('/* Auto-generated from Color Mode JSON Tokens */\n');
cssLines.push(':root {');
for (const [varName, val] of Object.entries(lightTokens)) {
  cssLines.push(`  ${varName}: ${val};`);
}
cssLines.push('}\n');

cssLines.push('[data-theme="dark"] {');
for (const [varName, val] of Object.entries(darkTokens)) {
  cssLines.push(`  ${varName}: ${val};`);
}
cssLines.push('}');

fs.writeFileSync(path.join(projectRoot, 'styles', 'colors.css'), cssLines.join('\n'), 'utf8');
console.log('Successfully updated styles/colors.css with sanitized keys!');
