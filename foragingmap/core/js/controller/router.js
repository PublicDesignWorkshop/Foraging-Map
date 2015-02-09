var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            this.routes = {
                "": "home",
                "map/:zoom/:lat/:lon": "map",
            };
            _super.call(this, options);
        }
        Router.prototype.initialize = function () {
        };
        Router.prototype.home = function () {
            console.log("we have loaded the home page");
            this.navigate("map/" + FMS.getDefaultZoom() + "/" + FMS.getDefaultLat() + "/" + FMS.getDefaultLng(), { trigger: true, replace: true });
        };
        Router.prototype.map = function (zoom, lat, lng) {
            console.log("we have loaded the map page with zoom: " + zoom + " | lat: " + lat + " | lng: " + lng);
            FMV.getMapView().renderMap(lat, lng, zoom);
        };
        return Router;
    })(Backbone.Router);
    ForagingMap.Router = Router;
})(ForagingMap || (ForagingMap = {}));
