function getSettingsTest() {
    settings = getSettings();
    console.log("settings:", settings);

    form_settings = getFormSettings(settings.formSettingsSheetId);
    console.log("form_settings:", form_settings);
}
