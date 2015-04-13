﻿/// <reference path="..\..\..\Scripts\typings\jquery\jquery.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="router.ts" />
/// <reference path="..\view\view.ts" />

module ForagingMap {
    export class Controller {
        private router: ForagingMap.Router;
        private selectedItem: Item;
        private user: User;
        constructor() {
            // intialize router
            this.router = new ForagingMap.Router();
            this.user = new User({ username: "Guest", name: "Guest", auth: 0 });
        }
        initialize(): void {

            FMC.getUser().fetch({
                remove: false,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                data: {
                    logout: false,
                },
                success: function (model: Item, response: any) {
                    console.log(model);
                    // intialize view
                    FMV = new ForagingMap.View({ el: $("#fm-view-main") });
                    // intialize model
                    FMM = new ForagingMap.Model();

                    FMC.fetchSensors();

                    
                },
                error: function (error) {
                    console.log("error");
                    // intialize view
                    FMV = new ForagingMap.View({ el: $("#fm-view-main") });
                    // intialize model
                    FMM = new ForagingMap.Model();
                    // fetch layer info

                    FMC.fetchSensors();
                    /*
                    FMC.fetchIcons();
                    FMC.fetchLayers();
                    FMC.addKeyEventListener();
                    */
                },
            });
        }
        getUser(): User {
            return this.user;
        }
        getRouter(): ForagingMap.Router {
            return this.router;
        }
        setSelectedItem(item: Item): void {
            this.selectedItem = item;
        }
        getSelectedItem(): Item {
            return this.selectedItem;
        }
        hasSelectedItem(): boolean {
            if (this.selectedItem != null) {
                return true;
            }
            return false;
        }
        addKeyEventListener() {
            $(document).keyup(function (e) {
                if (e.keyCode == 27) {   // esc
                    if (FMV.getUIView().getMode() != UIMode.ADD) {
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                        FMV.getMapView().getMarkersView().inactiveMarkers();
                        FMV.getMapView().getControlView().resetControls();
                    }
                }
            });
        }
        fetchLayers(): void {
            FMM.getLayers().fetch({
                remove: false,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                success(collection?: any, response?: any, options?: any): void {
                    console.log("success fetch with " + collection.models.length + " layers");
                    console.log(collection.models);
                    // render view
                    FMV.render();
                    // start routing
                    Backbone.history.start();
                },
                error(collection?: any, jqxhr?: JQueryXHR, options?: any): void {
                    
                },
            });
        }
        fetchItems(bounds: L.LatLngBounds): void {
            var that: Controller = this;
            FMM.getItems().fetch({
                remove: false,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                data: {
                    south: bounds.getSouthEast().lat,
                    north: bounds.getNorthEast().lat,
                    west: bounds.getSouthWest().lng,
                    east: bounds.getSouthEast().lng,
                    type: parseInt(FMM.getSensors().getCurType().get("id")),
                },
                success(collection?: any, response?: any, options?: any): void {
                    console.log("success fetch with " + collection.models.length + " items");
                    FMV.getMapView().getMarkersView().render();
                    that.fetchBends(FMM.getItems().getIdsToString());
                
                    /*
                    $.each(collection.models, function (index: number, model: Backbone.Model) {
                        console.log(model);
                    });
                    */
                },
                error(collection?: any, jqxhr?: JQueryXHR, options?: any): void {

                }
            });
        }

        fetchBends(pids): void {
            var that: Controller = this;
            FMM.getBends().fetch({
                remove: false,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                data: {
                    pids: pids,
                    type: parseInt(FMM.getSensors().getCurType().get("id")),
                },
                success(collection?: any, response?: any, options?: any): void {
                    console.log("success fetch with " + collection.models.length + " bends");
                    that.fetchThresholds(FMM.getItems().getIdsToString());
                    /*
                    $.each(collection.models, function (index: number, model: Backbone.Model) {
                        console.log(model);
                    });
                    */
                },
                error(collection?: any, jqxhr?: JQueryXHR, options?: any): void {

                }
            });
        }
        fetchThresholds(pids): void {
            console.log(parseInt(FMM.getSensors().getCurType().get("id")));
            var that: Controller = this;
            FMM.getThresholds().fetch({
                remove: false,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                data: {
                    pids: pids,
                    type: parseInt(FMM.getSensors().getCurType().get("id")),
                },
                success(collection?: any, response?: any, options?: any): void {
                    console.log("success fetch with " + collection.models.length + " thresholds");
                    FMV.getMapView().getMarkersView().render();
                    if (!FMV.getSliderView().getIsDraggable()) {
                        FMV.getSliderView().setIsDraggable(true);
                    }
                    if (!FMV.getMapView().getMarkersView().getIsSelectable()) {
                        FMV.getMapView().getMarkersView().setIsSelectable(true);
                    }
                    /*
                    $.each(collection.models, function (index: number, model: Backbone.Model) {
                        console.log(model);
                    });
                    */
                },
                error(collection?: any, jqxhr?: JQueryXHR, options?: any): void {

                }
            });
        }
        fetchPictures(pid): void {
            FMM.getPictures().fetch({
                remove: true,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                data: {
                    pid: pid,
                },
                success(collection?: any, response?: any, options?: any): void {
                    console.log("success fetch with " + collection.models.length + " pictures");
                },
                error(collection?: any, jqxhr?: JQueryXHR, options?: any): void {

                }
            });
        }
        createItem(): Item {
            var item: Item = new Item({
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
        }
        createItemWithInfo(latitude: any, longitude: any, serialnumber: any): Item {
            var item: Item = new Item({
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
        }
        removeItem(item: Item): Item {
            FMM.getItems().remove(item);
            return item;
        }
        fetchIcons(): void {
            $.each(FMS.getMarkerIcons(), function (index: number, item: any) {
                FMM.getIcons().add(new Icon({ name: item.name, src: item.src }));
            });
            $.each(FMM.getIcons().models, function (index: number, model: Icon) {
                model.icon = new L.Icon({
                    iconUrl: Setting.BASE_URL + FMS.getImageDir() + model.get("src"),
                    shadowUrl: Setting.BASE_URL + FMS.getImageDir() + FMS.getImageMarkerShadow(),
                    iconSize: new L.Point(40, 40),
                    iconAnchor: new L.Point(20, 40),
                    shadowAnchor: new L.Point(9, 38),
                    popupAnchor: new L.Point(0, -40),
                });
            });
        }
        fetchSensors(): void {
            FMM.getSensors().fetch({
                success(collection?: any, response?: any, options?: any): void {
                    console.log("success fetch with " + collection.models.length + " sensors");
                    /*
                    $.each(collection.models, function (index: number, model: Backbone.Model) {
                        console.log(model);
                    });
                    */
                    FMM.getSensors().intializeCurType();

                    // fetch layer info
                    FMC.fetchIcons();
                    FMC.fetchLayers();
                    FMC.addKeyEventListener();
                },
                error(collection?: any, jqxhr?: JQueryXHR, options?: any): void {

                }
            });
        }

        resetData(): void {
            
            $.each(FMM.getItems().models, function (index: number, item: Item) {
                FMV.getMapView().getMarkersView().removeMarker(item);
            });

            FMM.getItems().reset();
            FMM.getBends().reset();
            FMM.getThresholds().reset();
            FMV.getUIView().hide();
            FMV.getMapView().resize(false);
            FMV.getMapView().getControlView().resetControls();
        }
    }
}