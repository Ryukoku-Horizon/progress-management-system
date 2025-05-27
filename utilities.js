/**
 * 指定したシートIDのシートからキーと値のペアを取得します。
 * 各行の1列目をキー、2列目を値として使用します。
 * キーと値の両方が存在する行のみを対象とし、値は必ず文字列型で格納されます。
 *
 * @param {number} sheetId - データを取得するシートのID
 * @returns {Object.<string, string>} シートから取得したキーと値のオブジェクト
 */
function _getKeyAndValuesFromSheet(sheetId) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetById(sheetId);
    const data = sheet.getDataRange().getValues();
    const obj = {};
    for (let i = 0; i < data.length; i++) {
        // 各行の１番目のセルをキー、２番目のセルを値としてオブジェクトに格納
        // ただし、キーと値が両方とも存在する場合のみ格納する
        const key = data[i][0];
        const value = data[i][1];
        if (key && value) {
            // 必ず文字列型で格納する
            obj[key] = String(value);
        }
    }
    return obj;
}

/**
 * ハードコードされたIDの設定シートから設定値を取得します。
 * 設定値はヘルパー関数 `_getKeyAndValuesFromSheet` を使って取得されます。
 *
 * @returns {Object.<string, string>} 設定シートから取得したキーと値のペア
 */
function getSettings() {
    // 設定シートに格納された設定値は例外的にIDをハードコード
    const sheetId = 1218501673;
    return _getKeyAndValuesFromSheet(sheetId);
}

/**
 * 指定したシートIDのシートからフォーム設定を取得します。
 * 設定値はヘルパー関数 `_getKeyAndValuesFromSheet` を使って取得されます。
 *
 * @param {number} sheetId - 設定を取得するシートのID
 * @returns {Object.<string, string>} フォーム設定のキーと値のペア
 */
function getFormSettings(sheetId) {
    return _getKeyAndValuesFromSheet(sheetId);
}