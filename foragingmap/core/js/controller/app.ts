// MVC pattern global variables.
var FMC: ForagingMap.Controller;
var FMS: ForagingMap.Setting;
var FML: ForagingMap.Localization;
var FMV: ForagingMap.View;
var FMM: ForagingMap.Model;

/**
 * Starting point of the program.
 */
$(document).ready(function () {
    var url: any = window.location;
    // Defines Controller.
    FMC = new ForagingMap.Controller();
    // Defines Setting.
    FMS = new ForagingMap.Setting(url.origin + window.location.pathname);
    // Defines Localization.
    FML = new ForagingMap.Localization();
    // Intializes Controller after fetching Setting.
    FMS.fetch(FMC.initialize);
});