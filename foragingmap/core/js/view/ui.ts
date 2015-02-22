/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="menu.ts" />
enum UIMode {
    NONE, ADD, INFO, DATA, PICTURE, LAYER, THRESHOLD
}

module ForagingMap {
    export class UIView extends Backbone.View<Backbone.Model> {
        private files: any;
        private mode: UIMode;
        private isLayerCollapsedIn: boolean;
        private isLocked: boolean;
        private isOpen: boolean;
        private layerHeaderList: Array<boolean>;
        private layerBodyList: Array<boolean>;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            this.setIsLocked(false);
            this.setMode(UIMode.NONE);
            this.resize();
            this.hide();
            this.createLayerCheckList();
            this.isLayerCollapsedIn = false;
        }
        createLayerCheckList(): void {
            this.layerHeaderList = new Array<boolean>();
            this.layerHeaderList[1] = true;    // Fruit
            //this.layerHeaderList[2] = true;    // Station
            this.layerBodyList = new Array<boolean>();
            this.layerBodyList[0] = true;
        }
        updateLayerCheckList(): void {
            var that: UIView = this;
            $.each(FMM.getLayers().models, function (index: number, model: Layer) {
                if (that.layerBodyList[parseInt(model.get("id"))] == null) {
                    that.layerBodyList[parseInt(model.get("id"))] = true;
                }
            });
        }
        updateLayer(): void {
            FMV.getMapView().getMarkersView().renderLayers(this.layerBodyList);
        }
        setMode(mode: UIMode): void {
            this.mode = mode;
            if (this.mode == UIMode.ADD) {
                this.setIsLocked(true);
            } else {
                this.setIsLocked(false);
            }
        }
        getMode(): UIMode {
            return this.mode;
        }
        resize(): void {
            if (FMV.getOrigWidth() < 540) {
                this.$el.css({ width: FMV.getOrigWidth() - 40 });
            }
        }
        show(mode: UIMode): void {
            this.setMode(mode);
            this.setIsOpen(true);
            this.$el.removeClass("hidden");
            this.render();
        }
        hide(): void {
            this.setMode(UIMode.NONE);
            this.setIsOpen(false);
            this.$el.addClass("hidden");
            this.setIsLocked(false);
            if (FMV.getMapView().getMap()) {
                FMV.getMapView().getMap().dragging.enable();
            }
        }
        setIsLocked(isLocked: boolean): void {
            this.isLocked = isLocked;
        }
        getIsLocked(): boolean {
            return this.isLocked;
        }
        setIsOpen(isOpen: boolean): void {
            this.isOpen = isOpen;
        }
        getIsOpen(): boolean {
            return this.isOpen;
        }
        getOuterWidth(): number {
            return this.$el.outerWidth();
        }
        render(): any {
            switch (this.mode) {
                case UIMode.NONE:
                    break;
                case UIMode.INFO:
                    this.renderUIInfo();
                    break;
                case UIMode.DATA:
                    this.renderUIData();
                    break;
                case UIMode.ADD:
                    this.renderUIAdd();
                    break;
                case UIMode.THRESHOLD:
                    this.renderUIThreshold();
                    break;
                case UIMode.PICTURE:
                    this.renderUIPicture();
                    break;
                case UIMode.LAYER:
                    this.renderUILayer();
                    break;
                default:
                    break;
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        renderUIInfo(): void {
            var that: UIView = this;
            var template = _.template(FMUIInfoLayerTemplate);
            var data = {
                "header": FML.getViewUIInfoHeader(),
                "id": FMC.getSelectedItem().get("id"),
                "name": FMC.getSelectedItem().get("name"),
                "desc": FMC.getSelectedItem().get("desc"),
                "serial": FMC.getSelectedItem().get("serial"),
                "amount": FMC.getSelectedItem().get("amount"),
                "type": FMC.getSelectedItem().get("type"),
                "sort": FMC.getSelectedItem().get("sort"),
                "lat": FMC.getSelectedItem().get("lat"),
                "lng": FMC.getSelectedItem().get("lng"),
                "regdate": FMC.getSelectedItem().get("regdate"),
                "update": FMC.getSelectedItem().get("update"),
                "sort1": FMM.getLayers().where({ type: 1 }),
                //"sort2": FMM.getLayers().where({ type: 2 }),
            };
            that.$el.html(template(data));
            // render type selection
            that.$('#item-info-type').selectpicker();
            that.$('#item-info-type option').each(function () {
                if ((FMC.getSelectedItem().get("type") == $(this).attr("data-type")) && (FMC.getSelectedItem().get("sort") == $(this).attr("data-sort"))) {
                    that.$('#item-info-type').selectpicker("val", $(this).val());
                }
            });
            // remove event listeners
            that.$("#item-info-amount").off("change");
            that.$("#item-info-lat").off("change");
            that.$("#item-info-lng").off("change");
            that.$("#item-info-btn-edit").off("click");
            that.$("#item-info-btn-delete").off("click");
            that.$("#item-info-date-picker").off("dp.change");
            // add event listeners
            that.$("#item-info-amount").on("change", function () {
                FMC.getSelectedItem().save(
                    {
                        amount: parseFloat($(this).val()),
                    },
                    {
                        wait: true,
                        success: function (model: Item, response: any) {
                            FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                        },
                    });
            });
            that.$("#item-info-lat").on("change", function () {
                FMC.getSelectedItem().save(
                    {
                        lat: parseFloat($(this).val()),
                    },
                    {
                        wait: true,
                        success: function (model: Item, response: any) {
                            FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                        },
                    });
            });
            that.$("#item-info-lng").on("change", function () {
                FMC.getSelectedItem().save(
                    {
                        lng: parseFloat($(this).val()),
                    },
                    {
                        wait: true,
                        success: function (model: Item, response: any) {
                            FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                        },
                    });
            });

            //item-info-qrcode
            that.$('input[type=file]').off('change');
            that.$('input[type=file]').on('change', that.executeDecode);

            /*
            that.$('#item-info-type').on("change", function () {
                var optionSelected = $("option:selected", this);
                FMV.getMapView().getMarkersView().removeMarker(FMC.getSelectedItem());
                FMC.getSelectedItem().set({ type: parseInt(optionSelected.attr("data-type")) });
                FMC.getSelectedItem().set({ sort: parseInt(optionSelected.attr("data-sort")) });
                FMV.getMapView().getMarkersView().render();
            });
            */
            /*
            that.$("#item-info-date-picker").datetimepicker({
                format: FMS.getDateTimeFormat(),
            });
            that.$("#item-info-date-picker").on("dp.change", function () {
                FMC.getSelectedItem().set({ update: $(this).data('date') });
            });
            */
            // save & delete
            that.$("#item-info-btn-edit").on("click", function () {
                var tempSerial = that.$("#item-info-serial").val();
                var optionSelected = $("option:selected", that.$('#item-info-type'));
                if (parseInt(optionSelected.attr("data-type")) != 0 && parseInt(optionSelected.attr("data-sort")) != 0) {
                    FMV.getMapView().getMarkersView().removeMarker(FMC.getSelectedItem());
                    FMC.getSelectedItem().save(
                        {
                            id: that.$("#item-info-id").val(),
                            name: that.$("#item-info-name").val(),
                            desc: that.$("#item-info-desc").val(),
                            serial: that.$("#item-info-serial").val(),
                            type: parseInt(optionSelected.attr("data-type")),
                            sort: parseInt(optionSelected.attr("data-sort")),
                            amount: that.$("#item-info-amount").val(),
                            lat: that.$("#item-info-lat").val(),
                            lng: that.$("#item-info-lng").val(),
                        },
                        {
                            wait: true,
                            success: function (model: Item, response: any) {
                                FMV.getMapView().getMarkersView().render();
                                FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                            },
                            error: function (model: Item, error: any) {
                                //console.log("error");
                                if (error.responseText.indexOf("Duplicate:") > -1) {
                                    var name: string = error.responseText.replace("Duplicate:", "");
                                    that.render();
                                    FMV.getMapView().getMarkersView().render();
                                    FMV.getMsgView().renderError("'" + tempSerial +  "' is already registered in '" + name + "'");
                                } else {
                                    that.render();
                                    FMV.getMapView().getMarkersView().render();
                                    FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                                }
                            },
                        });
                } else {
                    FMV.getMsgView().renderError(FML.getViewUIAddTypeSelectError());
                }

            });
            that.$("#item-info-btn-delete").on("click", function () {
                var r = confirm(FML.getViewUIInfoDeleteConfirmMsg());
                if (r == true) {
                    FMC.getSelectedItem().destroy({
                        wait: true,
                        success: function (model: Item, response: any) {
                            model.setIsRemoved(true);
                            FMM.getItems().remove(model);
                            FMV.getMapView().getMarkersView().removeMarker(model);
                            FMV.getMapView().getControlView().resetControls();
                            FMV.getUIView().hide();
                            FMV.getMapView().resize(false);
                            FMV.getMapView().getMarkersView().render();
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoDeleteSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getMsgView().renderError(FML.getViewUIInfoDeleteErrorMsg());
                        },
                    });
                }
            });
        }

        executeDecode(event: any): void {
            var that: UIView = this;
            that.files = event.target.files;
            //console.log(that.files);
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
                    $("#item-info-serial").val(result);
                    //FMV.getMenuView().setSerial(result);
                    //console.log(FMV.getMenuView().getSerial());
                }

            };

            reader.readAsDataURL(that.files[0]);
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        renderUIAdd(): void {
            var that: UIView = this;
            var template = _.template(FMUIAddLayerTemplate);
            var data = {
                "header": FML.getViewUIAddHeader(),
                "name": FMC.getSelectedItem().get("name"),
                "desc": FMC.getSelectedItem().get("desc"),
                "serial": FMC.getSelectedItem().get("serial"),
                "amount": FMC.getSelectedItem().get("amount"),
                "type": FMC.getSelectedItem().get("type"),
                "sort": FMC.getSelectedItem().get("sort"),
                "lat": FMC.getSelectedItem().get("lat"),
                "lng": FMC.getSelectedItem().get("lng"),
                "sort1": FMM.getLayers().where({ type: 1 }),
                //"sort2": FMM.getLayers().where({ type: 2 }),
            };
            that.$el.html(template(data));
            // render type selection
            that.$('#item-info-type').selectpicker();
            // remove event listeners
            that.$("#item-info-amount").off("change");
            that.$("#item-info-lat").off("change");
            that.$("#item-info-lng").off("change");
            that.$("#item-info-btn-edit").off("click");
            that.$("#item-info-btn-delete").off("click");
            // add event listeners
            that.$("#item-info-amount").on("change", function () {
                FMC.getSelectedItem().set({ amount: parseFloat($(this).val()) });
                FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
            });
            that.$("#item-info-lat").on("change", function () {
                FMC.getSelectedItem().set({ lat: parseFloat($(this).val()) });
                FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
            });
            that.$("#item-info-lng").on("change", function () {
                FMC.getSelectedItem().set({ lng: parseFloat($(this).val()) });
                FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
            });
            that.$('#item-info-type').on("change", function () {
                var optionSelected = $("option:selected", this);
                FMC.getSelectedItem().set({ type: parseInt(optionSelected.attr("data-type")) });
                FMC.getSelectedItem().set({ sort: parseInt(optionSelected.attr("data-sort")) });
            });
            that.$("#item-info-btn-edit").on("click", function () {
                if (FMC.getSelectedItem().get("type") == ItemType.None) {
                    FMV.getMsgView().renderError(FML.getViewUIAddTypeSelectError());
                } else {
                    FMC.getSelectedItem().setIsRemoved(true);
                    FMV.getMapView().getMarkersView().removeMarker(FMC.getSelectedItem());
                    FMC.getSelectedItem().save(
                        {
                            name: that.$("#item-info-name").val(),
                            desc: that.$("#item-info-desc").val(),
                            serial: that.$("#item-info-serial").val(),
                            amount: that.$("#item-info-amount").val(),
                        },
                        {
                            wait: true,
                            success: function (model: Item, response: any) {
                                FMV.getMapView().getControlView().resetControls();
                                if (FMC.hasSelectedItem()) {
                                    FMV.getUIView().hide();
                                    FMV.getMapView().resize(false);
                                    FMC.getSelectedItem().setIsRemoved(false);
                                    FMV.getMapView().getMarkersView().render();
                                    FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                                }
                            },
                            error: function (error) {
                                that.render();
                                FMC.getSelectedItem().set("type", ItemType.None);
                                FMC.getSelectedItem().setIsRemoved(false);
                                FMV.getMapView().getMarkersView().render();
                                FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                            },
                        }
                    );
                }
            });

            //item-info-qrcode
            that.$('input[type=file]').off('change');
            that.$('input[type=file]').on('change', that.executeDecode);

            that.$("#item-info-btn-delete").on("click", function () {
                FMV.getMapView().getControlView().resetControls();
                if (FMC.hasSelectedItem()) {
                    var item = FMC.removeItem(FMC.getSelectedItem());
                    item.setIsRemoved(true);
                    FMV.getMapView().getMarkersView().removeMarker(item);
                    FMC.setSelectedItem(null);
                    FMV.getUIView().hide();
                    FMV.getMapView().resize(false);
                }
            });
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        renderUIData(): void {
            var that: UIView = this;
            var template = _.template(FMViewUIDataLayerTemplate);
            var data = {
                "header": FML.getViewUIDataHeader(),
            };
            that.$el.html(template(data));
            // Grid instance for data
            var gridData = new Backgrid.Grid({
                columns: dataColumn,
                collection: new Bends(FMM.getBends().where({ pid: FMC.getSelectedItem().id })),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("date", "descending");
            that.$(".ui-body").append(gridData.el);
            // Grid instance for add Data
            var bend: Bend = new Bend({ pid: parseInt(FMC.getSelectedItem().get("id")), type: BendType.Normal, date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            bend.setIsSavable(false);
            var bends: Bends = new Bends();
            bends.add(bend);
            var gridAddData = new Backgrid.Grid({
                columns: dataAddColumn,
                collection: bends,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });

            that.$("#date-add-panel").append(gridAddData.render().el);
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        renderUIThreshold(): void {
            var that: UIView = this;
            var template = _.template(FMViewUIThresholdLayerTemplate);
            var data = {
                "header": FML.getViewUIThresholdHeader(),
            };
            that.$el.html(template(data));

            // Grid instance for data
            var gridData = new Backgrid.Grid({
                columns: thresholdColumn,
                collection: new Bends(FMM.getThresholds().where({ pid: FMC.getSelectedItem().id })),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("date", "descending");
            that.$(".ui-body").append(gridData.el);

            // Grid instance for add Data
            var threshold: Threshold = new Threshold({ pid: parseInt(FMC.getSelectedItem().get("id")), type: ThresholdType.Normal, date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            threshold.setIsSavable(false);
            var thresholds: Thresholds = new Thresholds();
            thresholds.add(threshold);
            var gridAddData = new Backgrid.Grid({
                columns: thresholdAddColumn,
                collection: thresholds,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });

            that.$("#threshold-add-panel").append(gridAddData.render().el);
            /*
            
            // Grid instance for add Data
            var bend: Bend = new Bend({ pid: parseInt(FMC.getSelectedItem().get("id")), type: BendType.Normal, date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            bend.setIsSavable(false);
            var bends: Bends = new Bends();
            bends.add(bend);
            var gridAddData = new Backgrid.Grid({
                columns: dataAddColumn,
                collection: bends,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });

            that.$("#date-add-panel").append(gridAddData.render().el);
            */
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        renderUIPicture(): void {
            FMC.fetchPictures(parseInt(FMC.getSelectedItem().get('id')));

            var that: UIView = this;
            var template = _.template(FMViewUILayerPictureTemplate);
            var data = {
                "header": FML.getViewUIPictureHeader(),
            };
            that.$el.html(template(data));
            // Grid instance for data
            
            var gridData = new Backgrid.Grid({
                columns: pictureColumn,
                collection: FMM.getPictures(),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("date", "descending");
            that.$(".ui-body").append(gridData.el);
            setTimeout(function () {
                gridData.sort("date", "descending");
            }, 3000);
            // Grid instance for add Picture
            var picture: Picture = new Picture({ pid: parseInt(FMC.getSelectedItem().get("id")), date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            picture.setIsSavable(false);
            var pictures: Pictures = new Pictures();
            pictures.add(picture);
            var gridAddData = new Backgrid.Grid({
                columns: pictureAddColumn,
                collection: pictures,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });

            that.$("#picture-add-panel").append(gridAddData.render().el);
            
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        renderUILayer(): void {
            var that: UIView = this;
            var isIn: string = "";
            if (that.isLayerCollapsedIn) {
                isIn = "in";
            }
            var template = _.template(FMViewLayerTemplate);
            var data = {
                "header": FML.getViewUILayerHeader(),
                "isIn": isIn,
                "sort1": FMM.getLayers().where({ type: 1 }),
                //"sort2": FMM.getLayers().where({ type: 2 }),
            };
            that.$el.html(template(data));
            that.updateLayerCheckList();
            if (that.layerHeaderList[1]) {
                $("#check-event-layer").prop({ "checked": true });
            } else {
                $("#check-event-layer").prop({ "checked": false });
            }
            if (that.layerHeaderList[2]) {
                $("#check-organization-layer").prop({ "checked": true });
            } else {
                $("#check-organization-layer").prop({ "checked": false });
            }
            if (that.layerHeaderList[3]) {
                $("#check-donor-layer").prop({ "checked": true });
            } else {
                $("#check-donor-layer").prop({ "checked": false });
            }

            $("#check-event-layer").click(function () {
                that.layerHeaderList[1] = $(this).prop("checked");
                if ($(this).prop("checked")) {
                    $('input[type="checkbox"][data-type="' + 1 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": true });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                } else {
                    $('input[type="checkbox"][data-type="' + 1 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": false });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                }
            });
            $("#check-organization-layer").click(function () {
                that.layerHeaderList[2] = $(this).prop("checked");
                if ($(this).prop("checked")) {
                    $('input[type="checkbox"][data-type="' + 2 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": true });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                } else {
                    $('input[type="checkbox"][data-type="' + 2 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": false });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                }
            });
            $("#check-donor-layer").click(function () {
                that.layerHeaderList[3] = $(this).prop("checked");
                if ($(this).prop("checked")) {
                    $('input[type="checkbox"][data-type="' + 3 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": true });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                } else {
                    $('input[type="checkbox"][data-type="' + 3 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": false });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                }
            });
            if (that.layerBodyList[0]) {
                $("#check-unassigned-layer").prop({ "checked": true });
            } else {
                $("#check-unassigned-layer").prop({ "checked": false });
            }
            $("#check-unassigned-layer").click(function () {
                that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
            });
            $('input[type="checkbox"]', that.$el).each(function (index: number, element: any) {
                if (that.layerBodyList[parseInt($(this).attr("data-sort"))]) {
                    $(this).prop({ "checked": true });
                } else {
                    $(this).prop({ "checked": false });
                }
            });
            $('input[type="checkbox"]', that.$el).click(function () {
                that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                that.updateLayer();
            });
            // collapsed in
            that.$('button[data-target="#layer-add-panel"]').click(function () {
                that.isLayerCollapsedIn = !that.isLayerCollapsedIn;
            });
            // Grid instance for data
            layerColumn[0].cell = Backgrid.SelectCell.extend({
                optionValues: FMM.getIcons().toArray(),
            })
            
            var gridData = new Backgrid.Grid({
                columns: layerColumn,
                collection: FMM.getLayers(),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("name", "ascending");
            that.$(".ui-body #layer-list-grid").append(gridData.el);
            // Grid instance for adding
            layerAddColumn[0].cell = Backgrid.SelectCell.extend({
                optionValues: FMM.getIcons().toArray(),
            })
            
            var layer: Layer = new Layer({ name: "", desc: "", type: 1, icon: "marker-blank.png" });
            layer.setIsSavable(false);
            var layers: Layers = new Layers();
            layers.add(layer);
            var gridAddData = new Backgrid.Grid({
                columns: layerAddColumn,
                collection: layers,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            that.$(".ui-body #layer-add-grid").append(gridAddData.render().el);
        }
    }
}

declare var dataColumn;
declare var dataAddColumn;
declare var pictureColumn;
declare var pictureAddColumn;
declare var thresholdColumn;
declare var thresholdAddColumn;
declare var layerColumn;
declare var layerAddColumn;