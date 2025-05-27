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

function getSettings() {
    // 設定シートに格納された設定値は例外的にIDをハードコード
    const sheetId = 1218501673;
    return _getKeyAndValuesFromSheet(sheetId);
}

function getFormSettings(sheetId) {
    return _getKeyAndValuesFromSheet(sheetId);
}