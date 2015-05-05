// MVC pattern global variables.
var FMC;
var FMS;
var FML;
var FMV;
var FMM;
/**
 * Starting point of the program.
 */
$(document).ready(function () {
    var url = window.location;
    // Defines Controller.
    FMC = new ForagingMap.Controller();
    // Defines Setting.
    FMS = new ForagingMap.Setting(url.origin + window.location.pathname);
    // Defines Localization.
    FML = new ForagingMap.Localization();
    // Intializes Controller after fetching Setting.
    FMS.fetch(FMC.initialize);
});
