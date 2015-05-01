module ForagingMap {
    export class Setting {
        static BASE_URL: string;
        url: string = "core/json/setting.json";
        data: any;
        constructor(base: string) {
            Setting.BASE_URL = base;
        }
        fetch(callback: Function): void {
            var that = this;
            $.getJSON(Setting.BASE_URL + this.url, {})
                .done(function (data) {
                    that.data = data.setting;
                    // Intialize Controller after fetching Localization
                    FML.fetch(callback);
                });
        }
        // Max zoom of leaflet
        getMaxZoom(): number {
            return parseInt(this.data.maxZoom);
        }
        // Default zoom of leaflet
        getDefaultZoom(): number {
            return parseInt(this.data.defaultZoom);
        }
        // Default latitude of leaflet when it's not specified
        getDefaultLat(): number {
            return parseFloat(this.data.defaultLat);
        }
        // Default longitude of leaflet when it's not specified
        getDefaultLng(): number {
            return parseFloat(this.data.defaultLng);
        }
        // Tile map address of leaflet
        getTileMapAddress(): string {
            return this.data.tileMapAddress;
        }
        // Duration of message on the left upper corner
        getMsgTimeout(): number {
            return parseInt(this.data.msgTimeout);
        }
        // Format of date
        getDateTimeFormat(): string {
            return this.data.dateTimeFormat;
        }
        // Simple format of date
        getDateTimeFormatSimple(): string {
            return this.data.dateTimeFormatSimple;
        }
        // Relative image directory (ui, icon)
        getImageDir(): string {
            return this.data.imageDir;
        }
        // Blank leaflet marker
        getImageMarkerBlank(): string {
            return this.data.imageMarkerBlank;
        }
        // New leaflet marker
        getImageMarkerNew(): string {
            return this.data.imageMarkerNew;
        }
        // Marker shadow
        getImageMarkerShadow(): string {
            return this.data.imageMarkerShadow;
        }
        // Multiplier of circle around the marker
        getCircleRadiusMultiplier(): number {
            return this.data.circleRadiusMultiplier;
        }
        // Temporary color of circle when data and threshold is not specified
        getTempCircleColor(): string {
            return this.data.tempCircleColor;
        }
        // Temporary fill color of circle when data and threshold is not specified
        getTempCircleFillColor(): string {
            return this.data.tempCircleFillColor;
        }
        // Default fruit color
        getFruitCircleColor(): string {
            return this.data.fruitCircleColor;
        }
        // Default station color
        getStationCircleColor(): string {
            return this.data.stationCircleColor;
        }
        // Zero alpha value: 0
        getZeroAlpha(): number {
            return this.data.zeroAlpha;
        }
        // Alpha value when the marker is not selected
        getInactiveAlpha(): number {
            return this.data.inactiveAlpha;
        }
        // Half alpha value: 0.5
        getHalfAlpha(): number {
            return this.data.halfAplha;
        }
        // Alpha value when the marker is selected
        getActiveAlpha(): number {
            return this.data.activeAlpha;
        }
        // Full alpha value: 1
        getFullAlpha(): number {
            return this.data.fullAlpha;
        }
        // Leaflet zoom when it finds user location
        getLocateZoom(): number {
            return parseInt(this.data.locateZoom);
        }
        // Picture directory
        getPictureDir(): string {
            return this.data.pictureDir;
        }
        // Home url addresss
        getBaseUrl(): string {
            return Setting.BASE_URL;
        }
        // Time delay of refresh of the marker when the map changes.
        getFetchDataDelay(): number {
            return this.data.fetchDataDelay;
        }
        // Array of icons of markers
        getMarkerIcons(): any {
            return this.data.markerIcons;
        }
        // Initial delay of reading data from the server
        getDefaultInterval(): number {
            return this.data.defaultInterval;
        }
        // Return high value color of circle
        getHighValueColor(): number {
            return this.data.highValueColor;
        }
        // Return low value color of circle
        getLowValueColor(): number {
            return this.data.lowValueColor;
        }
    }
}

