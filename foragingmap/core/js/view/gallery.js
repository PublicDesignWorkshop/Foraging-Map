/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var GalleryView = (function (_super) {
        __extends(GalleryView, _super);
        function GalleryView(options) {
            _super.call(this, options);
            this.setElement(options.el);
            Galleria.loadTheme('core/lib/galleria/themes/classic/galleria.classic.js');
            $("#leaflet-view-galleria").css({ width: $("#fm-view-map").innerWidth(), height: $("#fm-view-map").innerHeight() + 1 });
        }
        GalleryView.prototype.render = function () {
            var that = this;
            $("#leaflet-view-galleria").css({ width: $("#fm-view-map").innerWidth(), height: $("#fm-view-map").innerHeight() + 1 });
            var template = _.template(FMViewGalleryTemplate);
            var data = {
                "pictures": FMM.getPictures().models,
                "dir": FMS.getBaseUrl() + FMS.getPictureDir(),
            };
            that.$el.html(template(data));
        };
        GalleryView.prototype.show = function (index) {
            var that = this;
            that.$el.addClass("galleria-show");
            Galleria.run('.galleria', {
                show: index,
                imageCrop: false,
                transition: 'fade',
            });
            Galleria.ready(function () {
                $("#btn-galleria-close").off("click");
                $("#btn-galleria-close").on("click", function () {
                    that.hide();
                    that.$el.html("");
                });
            });
            FMV.getMapView().hide();
        };
        GalleryView.prototype.hide = function () {
            var that = this;
            that.$el.removeClass("galleria-show");
            FMV.getMapView().show();
        };
        return GalleryView;
    })(Backbone.View);
    ForagingMap.GalleryView = GalleryView;
})(ForagingMap || (ForagingMap = {}));
