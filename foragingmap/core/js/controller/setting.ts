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
                    FML.fetch(callback);
                });
        }
        getMaxZoom(): number {
            return parseInt(this.data.maxZoom);
        }
        getDefaultZoom(): number {
            return parseInt(this.data.defaultZoom);
        }
        getDefaultLat(): number {
            return parseFloat(this.data.defaultLat);
        }
        getDefaultLng(): number {
            return parseFloat(this.data.defaultLng);
        }
        getTileMapAddress(): string {
            return this.data.tileMapAddress;
        }
        getMsgTimeout(): number {
            return parseInt(this.data.msgTimeout);
        }
        getDateTimeFormat(): string {
            return this.data.dateTimeFormat;
        }
        getImageDir(): string {
            return this.data.imageDir;
        }
        getImageMarkerBlank(): string {
            return this.data.imageMarkerBlank;
        }
        getImageMarkerHeart(): string {
            return this.data.imageMarkerHeart;
        }
        getImageMarkerDollar(): string {
            return this.data.imageMarkerDollar;
        }
        getImageMarkerNew(): string {
            return this.data.imageMarkerNew;
        }
        getImageMarkerShadow(): string {
            return this.data.imageMarkerShadow;
        }
        getCircleRadiusMultiplier(): number {
            return this.data.circleRadiusMultiplier;
        }
        getTempCircleColor(): string {
            return this.data.tempCircleColor;
        }
        getFruitCircleColor(): string {
            return this.data.fruitCircleColor;
        }
        getStationCircleColor(): string {
            return this.data.stationCircleColor;
        }
        getZeroAlpha(): number {
            return this.data.zeroAlpha;
        }
        getInactiveAlpha(): number {
            return this.data.inactiveAlpha;
        }
        getHalfAlpha(): number {
            return this.data.halfAplha;
        }
        getActiveAlpha(): number {
            return this.data.activeAlpha;
        }
        getFullAlpha(): number {
            return this.data.fullAlpha;
        }
        getLocateZoom(): number {
            return parseInt(this.data.locateZoom);
        }
        getPictureDir(): string {
            return this.data.pictureDir;
        }
        getBaseUrl(): string {
            return Setting.BASE_URL;
        }
        getFetchDataDelay(): number {
            return this.data.fetchDataDelay;
        }
    }
}

