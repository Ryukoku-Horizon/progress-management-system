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

    /**
     * 問題名から対応する問題IDを取得します。
     * 
     * @param {string} problemName - 検索する問題の名前
     * @returns {string|null} 問題IDが見つかった場合はその値、見つからない場合はnull
     */
    getProblemId(problemName) {
        for (let i = 0; i<this.problemsData.length; i++) {
            if (this.problemsData[i][1] === problemName) {  // 問題名は2列目
                return this.problemsData[i][0]; // 問題IDは1列目
            }
        }
        // 見つからない場合nullを返す
        return null;
    }

    /**
     * 問題IDから対応する問題の優先度を取得します。
     * 
     * @param {string} problemId - 検索する問題のID
     * @returns {string|null} 問題IDが見つかった場合はその優先度、見つからない場合はnull
     */
    getProblemPriority(problemId) {
        for (let i = 0; i<this.problemsData.length; i++) {
            if (this.problemsData[i][0] === problemId) {  // 問題IDは1列目
                return this.problemsData[i][4]; // 優先度は5列目
            }
        }
        // 見つからない場合nullを返す
        return null;
    }
}
