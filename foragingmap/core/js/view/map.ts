/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class MapView extends Backbone.View<Backbone.Model> {
        private timeout: any;
        private lMap: L.Map;
        private vMarkers: MarkersView;
        private vControl: MapControlView;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
        }
        getMapZoom():number {
            return this.lMap.getZoom();
        }
        getMapCenter(): L.LatLng {
            return this.lMap.getCenter();
        }
        getMapBounds(): L.LatLngBounds {
            return this.lMap.getBounds();
        }
        renderMap(lat: number, lng: number, zoom: number): void {
            var that: MapView = this;
            // intialize map if map is not created.
            if (that.lMap == null) {
                that.lMap = L.map(that.$el[0].id, {
                    closePopupOnClick: false,
                    zoomControl: false,
                    doubleClickZoom: false,
                }).setView(new L.LatLng(lat, lng), zoom);
                L.tileLayer(FMS.getTileMapAddress(), {
                    maxZoom: FMS.getMaxZoom(),
                }).addTo(that.lMap);
                that.lMap.invalidateSize(false);
                that.lMap.touchZoom.disable();
                that.lMap.doubleClickZoom.disable();
                that.lMap.on("moveend", function (e) {
                    FMC.getRouter().navigate('map/' + that.getMapZoom() + "/" + that.getMapCenter().lat + "/" + that.getMapCenter().lng, { trigger: false, replace: true });
                    that.waitForFetchData();
                    
                });
                that.lMap.whenReady(function () {
                    FMC.fetchItems(that.lMap.getBounds());
                    that.vMarkers = new ForagingMap.MarkersView();
                    that.vControl = new ForagingMap.MapControlView({ el: $(".leaflet-top.leaflet-right") });
                });
                that.lMap.on("dblclick", function () {
                    if (FMV.getUIView().getMode() != UIMode.ADD) {
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                        FMV.getMapView().getMarkersView().inactiveMarkers();
                        FMV.getMapView().getControlView().resetControls();
                    }
                });
            } else {
                that.lMap.setView(new L.LatLng(lat, lng), zoom);
            }
        }
        waitForFetchData(): void {
            var that: MapView = this;
            if (that.timeout != null) {
                clearTimeout(that.timeout);
            }
            that.timeout = setTimeout(function () {
                FMC.fetchItems(that.getMapBounds());
            }, FMS.getFetchDataDelay());
        }
        getMap(): L.Map {
            return this.lMap;
        }
        getMarkersView(): MarkersView {
            return this.vMarkers;
        }
        getControlView(): MapControlView {
            return this.vControl;
        }
        resize(centerize: boolean): void {
            var that: MapView = this;
            if (FMV.getUIView().getIsOpen()) {
                that.$el.addClass("view-map-half");
                that.$el.css({ 'width': that.$el.parent().width() - FMV.getUIView().getOuterWidth() });
            } else {
                that.$el.removeAttr("style");
                that.$el.removeClass("view-map-half");
            }
            that.lMap.invalidateSize(false);   // set map size fit with parent div size
            if (FMC.hasSelectedItem() && centerize) {
                that.lMap.setView(new L.LatLng(parseFloat(FMC.getSelectedItem().get("lat")), parseFloat(FMC.getSelectedItem().get("lng"))));
            }
        }
        SetIsMapPanZoomAvailable(isAvailable: boolean): void {
            if (isAvailable) {
                FMV.getMapView().getMap().dragging.enable();
                //FMV.getMapView().getMap().touchZoom.enable();
                //FMV.getMapView().getMap().doubleClickZoom.enable();
                FMV.getMapView().getMap().scrollWheelZoom.enable();
            } else {
                FMV.getMapView().getMap().dragging.disable();
                //FMV.getMapView().getMap().touchZoom.disable();
                //FMV.getMapView().getMap().doubleClickZoom.disable();
                FMV.getMapView().getMap().scrollWheelZoom.disable();
            }
        }
    }
}