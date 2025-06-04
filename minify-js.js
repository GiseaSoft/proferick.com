const fs = require('fs');
const path = require('path');
const terser = require('terser');

const inputDir = 'src/js';      // change this to your source folder
const outputDir = 'assets/js';    // change this to your output folder

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(async (file) => {
  if (file.endsWith('.js')) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    const code = fs.readFileSync(inputPath, 'utf8');
    const result = await terser.minify(code);
    fs.writeFileSync(outputPath, result.code);
    console.log(`Minified: ${file}`);
  }
});
