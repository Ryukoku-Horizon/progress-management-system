function getSettingsTest() {
    settings = getSettings();
    console.log("settings:", settings);

    form_settings = getFormSettings(settings.formSettingsSheetId);
    console.log("form_settings:", form_settings);
}

function getProblemsMasterTest() {
    settings = getSettings();
    console.log("settings:", settings);

    const pmm = new ProblemMasterManager(settings.problemMasterSheetId);
    console.log(pmm.getProblemId("Python - 練習問題1"));
    console.log(pmm.getProblemPriority("python-prac3"));
    const map = pmm.getProblemsList(reverse = false);
    for (const [key, value] of map) {
        console.log(key, value);
    }
}

function formReponseTest (e = null) {
    settings = getSettings();
    console.log("settings:", settings);
    console.log("sheetId:", settings.memberListSheetId);
    

    const frm = new FormResponseManager(settings.formResponseSheetId, e);
    const nlm = new NameListManager(
        settings.memberListSheetId, 
        settings.memberListStudentNumberColIndex, 
        settings.memberListStudentNameColIndex, 
        settings.memberListStudentCampusColIndex
    );
    num = frm.getStudentNumber();
    console.log(num);
    console.log(frm.getTimestamp());
    name = nlm.getName(num);
    cam = nlm.getCampus(num);
    console.log(`学籍番号: ${num}, 名前: ${name}, キャンパス: ${cam}`);
    frm.addNameAndCampus(
        name, settings.formResponseStudentNameColIndex, 
        cam, settings.formResponseStudentCampusColIndex
    );
}