/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />
/// <reference path="..\model\item.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var MarkersView = (function (_super) {
        __extends(MarkersView, _super);
        function MarkersView(options) {
            _super.call(this, options);
            var that = this;
            this.isSelectable = false;
            // initialize marker layer groups
            that.markerGroups = new Array();
            that.circleGroups = new Array();
            var circleGroup = new L.FeatureGroup();
            var markerGroup = new L.FeatureGroup();
            circleGroup.sid = 0;
            markerGroup.sid = 0;
            that.markerGroups.push(circleGroup);
            that.circleGroups.push(markerGroup);
            $.each(FMM.getLayers().models, function (index, model) {
                var circleGroup = new L.FeatureGroup();
                var markerGroup = new L.FeatureGroup();
                circleGroup.sid = parseInt(model.id);
                markerGroup.sid = parseInt(model.id);
                that.markerGroups.push(circleGroup);
                that.circleGroups.push(markerGroup);
            });
            $.each(that.markerGroups, function (index, iLayer) {
                iLayer.addTo(FMV.getMapView().getMap());
            });
            $.each(that.circleGroups, function (index, iLayer) {
                iLayer.addTo(FMV.getMapView().getMap());
            });
            // intialize icon
            this.iconNew = new L.Icon({
                iconUrl: ForagingMap.Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerNew(),
                shadowUrl: ForagingMap.Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                iconSize: new L.Point(40, 40),
                iconAnchor: new L.Point(20, 40),
                shadowAnchor: new L.Point(9, 38),
                popupAnchor: new L.Point(0, -40),
            });
        }
        // Rendering markers on the map
        MarkersView.prototype.render = function () {
            var that = this;
            // Iterate all items on the map
            $.each(FMM.getItems().models, function (index, item) {
                if (!item.getIsRemoved()) {
                    // Create a new marker if a marker of item doesn't exist on the map
                    if (item.marker == null && item.circle == null) {
                        console.log("create new marker with type: " + (item.get("type")));
                        // Marker type: None (unregistered Item or new item)
                        if (item.get("type") == 0 /* None */) {
                            item.marker = new L.Marker(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), {
                                icon: that.iconNew,
                                draggable: false,
                                riseOnHover: true,
                            }).bindPopup(item.get("name"), {
                                closeButton: true,
                            });
                            item.circle = new L.Circle(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), parseFloat(item.get("amount")) * FMS.getCircleRadiusMultiplier(), {
                                color: FMS.getTempCircleColor(),
                                fillColor: FMS.getTempCircleColor(),
                                fillOpacity: FMS.getInactiveAlpha(),
                                weight: 1,
                            });
                        }
                        else {
                            var layer = FMM.getLayers().findWhere({ id: item.get("sort") });
                            var icon = FMM.getIcons().findWhere({ src: layer.get("icon") });
                            item.marker = new L.Marker(new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng"))), {
                                icon: icon.icon,
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
                        }
                        item.marker.setOpacity(FMS.getHalfAlpha());
                        var i = that.getIndexOfMarkerGroups1(item);
                        that.markerGroups[i].addLayer(item.marker);
                        that.circleGroups[i].addLayer(item.circle);
                        // event listeners
                        that.removeEventListener(item);
                        that.addEventListener(item);
                        // update marker
                        that.updateMarker(item);
                    }
                    else {
                        // update marker
                        that.updateMarker(item);
                    }
                }
            });
            if (FMC.getSelectedItem() != null && FMC.getSelectedItem().marker != null) {
                FMC.getSelectedItem().marker.openPopup();
            }
        };
        MarkersView.prototype.getIndexOfMarkerGroups1 = function (item) {
            var that = this;
            if (item.id == undefined) {
                return 0;
            }
            var result = 0;
            $.each(that.markerGroups, function (index, iLayer) {
                if (iLayer.sid == parseInt(item.get("sort"))) {
                    result = index;
                    return result;
                }
            });
            return result;
        };
        MarkersView.prototype.getIndexOfMarkerGroups2 = function (id) {
            var that = this;
            var result = 0;
            $.each(that.markerGroups, function (index, iLayer) {
                if (iLayer.sid == id) {
                    result = index;
                    return result;
                }
            });
            return result;
        };
        MarkersView.prototype.getIndexOfMarkerGroups3 = function (layer) {
            var that = this;
            if (layer.id == undefined) {
                return 0;
            }
            var result = 0;
            $.each(that.markerGroups, function (index, iLayer) {
                if (iLayer.sid == parseInt(layer.id)) {
                    result = index;
                    return result;
                }
            });
            return result;
        };
        MarkersView.prototype.createNewMarkerLayer = function (layer) {
            var that = this;
            var circleGroup = new L.FeatureGroup();
            var markerGroup = new L.FeatureGroup();
            circleGroup.sid = parseInt(layer.id);
            markerGroup.sid = parseInt(layer.id);
            that.markerGroups.push(circleGroup);
            that.circleGroups.push(markerGroup);
        };
        MarkersView.prototype.updateMarker = function (item) {
            if (!FMC.getUser().getIsAdmin()) {
                item.marker.dragging.disable();
            }
            item.marker.setPopupContent(item.get("name"));
            var latlng = new L.LatLng(parseFloat(item.get("lat")), parseFloat(item.get("lng")));
            item.marker.setLatLng(latlng);
            item.circle.setLatLng(latlng);
            item.circle.setRadius(parseFloat(item.get("amount")) * FMS.getCircleRadiusMultiplier());
            if (item.circle != null && item.get("sort") != 0) {
                var ratio = FMM.getBendRatio(item);
                if (ratio == Number.MIN_VALUE) {
                    item.circle.setStyle({ color: FMS.getTempCircleColor(), fillColor: FMS.getTempCircleFillColor(), opacity: 0.25 });
                }
                else {
                    var hVal = FMS.getLowValueColor() + ratio * (FMS.getHighValueColor() - FMS.getLowValueColor());
                    var lVal = 50;
                    if (ratio > 1) {
                        lVal = 50 - (ratio - 1) * 35;
                    }
                    else {
                        lVal = 50;
                    }
                    var color = 'hsl(' + hVal + ', 90%, ' + lVal + '%)';
                    item.circle.setStyle({ color: color, fillColor: color });
                }
            }
        };
        MarkersView.prototype.removeMarker = function (item) {
            var i = this.getIndexOfMarkerGroups1(item);
            if (item.marker != null && this.markerGroups[i].hasLayer(item.marker)) {
                this.markerGroups[i].removeLayer(item.marker);
            }
            if (item.circle != null && this.circleGroups[i].hasLayer(item.circle)) {
                this.circleGroups[i].removeLayer(item.circle);
            }
            item.marker = null;
            item.circle = null;
        };
        MarkersView.prototype.removeMarkers = function (layer) {
            var that = this;
            var i = FMV.getMapView().getMarkersView().getIndexOfMarkerGroups3(layer);
            $.each(FMM.getItems().models, function (index, item) {
                if (item.marker != null && that.markerGroups[i].hasLayer(item.marker)) {
                    that.markerGroups[i].removeLayer(item.marker);
                    item.marker = null;
                }
                if (item.circle != null && that.circleGroups[i].hasLayer(item.circle)) {
                    that.circleGroups[i].removeLayer(item.circle);
                    item.circle = null;
                }
            });
        };
        MarkersView.prototype.removeEventListener = function (item) {
            item.marker.off("click");
            item.marker.off("popupclose");
            item.marker.off("popupopen");
            item.marker.off("dragstart");
            item.marker.off("drag");
            item.marker.off("dragend");
        };
        MarkersView.prototype.getIsSelectable = function () {
            return this.isSelectable;
        };
        MarkersView.prototype.setIsSelectable = function (isSelectable) {
            this.isSelectable = isSelectable;
        };
        MarkersView.prototype.addEventListener = function (item) {
            var that = this;
            item.marker.on("click", function () {
                if (that.isSelectable) {
                    if (!FMV.getUIView().getIsLocked() || item.get("type") == 0 /* None */) {
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
                if (item.get("type") == 0 /* None */ || item.id == undefined) {
                    item.set({ lat: item.marker.getLatLng().lat, lng: item.marker.getLatLng().lng });
                }
                else {
                    item.save({ lat: item.marker.getLatLng().lat, lng: item.marker.getLatLng().lng }, {
                        success: function (model, response) {
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewMarkerSaveSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getMsgView().renderError(FML.getViewMarkerSaveErrorMsg());
                        }
                    });
                }
                // update ui if UIMode is Info or Add
                if (FMV.getUIView().getMode() == 2 /* INFO */ || FMV.getUIView().getMode() == 1 /* ADD */) {
                    FMV.getUIView().$("#item-info-lat").val(item.marker.getLatLng().lat.toString());
                    FMV.getUIView().$("#item-info-lng").val(item.marker.getLatLng().lng.toString());
                }
                // open popup
                if (item.marker != null) {
                    item.marker.openPopup();
                }
            });
        };
        MarkersView.prototype.activateMarker = function (item) {
            var that = this;
            $.each(FMM.getItems().models, function (index, item) {
                if (item.marker != null && item.circle != null) {
                    if (FMC.getSelectedItem() == item) {
                        FMV.getMapView().SetIsMapPanZoomAvailable(false);
                        item.marker.bounce({ duration: 200, height: 10 }, function () {
                            item.marker.setOpacity(FMS.getFullAlpha());
                            item.circle.setStyle({ fillOpacity: FMS.getActiveAlpha() });
                            var i = that.getIndexOfMarkerGroups1(item);
                            that.markerGroups[i].bringToFront();
                            that.circleGroups[i].bringToFront();
                            FMV.getMapView().SetIsMapPanZoomAvailable(true);
                            if (FMC.getUser().getIsAdmin()) {
                                item.marker.dragging.enable();
                            }
                            /*
                            // double click for focus event
                            item.marker.off("dblclick");
                            item.marker.on("dblclick", function () {
                            });
                            */
                        });
                    }
                    else {
                        item.marker.off("dblclick");
                        item.marker.dragging.disable();
                        item.marker.setOpacity(FMS.getInactiveAlpha());
                        item.circle.setStyle({ fillOpacity: FMS.getInactiveAlpha() });
                    }
                }
            });
        };
        MarkersView.prototype.inactiveMarkers = function () {
            var that = this;
            if (FMC.hasSelectedItem()) {
                FMC.getSelectedItem().marker.closePopup();
            }
            FMC.setSelectedItem(null);
            FMV.getUIView().hide();
            $.each(FMM.getItems().models, function (index, item) {
                if (item.marker != null && item.circle != null) {
                    item.marker.off("dblclick");
                    item.marker.dragging.disable();
                    item.marker.setOpacity(FMS.getInactiveAlpha());
                    item.circle.setStyle({ fillOpacity: FMS.getInactiveAlpha() });
                }
            });
        };
        MarkersView.prototype.renderLayers = function (layers) {
            var that = this;
            $.each(layers, function (index, value) {
                if (value != undefined) {
                    var i = that.getIndexOfMarkerGroups2(index);
                    if (value) {
                        FMV.getMapView().getMap().addLayer(that.circleGroups[i]);
                        FMV.getMapView().getMap().addLayer(that.markerGroups[i]);
                    }
                    else {
                        if (FMV.getMapView().getMap().hasLayer(that.circleGroups[i])) {
                            FMV.getMapView().getMap().removeLayer(that.circleGroups[i]);
                        }
                        if (FMV.getMapView().getMap().hasLayer(that.markerGroups[i])) {
                            FMV.getMapView().getMap().removeLayer(that.markerGroups[i]);
                        }
                    }
                }
            });
        };
        return MarkersView;
    })(Backbone.View);
    ForagingMap.MarkersView = MarkersView;
})(ForagingMap || (ForagingMap = {}));
