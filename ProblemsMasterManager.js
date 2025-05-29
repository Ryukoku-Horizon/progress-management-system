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
        this.problemsMasterSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetById(problemsMasterSheetId);
        if (!this.problemsMasterSheet) {
            throw new Error(`ID ${problemsMasterSheetId} のシートが見つかりません。`);
        }
        this.problemsData = this.problemsMasterSheet.getDataRange().getValues();
        // ヘッダー行を除いてデータを取得
        this.problemsData =  this.problemsData.slice(1);
        if (!this.problemsData) {
            throw new Error(`ID ${problemsMasterSheetId} のシートにデータがありません。`);
        }
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

    /**
     * 優先度でソートされた問題名とカテゴリのマップを返します。
     *
     * @param {boolean} [reverse=false] - trueの場合は優先度の降順、falseの場合は昇順でソートします。
     * @param {boolean} [only_enable=true] - trueの場合は有効な問題のみ、falseの場合はすべての問題を含めます。
     * @returns {Map<string, string>} キーが問題名、値がカテゴリのマップを返します。
     */
    getProblemsList(reverse = false, only_enable = true) {
        // 問題データのコピーを作成
        this.sortedData = this.problemsData.slice();
        // 優先度でソート
        if (!reverse) { // reverseがfalseの場合は昇順
            this.sortedData.sort((a, b) => a[4] - b[4]);
        } else {    // reverseがtrueの場合は降順
            this.sortedData.sort((a, b) => b[4] - a[4]);
        }
        // 問題データを 名 : カテゴリ でマップに変換
        const problemsMap = new Map();
        for (let i = 0; i<this.sortedData.length; i++) {
            // 有効フラグが true の場合、または only_enable が false の場合にマップに追加
            if (this.sortedData[i][3] === true || !only_enable) {
                console.log("マップに追加");
                const problemName = this.sortedData[i][1]; // 問題名は2列目
                const problemCategory = this.sortedData[i][2]; // カテゴリは3列目
                problemsMap.set(problemName, problemCategory);
            }
        }
        return problemsMap;
    }
}
