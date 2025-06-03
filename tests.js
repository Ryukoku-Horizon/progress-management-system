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