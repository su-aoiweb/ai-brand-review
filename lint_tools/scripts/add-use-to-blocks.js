const fs = require("fs");
const path = require("path");
const glob = require("glob");

const targetPattern = "../template_hp_static/sass/page/**/block/_*.scss";
const useStatement = '@use "../../../foundation/import" as *;';

glob(targetPattern, (err, files) => {
  if (err) {
    console.error("❌ globエラー:", err);
    return;
  }

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");

    // すでにuseがある場合はスキップ
    if (content.includes("foundation/import")) {
      console.log(`⏩ すでに記述あり: ${file}`);
      return;
    }

    const newContent = `${useStatement}\n${content}`;
    fs.writeFileSync(file, newContent);
    console.log(`✅ 追加完了: ${file}`);
  });

  console.log("✨ 全ファイル処理完了");
});
