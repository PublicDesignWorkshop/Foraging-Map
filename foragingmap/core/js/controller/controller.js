var ForagingMap;
(function (ForagingMap) {
    var Controller = (function () {
        function Controller() {
            this.router = new ForagingMap.Router();
            this.user = new ForagingMap.User({ username: "Guest", name: "Guest", auth: 0 });
        }
        Controller.prototype.initialize = function () {
            FMC.getUser().fetch({
                remove: false,
                processData: true,
                data: {
                    logout: false,
                },
                success: function (model, response) {
                    console.log(model);
                    FMV = new ForagingMap.View({ el: $("#fm-view-main") });
                    FMM = new ForagingMap.Model();
                    FMC.fetchIcons();
                    FMC.fetchLayers();
                    FMC.addKeyEventListener();
                },
                error: function (error) {
                    console.log("error");
                    FMV = new ForagingMap.View({ el: $("#fm-view-main") });
                    FMM = new ForagingMap.Model();
                    FMC.fetchIcons();
                    FMC.fetchLayers();
                    FMC.addKeyEventListener();
                },
            });
        };
        Controller.prototype.getUser = function () {
            return this.user;
        };
        Controller.prototype.getRouter = function () {
            return this.router;
        };
        Controller.prototype.setSelectedItem = function (item) {
            this.selectedItem = item;
        };
        Controller.prototype.getSelectedItem = function () {
            return this.selectedItem;
        };
        Controller.prototype.hasSelectedItem = function () {
            if (this.selectedItem != null) {
                return true;
            }
            return false;
        };
        Controller.prototype.addKeyEventListener = function () {
            $(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    if (FMV.getUIView().getMode() != 1 /* ADD */) {
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                        FMV.getMapView().getMarkersView().inactiveMarkers();
                        FMV.getMapView().getControlView().resetControls();
                    }
                }
            });
        };
        Controller.prototype.fetchLayers = function () {
            FMM.getLayers().fetch({
                remove: false,
                processData: true,
                success: function (collection, response, options) {
                    console.log("success fetch with " + collection.models.length + " layers");
                    FMV.render();
                    Backbone.history.start();
                },
                error: function (collection, jqxhr, options) {
                },
            });
        };
        Controller.prototype.fetchItems = function (bounds) {
            var that = this;
            FMM.getItems().fetch({
                remove: false,
                processData: true,
                data: {
                    south: bounds.getSouthEast().lat,
                    north: bounds.getNorthEast().lat,
                    west: bounds.getSouthWest().lng,
                    east: bounds.getSouthEast().lng,
                },
                success: function (collection, response, options) {
                    console.log("success fetch with " + collection.models.length + " items");
                    FMV.getMapView().getMarkersView().render();
                    that.fetchBends(FMM.getItems().getIdsToString());
                },
                error: function (collection, jqxhr, options) {
                }
            });
        };
        Controller.prototype.fetchBends = function (pids) {
            var that = this;
            FMM.getBends().fetch({
                remove: false,
                processData: true,
                data: {
                    pids: pids,
                },
                success: function (collection, response, options) {
                    console.log("success fetch with " + collection.models.length + " bends");
                    that.fetchThresholds(FMM.getItems().getIdsToString());
                },
                error: function (collection, jqxhr, options) {
                }
            });
        };
        Controller.prototype.fetchThresholds = function (pids) {
            var that = this;
            FMM.getThresholds().fetch({
                remove: false,
                processData: true,
                data: {
                    pids: pids,
                },
                success: function (collection, response, options) {
                    console.log("success fetch with " + collection.models.length + " thresholds");
                    FMV.getMapView().getMarkersView().render();
                    if (!FMV.getSliderView().getIsDraggable()) {
                        FMV.getSliderView().setIsDraggable(true);
                    }
                    if (!FMV.getMapView().getMarkersView().getIsSelectable()) {
                        FMV.getMapView().getMarkersView().setIsSelectable(true);
                    }
                },
                error: function (collection, jqxhr, options) {
                }
            });
        };
        Controller.prototype.fetchPictures = function (pid) {
            FMM.getPictures().fetch({
                remove: true,
                processData: true,
                data: {
                    pid: pid,
                },
                success: function (collection, response, options) {
                    console.log("success fetch with " + collection.models.length + " pictures");
                },
                error: function (collection, jqxhr, options) {
                }
            });
        };
        Controller.prototype.createItem = function () {
            var item = new ForagingMap.Item({
                name: FML.getViewUIAddTempName(),
                desc: "",
                serial: "",
                type: 0 /* None */,
                sort: 0,
                amount: 0,
                lat: FMV.getMapView().getMap().getCenter().lat,
                lng: FMV.getMapView().getMap().getCenter().lng,
                regdate: moment(new Date()).format(FMS.getDateTimeFormat()),
                update: moment(new Date()).format(FMS.getDateTimeFormat()),
            });
            FMM.getItems().add(item);
            return item;
        };
        Controller.prototype.createItemWithInfo = function (latitude, longitude, serialnumber) {
            var item = new ForagingMap.Item({
                name: FML.getViewUIAddTempName(),
                desc: "",
                serial: serialnumber,
                type: 0 /* None */,
                sort: 0,
                amount: 0,
                lat: latitude,
                lng: longitude,
                regdate: moment(new Date()).format(FMS.getDateTimeFormat()),
                update: moment(new Date()).format(FMS.getDateTimeFormat()),
            });
            FMM.getItems().add(item);
            return item;
        };
        Controller.prototype.removeItem = function (item) {
            FMM.getItems().remove(item);
            return item;
        };
        Controller.prototype.fetchIcons = function () {
            $.each(FMS.getMarkerIcons(), function (index, item) {
                FMM.getIcons().add(new ForagingMap.Icon({ name: item.name, src: item.src }));
            });
            $.each(FMM.getIcons().models, function (index, model) {
                model.icon = new L.Icon({
                    iconUrl: ForagingMap.Setting.BASE_URL + FMS.getImageDir() + model.get("src"),
                    shadowUrl: ForagingMap.Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                    iconSize: new L.Point(40, 40),
                    iconAnchor: new L.Point(20, 40),
                    shadowAnchor: new L.Point(9, 38),
                    popupAnchor: new L.Point(0, -40),
                });
            });
        };
        return Controller;
    })();
    ForagingMap.Controller = Controller;
})(ForagingMap || (ForagingMap = {}));
