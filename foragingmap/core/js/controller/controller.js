var ForagingMap;
(function (ForagingMap) {
    var Controller = (function () {
        function Controller() {
            this.router = new ForagingMap.Router();
        }
        Controller.prototype.initialize = function () {
            FMV = new ForagingMap.View({ el: $("#fm-view-main") });
            FMM = new ForagingMap.Model();
            FMC.fetchLayers();
            FMC.addKeyEventListener();
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
                    if (FMV.getUIView().getMode() != UIMode.ADD) {
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
                type: ItemType.None,
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
        Controller.prototype.removeItem = function (item) {
            FMM.getItems().remove(item);
            return item;
        };
        return Controller;
    })();
    ForagingMap.Controller = Controller;
})(ForagingMap || (ForagingMap = {}));
