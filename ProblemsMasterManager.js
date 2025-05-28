class ProblemMasterManager {
    /**
     * ProblemsMasterManager クラスのインスタンスを生成します。
     * 問題マスターシートを初期化し、ヘッダー行を除いたデータを読み込みます。
     *
     * @param {string|number} problemsMasterSheetId - アクティブなスプレッドシートから取得するシートのID。
     * @throws {Error} 指定したIDのシートが見つからない場合にスローされます。
     * @throws {Error} シートにデータが存在しない場合にスローされます。
     */
    constructor(problemsMasterSheetId) {
        this.problemsMasterSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetById(problemsMasterSheetId)
        if (!this.problemsMasterSheet) {
            throw new Error(`ID ${problemsMasterSheetId} のシートが見つかりません。`);
        }
        this.problemsData = this.problemsMasterSheet.getDataRange().getValues();
        if (!this.problemsData) {
            throw new Error(`ID ${problemsMasterSheetId} のシートにデータがありません。`);
        }
        // ヘッダー行を除いてデータを取得
        this.problemsData =  this.problemsData.slice(1);
    }
}
