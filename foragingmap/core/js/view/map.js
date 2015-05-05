/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var MapView = (function (_super) {
        __extends(MapView, _super);
        function MapView(options) {
            _super.call(this, options);
            this.setElement(options.el);
        }
        MapView.prototype.getMapZoom = function () {
            return this.lMap.getZoom();
        };
        MapView.prototype.getMapCenter = function () {
            return this.lMap.getCenter();
        };
        MapView.prototype.getMapBounds = function () {
            return this.lMap.getBounds();
        };
        MapView.prototype.renderMap = function (lat, lng, zoom) {
            var that = this;
            // intialize map if map is not created.
            if (that.lMap == null) {
                that.lMap = L.map(that.$el[0].id, {
                    closePopupOnClick: false,
                    zoomControl: false,
                    doubleClickZoom: false,
                }).setView(new L.LatLng(lat, lng), zoom);
                L.tileLayer(FMS.getTileMapAddress(), {
                    minZoom: 3,
                    maxZoom: FMS.getMaxZoom(),
                }).addTo(that.lMap);
                that.lMap.invalidateSize(false);
                //that.lMap.touchZoom.disable();
                that.lMap.doubleClickZoom.disable();
                that.lMap.on("moveend", function (e) {
                    FMC.getRouter().navigate('map/' + that.getMapZoom() + "/" + that.getMapCenter().lat + "/" + that.getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval()
                        + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: false, replace: true });
                    that.waitForFetchData();
                });
                that.lMap.whenReady(function () {
                    FMC.fetchItems(that.lMap.getBounds());
                    that.vMarkers = new ForagingMap.MarkersView();
                    that.vControl = new ForagingMap.MapControlView({ el: $(".leaflet-top.leaflet-right") });
                    that.vSensor = new ForagingMap.SensorSelect({ el: $(".leaflet-top.leaflet-left") });
                });
                that.lMap.on("dblclick", function () {
                    if (FMV.getUIView().getMode() != UIMode.ADD) {
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                        FMV.getMapView().getMarkersView().inactiveMarkers();
                        FMV.getMapView().getControlView().resetControls();
                    }
                });
            }
            else {
                that.lMap.setView(new L.LatLng(lat, lng), zoom);
            }
        };
        MapView.prototype.waitForFetchData = function () {
            var that = this;
            if (that.timeout != null) {
                clearTimeout(that.timeout);
            }
            that.timeout = setTimeout(function () {
                FMC.fetchItems(that.getMapBounds());
            }, FMS.getFetchDataDelay());
        };
        MapView.prototype.getMap = function () {
            return this.lMap;
        };
        MapView.prototype.getMarkersView = function () {
            return this.vMarkers;
        };
        MapView.prototype.getControlView = function () {
            return this.vControl;
        };
        MapView.prototype.getSensorView = function () {
            return this.vSensor;
        };
        MapView.prototype.show = function () {
            $("#leaflet-view-map").removeClass("hidden");
        };
        MapView.prototype.hide = function () {
            $("#leaflet-view-map").addClass("hidden");
        };
        MapView.prototype.resize = function (centerize) {
            var that = this;
            if (FMV.getUIView().getIsOpen()) {
                that.$el.addClass("view-map-half");
                that.$el.css({ 'width': that.$el.parent().width() - FMV.getUIView().getOuterWidth() });
            }
            else {
                that.$el.removeAttr("style");
                that.$el.removeClass("view-map-half");
            }
            that.lMap.invalidateSize(false); // set map size fit with parent div size
            if (FMC.hasSelectedItem() && centerize) {
                that.lMap.setView(new L.LatLng(parseFloat(FMC.getSelectedItem().get("lat")), parseFloat(FMC.getSelectedItem().get("lng"))));
            }
        };
        MapView.prototype.SetIsMapPanZoomAvailable = function (isAvailable) {
            if (isAvailable) {
                FMV.getMapView().getMap().dragging.enable();
                FMV.getMapView().getMap().touchZoom.enable();
                //FMV.getMapView().getMap().doubleClickZoom.enable();
                FMV.getMapView().getMap().scrollWheelZoom.enable();
            }
            else {
                FMV.getMapView().getMap().dragging.disable();
                FMV.getMapView().getMap().touchZoom.disable();
                //FMV.getMapView().getMap().doubleClickZoom.disable();
                FMV.getMapView().getMap().scrollWheelZoom.disable();
            }
        };
        return MapView;
    })(Backbone.View);
    ForagingMap.MapView = MapView;
})(ForagingMap || (ForagingMap = {}));
