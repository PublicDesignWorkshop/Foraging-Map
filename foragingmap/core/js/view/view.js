var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.origWidth = this.$el.innerWidth();
            this.origHeight = this.$el.innerHeight();
        }
        View.prototype.render = function () {
            var template = _.template(FMViewTemplate);
            if (FMV.getOrigWidth() < 540) {
                var data = { "title": FML.getViewTitle(), "list": FML.getViewList(), "map": FML.getViewMap(), "login": FML.getViewLogIn(), "signup": FML.getViewSignUp(), "menu": "" };
            }
            else {
                var data = { "title": FML.getViewTitle(), "list": FML.getViewList(), "map": FML.getViewMap(), "login": FML.getViewLogIn(), "signup": FML.getViewSignUp(), "menu": FML.getViewMenu() };
            }
            this.$el.html(template(data));
            this.vMap = new ForagingMap.MapView({ el: $("#leaflet-view-map") });
            this.vUI = new ForagingMap.UIView({ el: $("#leaflet-view-ui") });
            this.vMsg = new ForagingMap.MsgView({ el: $("#leaflet-view-msg") });
            this.vGallery = new ForagingMap.GalleryView({ el: $("#leaflet-view-galleria") });
            this.vSlider = new ForagingMap.SliderView({ el: $("#fm-view-slider") });
            this.vMenu = new ForagingMap.MenuView({ el: $("#leaflet-view-menu") });
            this.addEventListener();
            this.resize();
        };
        View.prototype.addEventListener = function () {
            var that = this;
            $("#btn-toggle-menu").off("click");
            $("#btn-toggle-menu").on("click", function () {
                that.vMenu.toggle();
            });
            $("#fm-logo").off("click");
            $("#fm-logo").on("click", function () {
                location.reload();
            });
        };
        View.prototype.resize = function () {
            this.origWidth = this.$el.innerWidth();
            this.origHeight = this.$el.innerHeight();
            this.vSlider.resize();
        };
        View.prototype.getOrigWidth = function () {
            return this.origWidth;
        };
        View.prototype.getOrigHeight = function () {
            return this.origHeight;
        };
        View.prototype.getMapView = function () {
            return this.vMap;
        };
        View.prototype.getUIView = function () {
            return this.vUI;
        };
        View.prototype.getMsgView = function () {
            return this.vMsg;
        };
        View.prototype.getGalleryView = function () {
            return this.vGallery;
        };
        View.prototype.getSliderView = function () {
            return this.vSlider;
        };
        View.prototype.getMenuView = function () {
            return this.vMenu;
        };
        return View;
    })(Backbone.View);
    ForagingMap.View = View;
})(ForagingMap || (ForagingMap = {}));
