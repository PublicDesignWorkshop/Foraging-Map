module ForagingMap {
    export class MenuView extends Backbone.View<Backbone.Model> {
        private isOpen: boolean;
        private files: any;
        private serial: String;
        private lat: number;
        private lng: number;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            this.resize();
            this.hide();
        }
        setLocation(lat: number, lng: number): void {
            this.lat = lat;
            this.lng = lng;
        }
        setSerial(serial: string): void {
            var that: MenuView = this;
            that.serial = serial;
            console.log(that.serial);
        }
        getSerial(): String {
            var that: MenuView = this;
            console.log(that.serial);
            return that.serial;
        }
        show(): void {
            this.setIsOpen(true);
            this.$el.removeClass("hidden");
            /*
            if (FMV.getUIView().getMode() != UIMode.ADD) {
                FMV.getUIView().hide();
                FMV.getMapView().resize(false);
                FMV.getMapView().getMarkersView().inactiveMarkers();
                FMV.getMapView().getControlView().resetControls();
            }
            */
            this.render();
        }
        hide(): void {
            this.setIsOpen(false);
            this.$el.addClass("hidden");
            if (FMV.getMapView().getMap()) {
                FMV.getMapView().getMap().dragging.enable();
            }
        }
        setIsOpen(isOpen: boolean): void {
            this.isOpen = isOpen;
        }
        getIsOpen(): boolean {
            return this.isOpen;
        }
        resize(): void {
            if (FMV.getOrigWidth() < 540) {
                this.$el.css({ width: FMV.getOrigWidth() });
            }
            this.$el.css({ height: FMV.getOrigHeight() - 56 });
        }
        toggle(): void {
            if (this.getIsOpen()) {
                this.hide();
            } else {
                this.show();
            }
        }
        render(): any {
            var that: MenuView = this;
            var template = _.template(FMMenuTemplate);
            var data = {

            };
            that.$el.html(template(data));

            that.$('input[type=file]').off('change');
            that.$('input[type=file]').on('change', that.executeDecode);

            
            /*
            that.$('#item-near-loc').on('hide.bs.collapse', function (event: Event) {
                event.preventDefault();
            });
            */

            that.$('#btn-near-loc').off('click');
            that.$('#btn-near-loc').on('click', function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(that.getPosition);
                }
            });

            that.$('#btn-menu-register-sensor').off('click');
            that.$('#btn-menu-register-sensor').on('click', function () {
                if (that.lat == undefined && that.lng == undefined && that.serial != null) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(that.createNewItem);
                    }
                } else if (that.lat != undefined && that.lng != undefined && that.serial != null) {
                    FMV.getMapView().getControlView().resetControls();
                    FMV.getMapView().getControlView().$(".control-button.add").addClass("add-active");
                    FMC.setSelectedItem(FMC.createItemWithInfo(that.lat, that.lng, that.serial));
                    FMV.getUIView().show(UIMode.ADD);
                    FMV.getMapView().resize(true);
                    setTimeout(function () {
                        FMV.getMapView().getMarkersView().render();
                    }, 500);
                    that.hide();
                }
            });
        }

        createNewItem(position: Position) {
            FMV.getMenuView().setLocation(position.coords.latitude, position.coords.longitude);
            FMV.getMapView().getControlView().resetControls();
            FMV.getMapView().getControlView().$(".control-button.add").addClass("add-active");
            FMC.setSelectedItem(FMC.createItemWithInfo(FMV.getMenuView().lat, FMV.getMenuView().lng, FMV.getMenuView().serial));
            FMV.getUIView().show(UIMode.ADD);
            FMV.getMapView().resize(true);
            setTimeout(function () {
                FMV.getMapView().getMarkersView().render();
            }, 500);
            FMV.getMenuView().hide();
        }

        executeDecode(event: any): void {
            var that: MenuView = this;
            that.files = event.target.files;
            var reader: FileReader = new FileReader();

            reader.onload = function (event: FileEvent) {
                qrcode.decode(event.target.result);
            };
            qrcode.callback = function (result) {
                if (result == "error decoding QR Code") {
                    FMV.getMsgView().renderError("Failed to decode QR Code.");
                } else {
                    FMV.getMsgView().renderSuccess("Serial Number: " + result);
                    FMV.getMenuView().setSerial(result);
                    console.log(FMV.getMenuView().getSerial());
                }
                
            };

            reader.readAsDataURL(that.files[0]);
        }

        getPosition(position: Position) {
            FMV.getMenuView().setLocation(position.coords.latitude, position.coords.longitude);
            //alert(position.coords.latitude + " | " + position.coords.longitude);

            // Grid instance for data
            itemColumn[1].cell = Backgrid.SelectCell.extend({
                optionValues: FMM.getLayers().toArray(),
            })

            var gridData = new Backgrid.Grid({
                columns: itemColumn,
                collection: FMM.getItems().getNearItems(position.coords.latitude, position.coords.longitude),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("name", "ascending");

            FMV.getMenuView().$("#item-near-loc").html(gridData.el);

            /*
            //FMC.getRouter().navigate('map/' + FMS.getLocateZoom() + "/" + position.coords.latitude + "/" + position.coords.longitude, { trigger: true, replace: true });
            FMC.getRouter().navigate('map/' + FMS.getLocateZoom() + "/" + position.coords.latitude + "/" + position.coords.longitude + "/" + FMV.getSliderView().getTimeInterval()
                + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });

            FMV.getMsgView().renderSuccess(FML.getViewUILocateSuccessMsg());
            */
        }

    }
}

interface FileEvent extends Event {
    target: FileEventTarget;
}

interface FileEventTarget extends EventTarget {
    result: any;
}

var qrcode: any;

var itemColumn: any;