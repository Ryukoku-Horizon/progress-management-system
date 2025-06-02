class FormResponseManager {
    constructor(formResponseSheetId, e) {
        this.responseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetById(formResponseSheetId);
        if (!this.responseSheet) {
            throw new Error(`ID ${formResponseSheetId} のシートが見つかりません。`);
        }
        this.e = e;
        if (!e) {
            throw new Error('イベントオブジェクトが正しくありません。');
        }
        this.namedValues = e.namedValues;
    }

    getStudentNumber() {
        // メールアドレスから@までの部分を抜き出す->学籍番号
        return this.namedValues['メールアドレス'][0].split('@')[0];
    }

    getTimestamp() {
        // フォームの送信日時を取得
        return this.namedValues['タイムスタンプ'][0]; // 1列目がタイムスタンプ
    }

    addNameAndCampus(name, nameColIndex, campus, campusColIndex) {
        // 名前とキャンパス情報をフォーム回答シートに追記
        const lastRow = this.responseSheet.getLastRow();
        this.responseSheet.getRange(lastRow, nameColIndex).setValue(name);
        console.log(`${lastRow},${nameColIndex}: ${this.responseSheet.getRange(lastRow, nameColIndex).getValue()}`)
        this.responseSheet.getRange(lastRow, campusColIndex).setValue(campus);
        console.log(`${lastRow},${campusColIndex}: ${this.responseSheet.getRange(lastRow, campusColIndex).getValue()}`)
    }
}