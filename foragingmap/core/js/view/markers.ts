﻿/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />
/// <reference path="..\model\item.ts" />

module ForagingMap {
    export class MarkersView extends Backbone.View<Backbone.Model> {
        private isSelectable: boolean;
        private iconBlank: L.Icon;
        private iconHeart: L.Icon;
        private iconDollar: L.Icon;
        private iconNew: L.Icon;
        markerGroups: Array<L.FeatureGroup<L.ILayer>>;
        circleGroups: Array<L.FeatureGroup<L.ILayer>>;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            var that: MarkersView = this;
            this.isSelectable = false;
            // initialize marker layer groups
            that.markerGroups = new Array<L.FeatureGroup<L.ILayer>>();
            that.circleGroups = new Array<L.FeatureGroup<L.ILayer>>();
            var circleGroup = new L.FeatureGroup();
            var markerGroup = new L.FeatureGroup();
            circleGroup.sid = 0;
            markerGroup.sid = 0;
            that.markerGroups.push(circleGroup);
            that.circleGroups.push(markerGroup);
            $.each(FMM.getLayers().models, function (index: number, model: Layer) {
                var circleGroup = new L.FeatureGroup();
                var markerGroup = new L.FeatureGroup();
                circleGroup.sid = parseInt(model.id);
                markerGroup.sid = parseInt(model.id);
                that.markerGroups.push(circleGroup);
                that.circleGroups.push(markerGroup);
            });
            $.each(that.markerGroups, function (index: number, iLayer: L.FeatureGroup<L.ILayer>) {
                iLayer.addTo(FMV.getMapView().getMap());
            });
            $.each(that.circleGroups, function (index: number, iLayer: L.FeatureGroup<L.ILayer>) {
                iLayer.addTo(FMV.getMapView().getMap());
            });
            // intialize icon
            this.iconBlank = new L.Icon({
                iconUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerBlank(),
                shadowUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });
            this.iconHeart = new L.Icon({
                iconUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerHeart(),
                shadowUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });
            this.iconDollar = new L.Icon({
                iconUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerDollar(),
                shadowUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });
            this.iconNew = new L.Icon({
                iconUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerNew(),
                shadowUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });
        }
        render(): any {
            var that: ForagingMap.MarkersView = this;
            $.each(FMM.getItems().models, function (index: number, item: ForagingMap.Item) {
                if (!item.getIsRemoved()) {
                    if (item.marker == null && item.circle == null) {                               // create new marker
                        console.log("create new marker with type: " + (item.get("type")));
                        if (item.get("type") == ItemType.None) {
                            item.marker = new L.Marker(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), {
                                icon: that.iconNew,
                                draggable: false,
                                riseOnHover: true,
                            }).bindPopup(item.get("name"), {
                                closeButton: false,
                            });
                            item.circle = new L.Circle(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), parseFloat(item.get("amount")) * FMS.getCircleRadiusMultiplier(), {
                                color: FMS.getTempCircleColor(),
                                fillColor: FMS.getTempCircleColor(),
                                fillOpacity: FMS.getInactiveAlpha(),
                                weight: 1,
                            });
                        } else if (item.get("type") == ItemType.Fruit) {
                            item.marker = new L.Marker(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), {
                                icon: that.iconBlank,
                                draggable: false,
                                riseOnHover: true,
                            }).bindPopup(item.get("name"), {
                                closeButton: false,
                            });
                            item.circle = new L.Circle(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), parseFloat(item.get("amount")) * FMS.getCircleRadiusMultiplier(), {
                                color: FMS.getFruitCircleColor(),
                                fillColor: FMS.getFruitCircleColor(),
                                fillOpacity: FMS.getInactiveAlpha(),
                                weight: 1,
                            });
                        } else if (item.get("type") == ItemType.Station) {
                            item.marker = new L.Marker(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), {
                                icon: that.iconDollar,
                                draggable: false,
                                riseOnHover: true,
                            }).bindPopup(item.get("name"), {
                                closeButton: false,
                            });

                            item.circle = new L.Circle(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), parseFloat(item.get("amount")) * FMS.getCircleRadiusMultiplier(), {
                                color: FMS.getStationCircleColor(),
                                fillColor: FMS.getStationCircleColor(),
                                fillOpacity: FMS.getInactiveAlpha(),
                                weight: 1,
                            });
                        }
                        item.marker.setOpacity(FMS.getHalfAlpha());
                        var i: number = that.getIndexOfMarkerGroups1(item);
                        that.markerGroups[i].addLayer(item.marker);
                        that.circleGroups[i].addLayer(item.circle);
                        // event listeners
                        that.removeEventListener(item);
                        that.addEventListener(item);
                    } else {
                        // update marker
                        that.updateMarker(item);
                    }
                }
            });
            if (FMC.getSelectedItem() != null && FMC.getSelectedItem().marker != null) {
                FMC.getSelectedItem().marker.openPopup();
            }
        }
        getIndexOfMarkerGroups1(item: Item): number {
            var that: ForagingMap.MarkersView = this;
            if (item.id == undefined) {
                return 0;
            }
            var result: number = 0;
            $.each(that.markerGroups, function (index: number, iLayer: L.FeatureGroup<L.ILayer>) {
                if (iLayer.sid == parseInt(item.get("sort"))) {
                    result = index;
                    return result;
                }
            });
            return result;
        }
        getIndexOfMarkerGroups2(id: number): number {
            var that: ForagingMap.MarkersView = this;
            var result: number = 0;
            $.each(that.markerGroups, function (index: number, iLayer: L.FeatureGroup<L.ILayer>) {
                if (iLayer.sid == id) {
                    result = index;
                    return result;
                }
            });
            return result;
        }
        createNewMarkerLayer(layer: Layer) {
            var that: MarkersView = this;
            var circleGroup = new L.FeatureGroup();
            var markerGroup = new L.FeatureGroup();
            circleGroup.sid = parseInt(layer.id);
            markerGroup.sid = parseInt(layer.id);
            that.markerGroups.push(circleGroup);
            that.circleGroups.push(markerGroup);
        }
        updateMarker(item: Item) {
            item.marker.setPopupContent(item.get("name"));
            var latlng = new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng")));
            item.marker.setLatLng(latlng);
            item.circle.setLatLng(latlng);
            item.circle.setRadius(parseFloat(item.get("amount")) * FMS.getCircleRadiusMultiplier());

            if (item.circle != null && item.get("sort") != 0) {
                var ratio = FMM.getBendRatio(item);
                if (ratio == Number.MIN_VALUE) {
                    item.circle.setStyle({ color: FMS.getTempCircleColor(), fillColor: FMS.getTempCircleColor() });
                } else {
                    var hVal = (1 - ratio) * 50;
                    var lVal = 50;
                    if (ratio > 1) {
                        lVal = 50 - (ratio - 1) * 35;
                    } else {
                        lVal = 50;
                    }
                    var color = 'hsl(' + hVal + ', 90%, ' + lVal + '%)';
                    item.circle.setStyle({ color: color, fillColor: color });
                }
            }
        }
        removeMarker(item: Item) {
            var i: number = this.getIndexOfMarkerGroups1(item);
            if (item.marker != null && this.markerGroups[i].hasLayer(item.marker)) {
                this.markerGroups[i].removeLayer(item.marker);
            }
            if (item.circle != null && this.circleGroups[i].hasLayer(item.circle)) {
                this.circleGroups[i].removeLayer(item.circle);
            }
            item.marker = null;
            item.circle = null;
        }
        removeEventListener(item: Item): void {
            item.marker.off("click");
            item.marker.off("popupclose");
            item.marker.off("popupopen");
            item.marker.off("dragstart");
            item.marker.off("drag");
            item.marker.off("dragend");
        }
        getIsSelectable(): boolean {
            return this.isSelectable;
        }
        setIsSelectable(isSelectable: boolean): void {
            this.isSelectable = isSelectable;
        }
        addEventListener(item: Item): void {
            var that: MarkersView = this;
            item.marker.on("click", function () {
                if (that.isSelectable) {
                    if (!FMV.getUIView().getIsLocked() || item.get("type") == ItemType.None) {
                        this.openPopup();
                        FMV.getUIView().render();
                    }
                }
            });
            item.marker.on("popupclose", function () {

            });
            item.marker.on("popupopen", function () {
                if (that.isSelectable) {
                    FMC.setSelectedItem(item);
                    that.render();
                    that.activateMarker(item);
                }
            });
            item.marker.on("dragstart", function (event) {

            });
            item.marker.on("drag", function (event) {
                item.circle.setLatLng(item.marker.getLatLng());
            });
            item.marker.on("dragend", function (event) {
                if (item.get("type") == ItemType.None || item.id == undefined) {	// new item
                    item.set({ lat: item.marker.getLatLng().lat, lng: item.marker.getLatLng().lng });
                } else {                                    // existing item
                    item.save(
                        { lat: item.marker.getLatLng().lat, lng: item.marker.getLatLng().lng },
                        {
                            wait: true,
                            success: function (model, response) {
                                FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewMarkerSaveSuccessMsg());
                            },
                            error: function (error) {
                                FMV.getMsgView().renderError(FML.getViewMarkerSaveErrorMsg());
                            }
                        }
                    );
                }
                // update ui if UIMode is Info or Add
                if (FMV.getUIView().getMode() == UIMode.INFO || FMV.getUIView().getMode() == UIMode.ADD) {
                    FMV.getUIView().$("#item-info-lat").val(item.marker.getLatLng().lat.toString());
                    FMV.getUIView().$("#item-info-lng").val(item.marker.getLatLng().lng.toString());
                }
                // open popup
                if (item.marker != null) {
                    item.marker.openPopup();
                }
            });
        }
        activateMarker(item: Item): void {
            var that: MarkersView = this;
            $.each(FMM.getItems().models, function (index: number, item: Item) {
                if (item.marker != null && item.circle != null) {
                    if (FMC.getSelectedItem() == item) {
                        FMV.getMapView().SetIsMapPanZoomAvailable(false);
                        item.marker.bounce(
                            { duration: 200, height: 10 },
                            function () {
                                item.marker.setOpacity(FMS.getFullAlpha());
                                item.circle.setStyle({ fillOpacity: FMS.getActiveAlpha() });
                                var i: number = that.getIndexOfMarkerGroups1(item);
                                that.markerGroups[i].bringToFront();
                                that.circleGroups[i].bringToFront();
                                FMV.getMapView().SetIsMapPanZoomAvailable(true);
                                item.marker.dragging.enable();
                                /*
                                // double click for focus event
                                item.marker.off("dblclick");
                                item.marker.on("dblclick", function () {
                                    if (FMC.getSelectedItem() == item) {
                                        FMC.getRouter().navigate('map/' + FMS.getLocateZoom() + "/" + parseFloat(item.get("lat")) + "/" + parseFloat(item.get("lng")), { trigger: true, replace: true });
                                    }
                                });
                                */
                            });
                    } else {
                        item.marker.off("dblclick");
                        item.marker.dragging.disable();
                        item.marker.setOpacity(FMS.getInactiveAlpha());
                        item.circle.setStyle({ fillOpacity: FMS.getInactiveAlpha() });
                    }
                }
            });
        }
        inactiveMarkers(): void {
            var that: MarkersView = this;
            if (FMC.hasSelectedItem()) {
                FMC.getSelectedItem().marker.closePopup();
            }
            FMC.setSelectedItem(null);
            FMV.getUIView().hide();
            $.each(FMM.getItems().models, function (index: number, item: Item) {
                if (item.marker != null && item.circle != null) {
                    item.marker.off("dblclick");
                    item.marker.dragging.disable();
                    item.marker.setOpacity(FMS.getInactiveAlpha());
                    item.circle.setStyle({ fillOpacity: FMS.getInactiveAlpha() });
                }
            });
        }
        renderLayers(layers: Array<boolean>): void {
            var that: MarkersView = this;
            $.each(layers, function (index: number, value: boolean) {
                if (value != undefined) {
                    var i = that.getIndexOfMarkerGroups2(index);
                    if (value) {
                        FMV.getMapView().getMap().addLayer(that.circleGroups[i]);
                        FMV.getMapView().getMap().addLayer(that.markerGroups[i]);
                    } else {
                        if (FMV.getMapView().getMap().hasLayer(that.circleGroups[i])) {
                            FMV.getMapView().getMap().removeLayer(that.circleGroups[i]);
                        }
                        if (FMV.getMapView().getMap().hasLayer(that.markerGroups[i])) {
                            FMV.getMapView().getMap().removeLayer(that.markerGroups[i]);
                        }
                    }
                }
            });
        }
    }
}