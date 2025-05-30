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

}