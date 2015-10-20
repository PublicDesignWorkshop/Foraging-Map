var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    /**
     * Router class for parsing hash address into map & slider info
     */
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            this.routes = {
                "": "home",
                "map/:zoom/:lat/:lng/:interval/:start/:end/:cur": "map",
                '*path': 'home',
            };
            _super.call(this, options);
        }
        Router.prototype.home = function () {
            console.log("we have loaded the home page.");
            this.navigate("map/" + FMS.getDefaultZoom() + "/" + FMS.getDefaultLat() + "/" + FMS.getDefaultLng() + "/" + FMS.getDefaultInterval() + "/" + moment(new Date()).subtract(6, 'month').valueOf() + "/" + moment(new Date()).valueOf() + "/" + moment(new Date()).valueOf(), { trigger: true, replace: true });
        };
        Router.prototype.map = function (zoom, lat, lng, interval, start, end, cur) {
            console.log("we have loaded the map page with zoom: " + zoom + " | lat: " + lat + " | lng: " + lng);
            FMV.getMapView().renderMap(lat, lng, zoom);
            //FMV.getSliderView().renderSlider(interval, start, end, cur); // Parse the end date of slider from hash (currently not using this)
            FMV.getSliderView().renderSlider(interval, start, moment(new Date()).valueOf(), cur); // Make the end date as always page loading date (current date / time)
        };
        Router.prototype.refresh = function () {
            console.log("Refresh page.");
            window.location.reload();
        };
        return Router;
    })(Backbone.Router);
    ForagingMap.Router = Router;
})(ForagingMap || (ForagingMap = {}));
