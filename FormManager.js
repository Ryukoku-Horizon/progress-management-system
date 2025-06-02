class FormManager {
    /**
     * コンストラクター: FormManagerクラスのインスタンスを初期化する
     * @param {string} formId - 操作対象のGoogleフォームの一意の識別子
     */
    constructor(formId) {
        this.form = FormApp.openById(formId);
    }

    /**
     * フォーム内の各項目のタイトルとIDをコンソールに出力します。
     * フォームから取得したすべての項目を繰り返し処理し、タイトルとIDを表示します。
     */
    printItemsId() {
        const items = this.form.getItems();
        for (let i = 0; i < items.length; i++) {
            console.log(`タイトル: ${items[i].getTitle()} | ID: ${items[i].getId()}`);
        }
    }

    /**
     * フォームのタイトルを更新します。
     * @param {string} title - 設定する新しいフォームタイトル
     */
    updateFormTitle(title) {
        this.form.setTitle(title);
    }

    /**
     * フォームの説明を更新します。
     * @param {string} description - 設定する新しいフォームの説明
     */
    updateFormDescription(description) {
        this.form.setDescription(description);
    }

    /**
     * フォーム内の特定の項目のタイトルを更新します。
     * @param {string} itemId - 更新する項目の一意の識別子
     * @param {string} newTitle - 設定する新しい項目のタイトル
     */
    /**
     * フォーム内の特定の項目のタイトルを更新します。
     * @param {string} itemId - 更新する項目の一意の識別子
     * @param {string} newTitle - 設定する新しい項目のタイトル
     */
    updateItemTitle(itemId, newTitle) {
        const item = this.form.getItemById(itemId);
        if (item) {
            item.setTitle(newTitle);
        }
    }

    /**
     * 問題選択項目の選択肢を動的に設定し、選択された問題の種類に応じて異なるページブレークに遷移するメソッド。
     * 
     * @param {string} selectionItemId - 問題選択リストの項目ID
     * @param {Map<string, string>} problemsMap - 問題名とカテゴリ名のマップ
     * @param {string} understandingBrakeId - 理解度チェックページブレークの項目ID
     * @param {string} fileUploadBrakeId - ファイルアップロードページブレークの項目ID
     * @throws {Error} 指定された項目IDが無効な場合にエラーをスロー
     */
    updateProblemsSelection(selectionItemId, problemsMap, understandingBrakeId, fileUploadBrakeId) {
        let selectionItem = this.form.getItemById(selectionItemId);
        let understandingBrake = this.form.getItemById(understandingBrakeId);
        let fileUploadBrake = this.form.getItemById(fileUploadBrakeId);

        if (!selectionItem || !understandingBrake || !fileUploadBrake) {
            throw new Error("指定された項目のIDが無効です。");
        }

        selectionItem = selectionItem.asListItem().setChoiceValues(Array.from(problemsMap.keys()));
        understandingBrake = understandingBrake.asPageBreakItem();
        fileUploadBrake = fileUploadBrake.asPageBreakItem();
        // 問題の選択肢を設定
        let choices = [];
        for (const [problemName, problemCategory] of problemsMap) {
            if (problemCategory === "まとめ問題") { 
                // まとめ問題ではファイルのアップロードへ遷移
                choices.push(selectionItem.createChoice(problemName, fileUploadBrake));
            } else {
                // それ以外の問題では理解度チェックへ遷移
                choices.push(selectionItem.createChoice(problemName, understandingBrake));
            }
        }

        selectionItem.setChoices(choices);
    }

}