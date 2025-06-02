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

function formManagerTest() {
    settings = getSettings();

    fm = new FormManager(settings.formId);
    fm.printItemsId();
}

function updateFormSelectionTest() {
    settings = getSettings();
    const formSettings = getFormSettings(settings.formSettingsSheetId);
    const pmm = new ProblemMasterManager(settings.problemMasterSheetId);
    const problemsMap = pmm.getProblemsList(reverse = false, only_enable = true);

    fm = new FormManager(settings.formId);
    fm.updateProblemsSelection(
        formSettings.problemSelectQuestionId,
        problemsMap,
        formSettings.understandingSectionId,
        formSettings.uploadFileSectionId
    );
}