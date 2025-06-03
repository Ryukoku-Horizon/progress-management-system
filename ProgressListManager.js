class ProgressListManager {
    /**
     * Googleスプレッドシートの進捗データを管理するProgressListManagerインスタンスを生成します。
     *
     * @param {number} sheetId - 対象シートのID。
     * @param {number} problemIdRowIndex - 問題IDが記載されている行の1始まりのインデックス。
     * @param {number} problemNameRowIndex - 問題名が記載されている行の1始まりのインデックス。
     * @param {number} studentNumberColIndex - 学生番号の1始まりの列インデックス。
     * @param {number} studentNameColIndex - 学生名の1始まりの列インデックス。
     * @param {number} studentCampusColIndex - 学生キャンパス情報の1始まりの列インデックス。
     * @param {number} startFromColIndex - 進捗データが始まる1始まりの列インデックス。
     * @throws {Error} 指定したIDのシートが見つからない場合に発生します。
     */
    constructor(sheetId, problemIdRowIndex, problemNameRowIndex, studentNumberColIndex, studentNameColIndex, studentCampusColIndex, startFromColIndex) {
        this.progressSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetById(sheetId);
        if (!this.progressSheet) {
            throw new Error(`ID ${sheetId} のシートが見つかりません。`);
        }
        // 高速化のため、検索はリストを用いて実行する
        this.progressData = this.progressSheet.getDataRange().getValues();
        // すべてのインデックスを0ベースに調整
        this.studentNumberColIndex = studentNumberColIndex - 1;
        this.problemIdRowIndex = problemIdRowIndex - 1;
        this.problemNameRowIndex = problemNameRowIndex - 1;
        this.studentNameColIndex = studentNameColIndex - 1;
        this.studentCampusColIndex = studentCampusColIndex - 1;
        this.startFromColIndex = startFromColIndex - 1;
    }

    /**
     * 指定した学生番号が進捗データ内のどの行にあるかを検索するヘルパー関数です。
     * 大文字・小文字を区別せずに比較します。
     *
     * @param {string} studentNumber - 検索する学生番号。
     * @returns {number} 学生番号が含まれる行のインデックス。見つからない場合は-1を返します。
     */
    _findStudentNumberRow(studentNumber) {
        for (let i = 0; i < this.progressData.length; i++) {
            // 大文字小文字を区別せずに比較するため、toUpperCase()を使用
            if (this.progressData[i][this.studentNumberColIndex].toUpperCase() === studentNumber.toUpperCase()) {
                return i; // 学生番号が見つかった行を返す
            }
        }
        return -1; // 見つからない場合は-1を返す
    }

    /**
     * 指定した問題IDが進捗データ内のどの列にあるかを検索するヘルパー関数です。
     *
     * @param {string} problemId - 検索する問題ID。
     * @returns {number} 問題IDが含まれる列のインデックス。見つからない場合は-1を返します。
     */
    _findProblemIdColumn(problemId) {
        for (let i = this.startFromColIndex; i < this.progressData[0].length; i++) {
            if (this.progressData[this.problemIdRowIndex][i] === problemId) {
                return i; // 問題IDが見つかった列を返す
            }
        }
        return -1; // 見つからない場合は-1を返す
    }

    registerProgress(studentNumber, studentName, studentCampus, problemId, problemName) {
        let studentRow = this._findStudentNumberRow(studentNumber);
        if (studentRow === -1) {
            // 学生番号が見つからない場合は新規行を追加
            studentRow = this.progressSheet.getLastRow();   // 新規行のため +1
            this.progressSheet.getRange(studentRow, this.studentNumberColIndex+1).setValue(studentNumber);
            this.progressSheet.getRange(studentRow, this.studentNameColIndex+1).setValue(studentName);
            this.progressSheet.getRange(studentRow, this.studentCampusColIndex+1).setValue(studentCampus);
        } else {
            // スプレッドシートのために1始まりのインデックスに変換
            studentRow += 1;
            // 学生番号が見つかった場合は既存の行を更新
            this.progressSheet.getRange(studentRow, this.studentNameColIndex+1).setValue(studentName);
            this.progressSheet.getRange(studentRow, this.studentCampusColIndex+1).setValue(studentCampus);
        }

        let problemCol = this._findProblemIdColumn(problemId);
        if (problemCol === -1) {
            // 問題IDが見つからない場合は新規列を追加
            problemCol = this.progressSheet.getLastColumn() + 1; // 新規列のため +1
            this.progressSheet.getRange(this.problemIdRowIndex + 1, problemCol).setValue(problemId);
            this.progressSheet.getRange(this.problemNameRowIndex + 1, problemCol).setValue(problemName);
        } else {
            // スプレッドシートのために1始まりのインデックスに変換
            problemCol += 1;
            // 問題IDが見つかった場合は既存の列を更新
            this.progressSheet.getRange(this.problemNameRowIndex + 1, problemCol).setValue(problemName);
        }

        // 進捗データを更新
        this.progressSheet.getRange(studentRow, problemCol).setValue(nowDate); // 現在日時を設定
    }
 }