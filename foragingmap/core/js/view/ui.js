var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var UIMode;
(function (UIMode) {
    UIMode[UIMode["NONE"] = 0] = "NONE";
    UIMode[UIMode["ADD"] = 1] = "ADD";
    UIMode[UIMode["INFO"] = 2] = "INFO";
    UIMode[UIMode["DATA"] = 3] = "DATA";
    UIMode[UIMode["PICTURE"] = 4] = "PICTURE";
    UIMode[UIMode["LAYER"] = 5] = "LAYER";
    UIMode[UIMode["THRESHOLD"] = 6] = "THRESHOLD";
})(UIMode || (UIMode = {}));
var ForagingMap;
(function (ForagingMap) {
    var UIView = (function (_super) {
        __extends(UIView, _super);
        function UIView(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.setIsLocked(false);
            this.setMode(0 /* NONE */);
            this.resize();
            this.hide();
            this.createLayerCheckList();
            this.isLayerCollapsedIn = false;
        }
        UIView.prototype.createLayerCheckList = function () {
            this.layerHeaderList = new Array();
            this.layerHeaderList[1] = true;
            this.layerBodyList = new Array();
            this.layerBodyList[0] = true;
        };
        UIView.prototype.updateLayerCheckList = function () {
            var that = this;
            $.each(FMM.getLayers().models, function (index, model) {
                if (that.layerBodyList[parseInt(model.get("id"))] == null) {
                    that.layerBodyList[parseInt(model.get("id"))] = true;
                }
            });
        };
        UIView.prototype.updateLayer = function () {
            FMV.getMapView().getMarkersView().renderLayers(this.layerBodyList);
        };
        UIView.prototype.setMode = function (mode) {
            this.mode = mode;
            if (this.mode == 1 /* ADD */) {
                this.setIsLocked(true);
            }
            else {
                this.setIsLocked(false);
            }
        };
        UIView.prototype.getMode = function () {
            return this.mode;
        };
        UIView.prototype.resize = function () {
            if (FMV.getOrigWidth() < 540) {
                this.$el.css({ width: FMV.getOrigWidth() - 40 });
            }
        };
        UIView.prototype.show = function (mode) {
            this.setMode(mode);
            this.setIsOpen(true);
            this.$el.removeClass("hidden");
            this.render();
        };
        UIView.prototype.hide = function () {
            this.setMode(0 /* NONE */);
            this.setIsOpen(false);
            this.$el.addClass("hidden");
            this.setIsLocked(false);
            if (FMV.getMapView().getMap()) {
                FMV.getMapView().getMap().dragging.enable();
            }
        };
        UIView.prototype.setIsLocked = function (isLocked) {
            this.isLocked = isLocked;
        };
        UIView.prototype.getIsLocked = function () {
            return this.isLocked;
        };
        UIView.prototype.setIsOpen = function (isOpen) {
            this.isOpen = isOpen;
        };
        UIView.prototype.getIsOpen = function () {
            return this.isOpen;
        };
        UIView.prototype.getOuterWidth = function () {
            return this.$el.outerWidth();
        };
        UIView.prototype.render = function () {
            switch (this.mode) {
                case 0 /* NONE */:
                    break;
                case 2 /* INFO */:
                    this.renderUIInfo();
                    break;
                case 3 /* DATA */:
                    this.renderUIData();
                    break;
                case 1 /* ADD */:
                    this.renderUIAdd();
                    break;
                case 6 /* THRESHOLD */:
                    this.renderUIThreshold();
                    break;
                case 4 /* PICTURE */:
                    this.renderUIPicture();
                    break;
                case 5 /* LAYER */:
                    this.renderUILayer();
                    break;
                default:
                    break;
            }
        };
        UIView.prototype.renderUIInfo = function () {
            var that = this;
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
            };
            that.$el.html(template(data));
            that.$('#item-info-type').selectpicker();
            that.$('#item-info-type option').each(function () {
                if ((FMC.getSelectedItem().get("type") == $(this).attr("data-type")) && (FMC.getSelectedItem().get("sort") == $(this).attr("data-sort"))) {
                    that.$('#item-info-type').selectpicker("val", $(this).val());
                }
            });
            that.$("#item-info-amount").off("change");
            that.$("#item-info-lat").off("change");
            that.$("#item-info-lng").off("change");
            that.$("#item-info-btn-edit").off("click");
            that.$("#item-info-btn-delete").off("click");
            that.$("#item-info-date-picker").off("dp.change");
            that.$("#item-info-amount").on("change", function () {
                FMC.getSelectedItem().save({
                    amount: parseFloat($(this).val()),
                }, {
                    wait: true,
                    success: function (model, response) {
                        FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
                        FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
            that.$("#item-info-lat").on("change", function () {
                FMC.getSelectedItem().save({
                    lat: parseFloat($(this).val()),
                }, {
                    wait: true,
                    success: function (model, response) {
                        FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
                        FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
            that.$("#item-info-lng").on("change", function () {
                FMC.getSelectedItem().save({
                    lng: parseFloat($(this).val()),
                }, {
                    wait: true,
                    success: function (model, response) {
                        FMV.getMapView().getMarkersView().updateMarker(FMC.getSelectedItem());
                        FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
            that.$('input[type=file]').off('change');
            that.$('input[type=file]').on('change', that.executeDecode);
            that.$("#item-info-btn-edit").on("click", function () {
                var tempSerial = that.$("#item-info-serial").val();
                var optionSelected = $("option:selected", that.$('#item-info-type'));
                if (parseInt(optionSelected.attr("data-type")) != 0 && parseInt(optionSelected.attr("data-sort")) != 0) {
                    FMV.getMapView().getMarkersView().removeMarker(FMC.getSelectedItem());
                    FMC.getSelectedItem().save({
                        id: that.$("#item-info-id").val(),
                        name: that.$("#item-info-name").val(),
                        desc: that.$("#item-info-desc").val(),
                        serial: that.$("#item-info-serial").val(),
                        type: parseInt(optionSelected.attr("data-type")),
                        sort: parseInt(optionSelected.attr("data-sort")),
                        amount: that.$("#item-info-amount").val(),
                        lat: that.$("#item-info-lat").val(),
                        lng: that.$("#item-info-lng").val(),
                    }, {
                        wait: true,
                        success: function (model, response) {
                            FMV.getMapView().getMarkersView().render();
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                        },
                        error: function (model, error) {
                            console.log("error");
                            if (error.responseText.indexOf("Duplicate:") > -1) {
                                var name = error.responseText.replace("Duplicate:", "");
                                that.render();
                                FMV.getMapView().getMarkersView().render();
                                FMV.getMsgView().renderError("'" + tempSerial + "' is already registered in '" + name + "'");
                            }
                            else {
                                that.render();
                                FMV.getMapView().getMarkersView().render();
                                FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                            }
                        },
                    });
                }
                else {
                    FMV.getMsgView().renderError(FML.getViewUIAddTypeSelectError());
                }
            });
            that.$("#item-info-btn-delete").on("click", function () {
                var r = confirm(FML.getViewUIInfoDeleteConfirmMsg());
                if (r == true) {
                    FMC.getSelectedItem().destroy({
                        wait: true,
                        success: function (model, response) {
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
        };
        UIView.prototype.executeDecode = function (event) {
            var that = this;
            that.files = event.target.files;
            console.log(that.files);
            var reader = new FileReader();
            reader.onload = function (event) {
                qrcode.decode(event.target.result);
            };
            qrcode.callback = function (result) {
                if (result == "error decoding QR Code") {
                    FMV.getMsgView().renderError("Failed to decode QR Code.");
                }
                else {
                    FMV.getMsgView().renderSuccess("Serial Number: " + result);
                    FMV.getMenuView().setSerial(result);
                    $("#item-info-serial").val(result);
                    console.log(FMV.getMenuView().getSerial());
                }
            };
            reader.readAsDataURL(that.files[0]);
        };
        UIView.prototype.renderUIAdd = function () {
            var that = this;
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
            };
            that.$el.html(template(data));
            that.$('#item-info-type').selectpicker();
            that.$("#item-info-amount").off("change");
            that.$("#item-info-lat").off("change");
            that.$("#item-info-lng").off("change");
            that.$("#item-info-btn-edit").off("click");
            that.$("#item-info-btn-delete").off("click");
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
                if (FMC.getSelectedItem().get("type") == 0 /* None */) {
                    FMV.getMsgView().renderError(FML.getViewUIAddTypeSelectError());
                }
                else {
                    FMC.getSelectedItem().setIsRemoved(true);
                    FMV.getMapView().getMarkersView().removeMarker(FMC.getSelectedItem());
                    FMC.getSelectedItem().save({
                        name: that.$("#item-info-name").val(),
                        desc: that.$("#item-info-desc").val(),
                        serial: that.$("#item-info-serial").val(),
                        amount: that.$("#item-info-amount").val(),
                    }, {
                        wait: true,
                        success: function (model, response) {
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
                            FMC.getSelectedItem().set("type", 0 /* None */);
                            FMC.getSelectedItem().setIsRemoved(false);
                            FMV.getMapView().getMarkersView().render();
                            FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                        },
                    });
                }
            });
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
        };
        UIView.prototype.renderUIData = function () {
            var that = this;
            var template = _.template(FMViewUIDataLayerTemplate);
            var data = {
                "header": FML.getViewUIDataHeader(),
            };
            that.$el.html(template(data));
            var gridData = new Backgrid.Grid({
                columns: dataColumn,
                collection: new ForagingMap.Bends(FMM.getBends().where({ pid: FMC.getSelectedItem().id })),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("date", "descending");
            that.$(".ui-body").append(gridData.el);
            var bend = new ForagingMap.Bend({ pid: parseInt(FMC.getSelectedItem().get("id")), type: 1 /* Normal */, date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            bend.setIsSavable(false);
            var bends = new ForagingMap.Bends();
            bends.add(bend);
            var gridAddData = new Backgrid.Grid({
                columns: dataAddColumn,
                collection: bends,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            that.$("#date-add-panel").append(gridAddData.render().el);
        };
        UIView.prototype.renderUIThreshold = function () {
            var that = this;
            var template = _.template(FMViewUIThresholdLayerTemplate);
            var data = {
                "header": FML.getViewUIThresholdHeader(),
            };
            that.$el.html(template(data));
            var gridData = new Backgrid.Grid({
                columns: thresholdColumn,
                collection: new ForagingMap.Bends(FMM.getThresholds().where({ pid: FMC.getSelectedItem().id })),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("date", "descending");
            that.$(".ui-body").append(gridData.el);
            var threshold = new ForagingMap.Threshold({ pid: parseInt(FMC.getSelectedItem().get("id")), type: 1 /* Normal */, date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            threshold.setIsSavable(false);
            var thresholds = new ForagingMap.Thresholds();
            thresholds.add(threshold);
            var gridAddData = new Backgrid.Grid({
                columns: thresholdAddColumn,
                collection: thresholds,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            that.$("#threshold-add-panel").append(gridAddData.render().el);
        };
        UIView.prototype.renderUIPicture = function () {
            FMC.fetchPictures(parseInt(FMC.getSelectedItem().get('id')));
            var that = this;
            var template = _.template(FMViewUILayerPictureTemplate);
            var data = {
                "header": FML.getViewUIPictureHeader(),
            };
            that.$el.html(template(data));
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
            var picture = new ForagingMap.Picture({ pid: parseInt(FMC.getSelectedItem().get("id")), date: moment(new Date()).format(FMS.getDateTimeFormat()), update: moment(new Date()).format(FMS.getDateTimeFormat()) });
            picture.setIsSavable(false);
            var pictures = new ForagingMap.Pictures();
            pictures.add(picture);
            var gridAddData = new Backgrid.Grid({
                columns: pictureAddColumn,
                collection: pictures,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            that.$("#picture-add-panel").append(gridAddData.render().el);
        };
        UIView.prototype.renderUILayer = function () {
            var that = this;
            var isIn = "";
            if (that.isLayerCollapsedIn) {
                isIn = "in";
            }
            var template = _.template(FMViewLayerTemplate);
            var data = {
                "header": FML.getViewUILayerHeader(),
                "isIn": isIn,
                "sort1": FMM.getLayers().where({ type: 1 }),
            };
            that.$el.html(template(data));
            that.updateLayerCheckList();
            if (that.layerHeaderList[1]) {
                $("#check-event-layer").prop({ "checked": true });
            }
            else {
                $("#check-event-layer").prop({ "checked": false });
            }
            if (that.layerHeaderList[2]) {
                $("#check-organization-layer").prop({ "checked": true });
            }
            else {
                $("#check-organization-layer").prop({ "checked": false });
            }
            if (that.layerHeaderList[3]) {
                $("#check-donor-layer").prop({ "checked": true });
            }
            else {
                $("#check-donor-layer").prop({ "checked": false });
            }
            $("#check-event-layer").click(function () {
                that.layerHeaderList[1] = $(this).prop("checked");
                if ($(this).prop("checked")) {
                    $('input[type="checkbox"][data-type="' + 1 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": true });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                }
                else {
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
                }
                else {
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
                }
                else {
                    $('input[type="checkbox"][data-type="' + 3 + '"]', that.$el).each(function () {
                        $(this).prop({ "checked": false });
                        that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                    });
                }
            });
            if (that.layerBodyList[0]) {
                $("#check-unassigned-layer").prop({ "checked": true });
            }
            else {
                $("#check-unassigned-layer").prop({ "checked": false });
            }
            $("#check-unassigned-layer").click(function () {
                that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
            });
            $('input[type="checkbox"]', that.$el).each(function (index, element) {
                if (that.layerBodyList[parseInt($(this).attr("data-sort"))]) {
                    $(this).prop({ "checked": true });
                }
                else {
                    $(this).prop({ "checked": false });
                }
            });
            $('input[type="checkbox"]', that.$el).click(function () {
                that.layerBodyList[parseInt($(this).attr("data-sort"))] = $(this).prop("checked");
                that.updateLayer();
            });
            that.$('button[data-target="#layer-add-panel"]').click(function () {
                that.isLayerCollapsedIn = !that.isLayerCollapsedIn;
            });
            layerColumn[0].cell = Backgrid.SelectCell.extend({
                optionValues: FMM.getIcons().toArray(),
            });
            var gridData = new Backgrid.Grid({
                columns: layerColumn,
                collection: FMM.getLayers(),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("name", "ascending");
            that.$(".ui-body #layer-list-grid").append(gridData.el);
            layerAddColumn[0].cell = Backgrid.SelectCell.extend({
                optionValues: FMM.getIcons().toArray(),
            });
            var layer = new ForagingMap.Layer({ name: "", desc: "", type: 1, icon: "marker-blank.png" });
            layer.setIsSavable(false);
            var layers = new ForagingMap.Layers();
            layers.add(layer);
            var gridAddData = new Backgrid.Grid({
                columns: layerAddColumn,
                collection: layers,
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            that.$(".ui-body #layer-add-grid").append(gridAddData.render().el);
        };
        return UIView;
    })(Backbone.View);
    ForagingMap.UIView = UIView;
})(ForagingMap || (ForagingMap = {}));
