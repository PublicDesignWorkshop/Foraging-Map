var ForagingMap;
(function (ForagingMap) {
    /**
     * Controller - intializes MVC variables and handles fetching data from the server.
     */
    var Controller = (function () {
        function Controller() {
            // Intialize router.
            this.router = new ForagingMap.Router();
            // Initialize the user as a Guest.
            this.user = new ForagingMap.User({ username: "Guest", name: "Guest", auth: 0 });
        }
        Controller.prototype.initialize = function () {
            FMC.getUser().fetch({
                remove: false,
                processData: true,
                data: {
                    logout: false,
                },
                // Execute when it finds the login information.
                success: function (model, response) {
                    // Intialize view.
                    FMV = new ForagingMap.View({ el: $("#fm-view-main") });
                    // Intialize model.
                    FMM = new ForagingMap.Model();
                    // Fetch Sensor values.
                    FMC.fetchSensors();
                },
                // Execute when it can't find any login information.
                error: function (error) {
                    console.log("Login as a guest permission.");
                    // intialize view.
                    FMV = new ForagingMap.View({ el: $("#fm-view-main") });
                    // intialize model.
                    FMM = new ForagingMap.Model();
                    // Fetch Sensor values.
                    FMC.fetchSensors();
                },
            });
        };
        // Return User instance.
        Controller.prototype.getUser = function () {
            return this.user;
        };
        // Return Router instance.
        Controller.prototype.getRouter = function () {
            return this.router;
        };
        // Set selected item.
        Controller.prototype.setSelectedItem = function (item) {
            this.selectedItem = item;
        };
        // Return selected item.
        Controller.prototype.getSelectedItem = function () {
            return this.selectedItem;
        };
        // Check whether user select item or not. Other functions use this function to decide what UI will show on the screen.
        Controller.prototype.hasSelectedItem = function () {
            if (this.selectedItem != null) {
                return true;
            }
            return false;
        };
        // Add keyboard listener.
        Controller.prototype.addKeyEventListener = function () {
            $(document).keyup(function (e) {
                // Add esc key listener to deselect item.
                if (e.keyCode == 27) {
                    if (FMV.getUIView().getMode() != UIMode.ADD) {
                        FMV.getUIView().hide(); // Hide UI.
                        FMV.getMapView().resize(false); // Resize Map since UI the size of map changes since UI is hidden.
                        FMV.getMapView().getMarkersView().inactiveMarkers(); // Change marker to inactive style.
                        FMV.getMapView().getControlView().resetControls(); // Reset Right control pannel.
                    }
                }
            });
        };
        // Fetch layer data from the server.
        Controller.prototype.fetchLayers = function () {
            FMM.getLayers().fetch({
                remove: false,
                processData: true,
                success: function (collection, response, options) {
                    console.log("Fetched " + collection.models.length + " layers.");
                    // Render whole View
                    FMV.render();
                    // start tracking history - This is Backbone thing to keep track of url history & parse the url into map center location, start and end date of progress bar, etc.
                    Backbone.history.start();
                },
                error: function (collection, jqxhr, options) {
                    console.log("Error while fetching layer data from the server.");
                },
            });
        };
        // Fetch item (tree) data from the server.
        Controller.prototype.fetchItems = function (bounds) {
            var that = this;
            FMM.getItems().fetch({
                remove: false,
                processData: true,
                data: {
                    // Passing boundary lat / lng to the server to update only item within the boundary, but it's not currently used for now.
                    south: bounds.getSouthEast().lat,
                    north: bounds.getNorthEast().lat,
                    west: bounds.getSouthWest().lng,
                    east: bounds.getSouthEast().lng,
                    type: parseInt(FMM.getSensors().getCurType().get("id")),
                },
                success: function (collection, response, options) {
                    console.log("Fetched " + collection.models.length + " items.");
                    // Update markers after fetching items from the server.
                    FMV.getMapView().getMarkersView().render();
                    // Update bend data after updating items.
                    that.fetchBends(FMM.getItems().getIdsToString());
                },
                error: function (collection, jqxhr, options) {
                    console.log("Error while fetching item data from the server.");
                }
            });
        };
        // Fetch sensor values from the server with item ids (pids).
        Controller.prototype.fetchBends = function (pids) {
            var that = this;
            FMM.getBends().fetch({
                remove: false,
                processData: true,
                data: {
                    pids: pids,
                    type: parseInt(FMM.getSensors().getCurType().get("id")),
                },
                success: function (collection, response, options) {
                    console.log("Fetched " + collection.models.length + " sensor values.");
                    that.fetchThresholds(FMM.getItems().getIdsToString());
                },
                error: function (collection, jqxhr, options) {
                    console.log("Error while fetching sensor data from the server.");
                }
            });
        };
        // Fetch threshold values from the server with item ids (pids).
        Controller.prototype.fetchThresholds = function (pids) {
            console.log(parseInt(FMM.getSensors().getCurType().get("id")));
            var that = this;
            FMM.getThresholds().fetch({
                remove: false,
                processData: true,
                data: {
                    pids: pids,
                    type: parseInt(FMM.getSensors().getCurType().get("id")),
                },
                success: function (collection, response, options) {
                    console.log("Fetched " + collection.models.length + " thresholds.");
                    FMV.getMapView().getMarkersView().render();
                    if (!FMV.getSliderView().getIsDraggable()) {
                        FMV.getSliderView().setIsDraggable(true);
                    }
                    if (!FMV.getMapView().getMarkersView().getIsSelectable()) {
                        FMV.getMapView().getMarkersView().setIsSelectable(true);
                    }
                },
                error: function (collection, jqxhr, options) {
                    console.log("Error while fetching threshold data from the server.");
                }
            });
        };
        // Fetch pictures of item using item id (pid).
        Controller.prototype.fetchPictures = function (pid) {
            FMM.getPictures().fetch({
                remove: true,
                processData: true,
                data: {
                    pid: pid,
                },
                success: function (collection, response, options) {
                    console.log("Fetched " + collection.models.length + " pictures.");
                },
                error: function (collection, jqxhr, options) {
                    console.log("Error while fetching picture data from the server.");
                }
            });
        };
        // Create new tree item (it will be executed when user click the 'Add New Tree' button in mapcontrols).
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
        // Create new tree item with location & sensor serial number (it will be executed when user adds item through menu & qr code).
        Controller.prototype.createItemWithInfo = function (latitude, longitude, serialnumber) {
            var item = new ForagingMap.Item({
                name: FML.getViewUIAddTempName(),
                desc: "",
                serial: serialnumber,
                type: ItemType.None,
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
        // Remove item from Items collection
        Controller.prototype.removeItem = function (item) {
            FMM.getItems().remove(item);
            return item;
        };
        // Create tree icon collection.
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
        // Fetch sensor type from the server.
        Controller.prototype.fetchSensors = function () {
            FMM.getSensors().fetch({
                success: function (collection, response, options) {
                    console.log("success fetch with " + collection.models.length + " sensors");
                    FMM.getSensors().intializeCurType();
                    // fetch layer info.
                    FMC.fetchIcons();
                    FMC.fetchLayers();
                    FMC.addKeyEventListener();
                },
                error: function (collection, jqxhr, options) {
                    console.log("Error while fetching sensor type data from the server.");
                }
            });
        };
        // Reset data when user changes the sensor type.
        Controller.prototype.resetData = function () {
            $.each(FMM.getItems().models, function (index, item) {
                FMV.getMapView().getMarkersView().removeMarker(item);
            });
            FMM.getItems().reset();
            FMM.getBends().reset();
            FMM.getThresholds().reset();
            FMV.getUIView().hide();
            FMV.getMapView().resize(false);
            FMV.getMapView().getControlView().resetControls();
        };
        return Controller;
    })();
    ForagingMap.Controller = Controller;
})(ForagingMap || (ForagingMap = {}));
