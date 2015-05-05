var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var MenuView = (function (_super) {
        __extends(MenuView, _super);
        function MenuView(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.resize();
            this.hide();
        }
        MenuView.prototype.setLocation = function (lat, lng) {
            this.lat = lat;
            this.lng = lng;
        };
        MenuView.prototype.setSerial = function (serial) {
            var that = this;
            that.serial = serial;
        };
        MenuView.prototype.getSerial = function () {
            var that = this;
            return that.serial;
        };
        MenuView.prototype.show = function () {
            this.setIsOpen(true);
            this.$el.removeClass("hidden");
            this.render();
        };
        MenuView.prototype.hide = function () {
            this.setIsOpen(false);
            this.$el.addClass("hidden");
            if (FMV.getMapView().getMap()) {
                FMV.getMapView().getMap().dragging.enable();
            }
        };
        MenuView.prototype.setIsOpen = function (isOpen) {
            this.isOpen = isOpen;
        };
        MenuView.prototype.getIsOpen = function () {
            return this.isOpen;
        };
        MenuView.prototype.resize = function () {
            if (FMV.getOrigWidth() < 540) {
                this.$el.css({ width: FMV.getOrigWidth() });
            }
            this.$el.css({ height: FMV.getOrigHeight() - 55 });
        };
        MenuView.prototype.toggle = function () {
            if (this.getIsOpen()) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        MenuView.prototype.render = function () {
            var that = this;
            var template = _.template(FMMenuTemplate);
            var data = {
                username: FMC.getUser().get("username"),
                isAdmin: FMC.getUser().getIsAdmin(),
            };
            that.$el.html(template(data));
            that.$('input[type=file]').off('change');
            that.$('input[type=file]').on('change', that.executeDecode);
            var timeInterval = FMV.getSliderView().getTimeInterval();
            if (timeInterval == 1) {
                that.$('#btn-menu-slider-1').removeClass('btn-default').addClass('btn-primary');
            }
            else if (timeInterval == 60) {
                that.$('#btn-menu-slider-60').removeClass('btn-default').addClass('btn-primary');
            }
            else if (timeInterval == 60 * 60) {
                that.$('#btn-menu-slider-3600').removeClass('btn-default').addClass('btn-primary');
            }
            else if (timeInterval == 60 * 60 * 24) {
                that.$('#btn-menu-slider-24').removeClass('btn-default').addClass('btn-primary');
            }
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
                }
                else if (that.lat != undefined && that.lng != undefined && that.serial != null) {
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
            that.$('#btn-menu-login').off('click');
            that.$('#btn-menu-login').on('click', function () {
                FMC.getUser().fetch({
                    remove: false,
                    processData: true,
                    data: {
                        username: that.$('#input-menu-login-username').val(),
                        password: that.$('#input-menu-login-password').val(),
                    },
                    success: function (model, response) {
                        if (model.get('auth') == 0) {
                            FMV.getMsgView().renderError("Failed to log in.");
                        }
                        else {
                            FMC.getRouter().refresh();
                        }
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError("Failed to log in.");
                    },
                });
            });
            that.$('#btn-menu-logout').off('click');
            that.$('#btn-menu-logout').on('click', function () {
                FMC.getUser().fetch({
                    remove: false,
                    processData: true,
                    data: {
                        logout: true,
                    },
                    success: function (model, response) {
                        FMC.getRouter().refresh();
                    },
                    error: function (error) {
                        FMC.getRouter().refresh();
                    },
                });
            });
            that.$('#btn-menu-slider-1').off('click');
            that.$('#btn-menu-slider-1').on('click', function () {
                that.$('#btn-menu-slider-1').removeClass('btn-default').addClass('btn-primary');
                that.$('#btn-menu-slider-60').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-3600').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-24').removeClass('btn-primary').addClass('btn-default');
                FMV.getSliderView().setTimeInterval(1);
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });
            });
            that.$('#btn-menu-slider-60').off('click');
            that.$('#btn-menu-slider-60').on('click', function () {
                that.$('#btn-menu-slider-60').removeClass('btn-default').addClass('btn-primary');
                that.$('#btn-menu-slider-1').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-3600').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-24').removeClass('btn-primary').addClass('btn-default');
                FMV.getSliderView().setTimeInterval(60);
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });
            });
            that.$('#btn-menu-slider-3600').off('click');
            that.$('#btn-menu-slider-3600').on('click', function () {
                that.$('#btn-menu-slider-3600').removeClass('btn-default').addClass('btn-primary');
                that.$('#btn-menu-slider-1').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-60').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-24').removeClass('btn-primary').addClass('btn-default');
                FMV.getSliderView().setTimeInterval(60 * 60);
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });
            });
            that.$('#btn-menu-slider-24').off('click');
            that.$('#btn-menu-slider-24').on('click', function () {
                that.$('#btn-menu-slider-24').removeClass('btn-default').addClass('btn-primary');
                that.$('#btn-menu-slider-1').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-60').removeClass('btn-primary').addClass('btn-default');
                that.$('#btn-menu-slider-3600').removeClass('btn-primary').addClass('btn-default');
                FMV.getSliderView().setTimeInterval(60 * 60 * 24);
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });
            });
        };
        MenuView.prototype.createNewItem = function (position) {
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
        };
        MenuView.prototype.executeDecode = function (event) {
            var that = this;
            that.files = event.target.files;
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
                }
            };
            reader.readAsDataURL(that.files[0]);
        };
        MenuView.prototype.getPosition = function (position) {
            FMV.getMenuView().setLocation(position.coords.latitude, position.coords.longitude);
            itemColumn[1].cell = Backgrid.SelectCell.extend({
                optionValues: FMM.getLayers().toArray(),
            });
            var gridData = new Backgrid.Grid({
                columns: itemColumn,
                collection: FMM.getItems().getNearItems(position.coords.latitude, position.coords.longitude),
                emptyText: FML.getViewUIDataNoDataMsg(),
            });
            gridData.render();
            gridData.sort("name", "ascending");
            FMV.getMenuView().$("#item-near-loc").html(gridData.el);
            FMC.getRouter().navigate('map/' + FMS.getLocateZoom() + "/" + position.coords.latitude + "/" + position.coords.longitude + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: true, replace: true });
        };
        return MenuView;
    })(Backbone.View);
    ForagingMap.MenuView = MenuView;
})(ForagingMap || (ForagingMap = {}));
var qrcode;
var itemColumn;
