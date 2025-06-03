class NameListManager {
    /**
     * コンストラクター: NameListManagerのインスタンスを初期化する
     * 引数の各種インデックスは1から始まる列番号を想定している（スプレッドシートのインデックスと合わせるため）
     * 
     * @param {string} nameListSheetId - データを読み込むスプレッドシートのID
     * @param {number} numberColIndex - 番号が記載されている列のインデックス
     * @param {number} nameColIndex - 名前が記載されている列のインデックス
     * @param {number} campusColIndex - キャンパス情報が記載されている列のインデックス
     * @throws {Error} シートが見つからない、またはデータが空の場合にエラーをスロー
     */
    constructor(nameListSheetId, numberColIndex, nameColIndex, campusColIndex) {
        this.nameListSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetById(nameListSheetId);
        if (!this.nameListSheet) {
            throw new Error(`ID ${nameListSheetId} のシートが見つかりません。`);
        }
        this.nameListData = this.nameListSheet.getDataRange().getValues();
        // ヘッダー行を除いてデータを取得
        this.nameListData = this.nameListData.slice(1); 
        if (this.nameListData.length === 0) {
            throw new Error(`ID ${nameListSheetId} のシートにデータがありません。`);
        }

        // 配列のインデックスに合わせるために1引く
        this.numberColIndex = numberColIndex-1;
        this.nameColIndex = nameColIndex-1;
        this.campusColIndex = campusColIndex-1;
    }

    /**
     * 指定された学籍番号に対応する学生の名前を取得する
     * 
     * @param {string} studentNumber - 検索する学生の学籍番号
     * @returns {string|null} 学生の名前。該当する学生が見つからない場合はnull
     */
    getName(studentNumber) {
        studentNumber = studentNumber.toUpperCase(); // 大文字に変換
        for (let i = 0; i<this.nameListData.length; i++) {
            const row = this.nameListData[i];
            // 必ず大文字同士で比較
            if (row[this.numberColIndex].toUpperCase() === studentNumber) {
                // 学籍番号が一致したら名前を返す
                return row[this.nameColIndex];
            }
        }
        // 該当する学生番号が見つからない場合はnullを返す
        return null;
    }

    /**
     * 指定された学籍番号に対応する学生のキャンパス情報を取得する
     * 
     * @param {string} studentNumber - 検索する学生の学籍番号
     * @returns {string|null} 学生のキャンパス情報。該当する学生が見つからない場合はnull
     */
    getCampus(studentNumber) {
        studentNumber = studentNumber.toUpperCase(); // 大文字に変換
        for (let i = 0; i<this.nameListData.length; i++) {
            const row = this.nameListData[i];
            // 必ず大文字同士で比較
            if (row[this.numberColIndex].toUpperCase() === studentNumber) {
                // 学籍番号が一致したら学舎を返す
                return row[this.campusColIndex];
            }
        }
        // 該当する学生番号が見つからない場合はnullを返す
        return null;
    }
}