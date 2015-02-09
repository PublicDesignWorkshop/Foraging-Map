var ForagingMap;
(function (ForagingMap) {
    var Setting = (function () {
        function Setting(base) {
            this.url = "core/json/setting.json";
            Setting.BASE_URL = base;
        }
        Setting.prototype.fetch = function (callback) {
            var that = this;
            $.getJSON(Setting.BASE_URL + this.url, {}).done(function (data) {
                that.data = data.setting;
                FML.fetch(callback);
            });
        };
        Setting.prototype.getMaxZoom = function () {
            return parseInt(this.data.maxZoom);
        };
        Setting.prototype.getDefaultZoom = function () {
            return parseInt(this.data.defaultZoom);
        };
        Setting.prototype.getDefaultLat = function () {
            return parseFloat(this.data.defaultLat);
        };
        Setting.prototype.getDefaultLng = function () {
            return parseFloat(this.data.defaultLng);
        };
        Setting.prototype.getTileMapAddress = function () {
            return this.data.tileMapAddress;
        };
        Setting.prototype.getMsgTimeout = function () {
            return parseInt(this.data.msgTimeout);
        };
        Setting.prototype.getDateTimeFormat = function () {
            return this.data.dateTimeFormat;
        };
        Setting.prototype.getImageDir = function () {
            return this.data.imageDir;
        };
        Setting.prototype.getImageMarkerBlank = function () {
            return this.data.imageMarkerBlank;
        };
        Setting.prototype.getImageMarkerHeart = function () {
            return this.data.imageMarkerHeart;
        };
        Setting.prototype.getImageMarkerDollar = function () {
            return this.data.imageMarkerDollar;
        };
        Setting.prototype.getImageMarkerNew = function () {
            return this.data.imageMarkerNew;
        };
        Setting.prototype.getImageMarkerShadow = function () {
            return this.data.imageMarkerShadow;
        };
        Setting.prototype.getCircleRadiusMultiplier = function () {
            return this.data.circleRadiusMultiplier;
        };
        Setting.prototype.getTempCircleColor = function () {
            return this.data.tempCircleColor;
        };
        Setting.prototype.getFruitCircleColor = function () {
            return this.data.fruitCircleColor;
        };
        Setting.prototype.getStationCircleColor = function () {
            return this.data.stationCircleColor;
        };
        Setting.prototype.getZeroAlpha = function () {
            return this.data.zeroAlpha;
        };
        Setting.prototype.getInactiveAlpha = function () {
            return this.data.inactiveAlpha;
        };
        Setting.prototype.getHalfAlpha = function () {
            return this.data.halfAplha;
        };
        Setting.prototype.getActiveAlpha = function () {
            return this.data.activeAlpha;
        };
        Setting.prototype.getFullAlpha = function () {
            return this.data.fullAlpha;
        };
        Setting.prototype.getLocateZoom = function () {
            return parseInt(this.data.locateZoom);
        };
        Setting.prototype.getPictureDir = function () {
            return this.data.pictureDir;
        };
        Setting.prototype.getBaseUrl = function () {
            return Setting.BASE_URL;
        };
        Setting.prototype.getFetchDataDelay = function () {
            return this.data.fetchDataDelay;
        };
        Setting.prototype.getMarkerIcons = function () {
            return this.data.markerIcons;
        };
        return Setting;
    })();
    ForagingMap.Setting = Setting;
})(ForagingMap || (ForagingMap = {}));
