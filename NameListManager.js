class NameListManager {
    /**
     * コンストラクター: NameListManagerのインスタンスを初期化する
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

        this.numberColIndex = numberColIndex;
        this.nameColIndex = nameColIndex;
        this.campusColIndex = campusColIndex;
    }
}