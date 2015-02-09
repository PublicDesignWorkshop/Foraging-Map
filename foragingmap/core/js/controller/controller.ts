/// <reference path="..\..\..\Scripts\typings\jquery\jquery.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="router.ts" />
/// <reference path="..\view\view.ts" />

module ForagingMap {
    export class Controller {
        private router: ForagingMap.Router;
        private selectedItem: Item;
        constructor() {
            // intialize router
            this.router = new ForagingMap.Router();
        }
        initialize(): void {
            // intialize view
            FMV = new ForagingMap.View({ el: $("#fm-view-main") });
            // intialize model
            FMM = new ForagingMap.Model();
            // fetch layer info
            FMC.fetchLayers();
            FMC.addKeyEventListener();
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
            var that: Controller = this;
            FMM.getThresholds().fetch({
                remove: false,	// if remove == false, it only adds new items, not removing old items.
                processData: true,
                data: {
                    pids: pids,
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
        removeItem(item: Item): Item {
            FMM.getItems().remove(item);
            return item;
        }
    }
}