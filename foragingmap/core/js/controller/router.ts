/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
module ForagingMap {
    export class Router extends Backbone.Router {
        constructor(options?: Backbone.RouterOptions) {
            this.routes = {
                "": "home",
                "map/:zoom/:lat/:lon": "map",
            }
            super(options);
        }
        initialize() {

        }
        home() {
            console.log("we have loaded the home page");
            this.navigate("map/" + FMS.getDefaultZoom() + "/" + FMS.getDefaultLat() + "/" + FMS.getDefaultLng(), {trigger: true, replace: true});
        }
        map(zoom: number, lat: number, lng: number) {
            console.log("we have loaded the map page with zoom: " + zoom + " | lat: " + lat + " | lng: " + lng);
            FMV.getMapView().renderMap(lat, lng, zoom);
        }
    }
}