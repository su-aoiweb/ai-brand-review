// lint_tools/scripts/generate-sass-index.js

const fs = require("fs");
const path = require("path");

// SCSS格納ディレクトリのパスを必要に応じて変更
const baseDir = path.resolve(__dirname, "../../template_hp_static/sass");
const targetDirs = ["reset", "foundation", "layout", "parts", "module"];

// _index に含めたくないファイル（ファイル名で指定）
const excludeFiles = ["_index.scss", "_root.scss"];

targetDirs.forEach((dirName) => {
  const dirPath = path.join(baseDir, dirName);
  const indexFilePath = path.join(dirPath, "_index.scss");

  if (!fs.existsSync(dirPath)) return;

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => {
      // アンダースコアで始まり .scss で終わるファイルのみ対象
      if (!file.startsWith("_") || !file.endsWith(".scss")) return false;
      // 除外リストに含まれるファイルはスキップ
      if (excludeFiles.includes(file)) return false;
      return true;
    })
    // 任意でソートして出力を安定化
    .sort();

  const forwardLines = files.map((file) => {
    const name = path.basename(file, ".scss").replace(/^_/, "");
    return `@forward "${name}";`;
  });

  fs.writeFileSync(indexFilePath, forwardLines.join("\n") + "\n");

  console.log(`✔ ${dirName}/_index.scss を生成しました (${files.length} 件)`);
});
