const fs = require("fs");
const path = require("path");
const glob = require("glob");

const pageRoot = path.resolve(__dirname, "../../ai-brand-review/sass/page");
const useHeader = '@use "../../foundation/import" as *;';

const pageDirs = fs.readdirSync(pageRoot).filter((dir) => {
  const fullPath = path.join(pageRoot, dir);
  return fs.statSync(fullPath).isDirectory();
});

pageDirs.forEach((pageName) => {
  const blockDir = path.join(pageRoot, pageName, "block");

  console.log(`📁 ${pageName}: ${blockDir}`);

  let scssFiles = [];
  if (fs.existsSync(blockDir)) {
    scssFiles = glob.sync(path.join(blockDir, "_*.scss"));
  }

  const useStatements = scssFiles.map((file) => {
    const basename = path.basename(file, ".scss").replace(/^_/, "");
    return `@use "./block/${basename}";`;
  });

  const outputPath = path.join(pageRoot, pageName, `${pageName}.scss`);
  const outputContent = [useHeader, ...useStatements].join("\n") + "\n";

  fs.writeFileSync(outputPath, outputContent);
  console.log(`✅ ${pageName}.scss を生成しました`);
});
