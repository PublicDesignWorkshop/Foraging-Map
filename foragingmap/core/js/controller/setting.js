var ForagingMap;
(function (ForagingMap) {
    var Setting = (function () {
        function Setting(base) {
            this.url = "core/json/setting.json";
            Setting.BASE_URL = base;
        }
        Setting.prototype.fetch = function (callback) {
            var that = this;
            $.getJSON(Setting.BASE_URL + this.url, {})
                .done(function (data) {
                that.data = data.setting;
                // Intialize Controller after fetching Localization
                FML.fetch(callback);
            });
        };
        // Max zoom of leaflet
        Setting.prototype.getMaxZoom = function () {
            return parseInt(this.data.maxZoom);
        };
        // Default zoom of leaflet
        Setting.prototype.getDefaultZoom = function () {
            return parseInt(this.data.defaultZoom);
        };
        // Default latitude of leaflet when it's not specified
        Setting.prototype.getDefaultLat = function () {
            return parseFloat(this.data.defaultLat);
        };
        // Default longitude of leaflet when it's not specified
        Setting.prototype.getDefaultLng = function () {
            return parseFloat(this.data.defaultLng);
        };
        // Tile map address of leaflet
        Setting.prototype.getTileMapAddress = function () {
            return this.data.tileMapAddress;
        };
        // Duration of message on the left upper corner
        Setting.prototype.getMsgTimeout = function () {
            return parseInt(this.data.msgTimeout);
        };
        // Format of date
        Setting.prototype.getDateTimeFormat = function () {
            return this.data.dateTimeFormat;
        };
        // Simple format of date
        Setting.prototype.getDateTimeFormatSimple = function () {
            return this.data.dateTimeFormatSimple;
        };
        // Relative image directory (ui, icon)
        Setting.prototype.getImageDir = function () {
            return this.data.imageDir;
        };
        // Blank leaflet marker
        Setting.prototype.getImageMarkerBlank = function () {
            return this.data.imageMarkerBlank;
        };
        // New leaflet marker
        Setting.prototype.getImageMarkerNew = function () {
            return this.data.imageMarkerNew;
        };
        // Marker shadow
        Setting.prototype.getImageMarkerShadow = function () {
            return this.data.imageMarkerShadow;
        };
        // Multiplier of circle around the marker
        Setting.prototype.getCircleRadiusMultiplier = function () {
            return this.data.circleRadiusMultiplier;
        };
        // Temporary color of circle when data and threshold is not specified
        Setting.prototype.getTempCircleColor = function () {
            return this.data.tempCircleColor;
        };
        // Temporary fill color of circle when data and threshold is not specified
        Setting.prototype.getTempCircleFillColor = function () {
            return this.data.tempCircleFillColor;
        };
        // Default fruit color
        Setting.prototype.getFruitCircleColor = function () {
            return this.data.fruitCircleColor;
        };
        // Default station color
        Setting.prototype.getStationCircleColor = function () {
            return this.data.stationCircleColor;
        };
        // Zero alpha value: 0
        Setting.prototype.getZeroAlpha = function () {
            return this.data.zeroAlpha;
        };
        // Alpha value when the marker is not selected
        Setting.prototype.getInactiveAlpha = function () {
            return this.data.inactiveAlpha;
        };
        // Half alpha value: 0.5
        Setting.prototype.getHalfAlpha = function () {
            return this.data.halfAplha;
        };
        // Alpha value when the marker is selected
        Setting.prototype.getActiveAlpha = function () {
            return this.data.activeAlpha;
        };
        // Full alpha value: 1
        Setting.prototype.getFullAlpha = function () {
            return this.data.fullAlpha;
        };
        // Leaflet zoom when it finds user location
        Setting.prototype.getLocateZoom = function () {
            return parseInt(this.data.locateZoom);
        };
        // Picture directory
        Setting.prototype.getPictureDir = function () {
            return this.data.pictureDir;
        };
        // Home url addresss
        Setting.prototype.getBaseUrl = function () {
            return Setting.BASE_URL;
        };
        // Time delay of refresh of the marker when the map changes.
        Setting.prototype.getFetchDataDelay = function () {
            return this.data.fetchDataDelay;
        };
        // Array of icons of markers
        Setting.prototype.getMarkerIcons = function () {
            return this.data.markerIcons;
        };
        // Initial delay of reading data from the server
        Setting.prototype.getDefaultInterval = function () {
            return this.data.defaultInterval;
        };
        // Return high value color of circle
        Setting.prototype.getHighValueColor = function () {
            return this.data.highValueColor;
        };
        // Return low value color of circle
        Setting.prototype.getLowValueColor = function () {
            return this.data.lowValueColor;
        };
        return Setting;
    })();
    ForagingMap.Setting = Setting;
})(ForagingMap || (ForagingMap = {}));
