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
    FMC = new ForagingMap.Controller();
    FMS = new ForagingMap.Setting(url.origin + window.location.pathname);

    FML = new ForagingMap.Localization();
    FMS.fetch(FMC.initialize);
});