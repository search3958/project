// zhiiliu-service.mjs
import fs from 'fs/promises';

console.log("--- zhiiliu-service.mjs が起動しました ---");

// 変数やロジックの定義
export const init = async () => {
    console.log("初期化関数が呼び出されました。ファイルを生成します...");
    try {
        await fs.writeFile('test.txt', 'これは zhiiliu-service.mjs から生成されたテストファイルです。', 'utf-8');
        console.log("✅ test.txt を保存しました。");
    } catch (err) {
        console.error("❌ ファイルの保存に失敗しました:", err);
    }
};

// 読み込まれただけで実行したい処理
(async function() {
    console.log("自動実行ロジックが動作中...");
    // 読み込みと同時に作成したい場合はここでも呼べる
    // await init(); 
})();