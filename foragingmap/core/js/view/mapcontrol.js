var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var MapControlView = (function (_super) {
        __extends(MapControlView, _super);
        function MapControlView(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.render();
        }
        MapControlView.prototype.render = function () {
            var that = this;
            var template = _.template(FMMapControlViewTemplate);
            var data = {};
            that.$el.html(template(data));
            that.removeEventListener();
            that.addEventListener();
        };
        MapControlView.prototype.removeEventListener = function () {
            var that = this;
            that.$(".control-button").off("mouseenter");
            that.$(".control-button").off("mouseleave");
            that.$(".control-button.zoomin").off("click");
            that.$(".control-button.zoomout").off("click");
            that.$(".control-button.locate").off("click");
            that.$(".control-button.layer").off("click");
            that.$(".control-button.info").off("click");
            that.$(".control-button.add").off("click");
            that.$(".control-button.data").off("click");
            that.$(".control-button.picture").off("click");
        };
        MapControlView.prototype.addEventListener = function () {
            var that = this;
            that.$(".control-button").on("mouseenter", function () {
                FMV.getMapView().SetIsMapPanZoomAvailable(false);
            });
            that.$(".control-button").on("mouseleave", function () {
                FMV.getMapView().SetIsMapPanZoomAvailable(true);
            });
            that.$(".control-button.zoomin").on("click", function (event) {
                console.log("zoomIn()");
                FMV.getMapView().getMap().zoomIn();
            });
            that.$(".control-button.zoomout").on("click", function (event) {
                FMV.getMapView().getMap().zoomOut();
            });
            that.$(".control-button.locate").on("click", function (event) {
                if (!FMV.getUIView().getIsLocked()) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(that.updatePosition);
                    }
                }
            });
            that.$(".control-button.layer").on("click", function (event) {
                if (!FMV.getUIView().getIsLocked()) {
                    if (!$(this).hasClass("layer-active")) {
                        that.resetControls();
                        $(this).addClass("layer-active");
                        FMV.getUIView().show(UIMode.LAYER);
                    }
                    else {
                        $(this).removeClass("layer-active");
                        FMV.getUIView().hide();
                    }
                    FMV.getMapView().resize(false);
                }
            });
            that.$(".control-button.info").on("click", function (event) {
                if (!FMV.getUIView().getIsLocked()) {
                    if (!$(this).hasClass("info-active")) {
                        if (FMC.hasSelectedItem()) {
                            that.resetControls();
                            $(this).addClass("info-active");
                            FMV.getUIView().show(UIMode.INFO);
                            FMV.getMapView().resize(true);
                        }
                        else {
                            FMV.getMsgView().renderError(FML.getViewUIItemNotSelectedErrorMsg());
                        }
                    }
                    else {
                        $(this).removeClass("info-active");
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                    }
                }
            });
            that.$(".control-button.add").on("click", function (event) {
                if (!$(this).hasClass("add-active")) {
                    that.resetControls();
                    $(this).addClass("add-active");
                    FMC.setSelectedItem(FMC.createItem());
                    FMV.getUIView().show(UIMode.ADD);
                    FMV.getMapView().resize(true);
                    setTimeout(function () {
                        FMV.getMapView().getMarkersView().render();
                    }, 500);
                }
                else {
                    $(this).removeClass("add-active");
                    if (FMC.hasSelectedItem()) {
                        var item = FMC.removeItem(FMC.getSelectedItem());
                        FMV.getMapView().getMarkersView().removeMarker(item);
                        FMC.setSelectedItem(null);
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                    }
                }
            });
            that.$(".control-button.data").on("click", function (event) {
                if (!FMV.getUIView().getIsLocked()) {
                    if (!$(this).hasClass("data-active")) {
                        if (FMC.hasSelectedItem()) {
                            that.resetControls();
                            $(this).addClass("data-active");
                            FMV.getUIView().show(UIMode.DATA);
                            FMV.getMapView().resize(true);
                        }
                        else {
                            FMV.getMsgView().renderError(FML.getViewUIItemNotSelectedErrorMsg());
                        }
                    }
                    else {
                        $(this).removeClass("data-active");
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                    }
                }
            });
            that.$(".control-button.picture").on("click", function (event) {
                if (!FMV.getUIView().getIsLocked()) {
                    if (!$(this).hasClass("picture-active")) {
                        if (FMC.hasSelectedItem()) {
                            that.resetControls();
                            $(this).addClass("picture-active");
                            FMV.getUIView().show(UIMode.PICTURE);
                            FMV.getMapView().resize(true);
                        }
                        else {
                            FMV.getMsgView().renderError(FML.getViewUIItemNotSelectedErrorMsg());
                        }
                    }
                    else {
                        $(this).removeClass("picture-active");
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                    }
                }
            });
            that.$(".control-button.threshold").on("click", function (event) {
                if (!FMV.getUIView().getIsLocked()) {
                    if (!$(this).hasClass("threshold-active")) {
                        if (FMC.hasSelectedItem()) {
                            that.resetControls();
                            $(this).addClass("threshold-active");
                            FMV.getUIView().show(UIMode.THRESHOLD);
                            FMV.getMapView().resize(true);
                        }
                        else {
                            FMV.getMsgView().renderError(FML.getViewUIItemNotSelectedErrorMsg());
                        }
                    }
                    else {
                        $(this).removeClass("threshold-active");
                        FMV.getUIView().hide();
                        FMV.getMapView().resize(false);
                    }
                }
            });
        };
        MapControlView.prototype.resetControls = function () {
            var that = this;
            that.$(".control-button.layer").removeClass("layer-active");
            that.$(".control-button.info").removeClass("info-active");
            that.$(".control-button.add").removeClass("add-active");
            that.$(".control-button.data").removeClass("data-active");
            that.$(".control-button.threshold").removeClass("threshold-active");
            that.$(".control-button.picture").removeClass("picture-active");
        };
        MapControlView.prototype.updatePosition = function (position) {
            var that = this;
            FMC.getRouter().navigate('map/' + FMS.getLocateZoom() + "/" + position.coords.latitude + "/" + position.coords.longitude, { trigger: true, replace: true });
            FMV.getMsgView().renderSuccess(FML.getViewUILocateSuccessMsg());
        };
        return MapControlView;
    })(Backbone.View);
    ForagingMap.MapControlView = MapControlView;
})(ForagingMap || (ForagingMap = {}));
var FMMapControlViewTemplate = '';
FMMapControlViewTemplate += '<div class="leaflet-control">';
FMMapControlViewTemplate += '<div class="control-button zoomin"></div>';
FMMapControlViewTemplate += '<div class="control-button zoomout"></div>';
FMMapControlViewTemplate += '<div class="control-button locate"></div>';
FMMapControlViewTemplate += '<div class="control-button layer"></div>';
FMMapControlViewTemplate += '<div class="control-button info"></div>';
FMMapControlViewTemplate += '<div class="control-button data"></div>';
FMMapControlViewTemplate += '<div class="control-button threshold"></div>';
FMMapControlViewTemplate += '<div class="control-button picture"></div>';
FMMapControlViewTemplate += '<div class="control-button add"></div>';
FMMapControlViewTemplate += '</div>';
