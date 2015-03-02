/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
module ForagingMap {
    export class Router extends Backbone.Router {
        constructor(options?: Backbone.RouterOptions) {
            this.routes = {
                "": "home",
                "map/:zoom/:lat/:lng/:interval/:start/:end/:cur": "map",
            }
            super(options);
        }
        initialize() {

        }
        home() {
            console.log("we have loaded the home page");
            this.navigate("map/" + FMS.getDefaultZoom() + "/" + FMS.getDefaultLat() + "/" + FMS.getDefaultLng() + "/" + FMS.getDefaultInterval()
                + "/" + moment(new Date()).subtract(6, 'month').valueOf() + "/" + moment(new Date()).valueOf() + "/" + moment(new Date()).valueOf(), { trigger: true, replace: true });
        }
        map(zoom: number, lat: number, lng: number, interval: number, start: number, end: number, cur: number) {
            console.log("we have loaded the map page with zoom: " + zoom + " | lat: " + lat + " | lng: " + lng);
            FMV.getMapView().renderMap(lat, lng, zoom);
            FMV.getSliderView().renderSlider(interval, start, end, cur);
        }
        refresh() {
            console.log("refresh");
            window.location.reload();
            //FMC.getRouter().navigate('map/' + FMV.getMapView().getMap().getZoom() + "/" + FMV.getMapView().getMap().getCenter().lat + "/" + FMV.getMapView().getMap().getCenter().lng + "/" + FMV.getSliderView().getTimeInterval()
            //    + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });
        }
    }
}