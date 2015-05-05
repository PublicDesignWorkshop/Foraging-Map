module ForagingMap {
    /**
     * Router class for parsing hash address into map & slider info
     */
    export class Router extends Backbone.Router {
        constructor(options?: Backbone.RouterOptions) {
            this.routes = {
                "": "home",
                "map/:zoom/:lat/:lng/:interval/:start/:end/:cur": "map",
                '*path': 'home',    // re-route to home page if the router cannot parse hash
            }
            super(options);
        }
        home() {
            console.log("we have loaded the home page.");
            this.navigate("map/" + FMS.getDefaultZoom() + "/" + FMS.getDefaultLat() + "/" + FMS.getDefaultLng() + "/" + FMS.getDefaultInterval()
                + "/" + moment(new Date()).subtract(6, 'month').valueOf() + "/" + moment(new Date()).valueOf() + "/" + moment(new Date()).valueOf(), { trigger: true, replace: true });
        }
        map(zoom: number, lat: number, lng: number, interval: number, start: number, end: number, cur: number) {
            console.log("we have loaded the map page with zoom: " + zoom + " | lat: " + lat + " | lng: " + lng);
            FMV.getMapView().renderMap(lat, lng, zoom);
            //FMV.getSliderView().renderSlider(interval, start, end, cur); // Parse the end date of slider from hash (currently not using this)
            FMV.getSliderView().renderSlider(interval, start, moment(new Date()).valueOf(), cur); // Make the end date as always page loading date (current date / time)
        }
        refresh() {
            console.log("Refresh page.");
            window.location.reload();
        }
    }
}