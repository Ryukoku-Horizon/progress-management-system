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

function progressManagerTest () {
    settings = getSettings();
    console.log("settings:", settings);

    const plm = new ProgressListManager(
        settings.progressListSheetId,
        settings.progressListProblemIdRowIndex,
        settings.progressListProblemNameRowIndex,
        settings.progressListStudentNumberColIndex,
        settings.progressListStudentNameColIndex,
        settings.progressListStudentCampusColIndex,
        settings.progressListProblemStartColIndex
    );

    console.log(plm._findStudentNumberRow("Y230190"));
    console.log(plm._findProblemIdColumn("python-prac3"));
}

function registerProgressTest() {
    settings = getSettings();
    console.log("settings:", settings);

    const plm = new ProgressListManager(
        settings.progressListSheetId,
        settings.progressListProblemIdRowIndex,
        settings.progressListProblemNameRowIndex,
        settings.progressListStudentNumberColIndex,
        settings.progressListStudentNameColIndex,
        settings.progressListStudentCampusColIndex,
        settings.progressListProblemStartColIndex,
        settings.progressListLatestDateColIndex
    );

    plm.registerProgress("J230190", "望人", "瀬田", "python-t1", "Python - t1");
}