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