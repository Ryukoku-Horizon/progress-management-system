class FormResponseManager {
    /**
     * コンストラクタ - FormResponseManagerのインスタンスを初期化する
     * 
     * @param {string} formResponseSheetId - フォーム回答が格納されているスプレッドシートのID
     * @param {Object} e - フォーム送信イベントオブジェクト
     * @throws {Error} シートが見つからない、またはイベントオブジェクトが不正な場合にエラーをスロー
     */
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
        this.changedRange = e.range;
    }

    /**
     * メールアドレスから学籍番号を抽出する
     * 
     * @returns {string} メールアドレスの@より前の部分（学籍番号）
     */
    getStudentNumber() {
        // メールアドレスから@までの部分を抜き出す->学籍番号
        return this.namedValues['メールアドレス'][0].split('@')[0];
    }

    /**
     * フォームの送信日時を取得する
     * 
     * @returns {string} フォーム送信のタイムスタンプ
     */
    getTimestamp() {
        // フォームの送信日時を取得
        return this.namedValues['タイムスタンプ'][0]; // 1列目がタイムスタンプ
    }

    /**
     * 問題名を取得します。
     * 質問タイトルは指定が必要です。
     *
     * @param {string} questionTitle - 取得したい質問のタイトル
     * @returns {string} 指定された質問タイトルに対応する最初の回答（問題名）
     * @throws {Error} 指定された質問タイトルが見つからない場合にエラーをスローします。
     */
    getProblemName(questionTitle) {
        // 指定された質問タイトルから問題名を取得
        if (this.namedValues[questionTitle]) {
            return this.namedValues[questionTitle][0]; // 1つ目の回答を返す
        } else {
            throw new Error(`質問タイトル "${questionTitle}" が見つかりません。`);
        }
    }

    /**
     * 変更が発生した行の指定された列に、名前とキャンパス情報を追加します。
     *
     * @param {string} name - 追加する名前
     * @param {number} nameColIndex - 名前を挿入する列のインデックス
     * @param {string} campus - 追加するキャンパス情報
     * @param {number} campusColIndex - キャンパス情報を挿入する列のインデックス
     */
    addNameAndCampus(name, nameColIndex, campus, campusColIndex) {
        // 名前とキャンパス情報をフォーム回答シートに追記
        // イベントオブジェクトeから、記録が追加された行のインデックスを取得
        const changedRow = this.changedRange.getRow();
        // 記録が追加された列のインデックスを取得
        const changedLastColumn = this.changedRange.getLastColumn();
        // 記録の右側に名前と学舎を追記
        this.responseSheet.getRange(changedRow, nameColIndex).setValue(name);
        this.responseSheet.getRange(changedRow, campusColIndex).setValue(campus);
    }
}