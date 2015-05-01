/// <reference path="..\..\..\Scripts\typings\jquery\jquery.d.ts" />
/// <reference path="controller.ts" />
/// <reference path="router.ts" />
/// <reference path="setting.ts" />
/// <reference path="localization.ts" />

var FMC: ForagingMap.Controller;
var FMS: ForagingMap.Setting;
var FML: ForagingMap.Localization;
var FMV: ForagingMap.View;
var FMM: ForagingMap.Model;

$(document).ready(function () {
    var url: any = window.location;
    // Define Controller
    FMC = new ForagingMap.Controller();
    // Define Setting
    FMS = new ForagingMap.Setting(url.origin + window.location.pathname);
    // Define Localization
    FML = new ForagingMap.Localization();
    // Intialize Controller after fetching Setting
    FMS.fetch(FMC.initialize);
});