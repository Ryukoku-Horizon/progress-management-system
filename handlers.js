function updateProgressList(e) {
    const settings = getSettings();
    const formSettings = getFormSettings(settings.formSettingsSheetId);

    const formResponseManager = new FormResponseManager(settings.formResponseSheetId, e);
    // 学籍番号を取得
    const studentNumber = formResponseManager.getStudentNumber();
    
    const nameListManager = new NameListManager(
        settings.memberListSheetId,
        settings.memberListStudentNumberColIndex,
        settings.memberListStudentNameColIndex,
        settings.memberListStudentCampusColIndex
    );
    // 学籍番号から名前とキャンパス情報を取得
    const studentName = nameListManager.getName(studentNumber);
    const studentCampus = nameListManager.getCampus(studentNumber);
}