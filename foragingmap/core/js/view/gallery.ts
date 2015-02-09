/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />

declare var Galleria: any;

module ForagingMap {
    export class GalleryView extends Backbone.View<Backbone.Model> {
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            Galleria.loadTheme('core/lib/galleria/themes/classic/galleria.classic.js');
            $("#leaflet-view-galleria").css({ width: $("#fm-view-map").innerWidth(), height: $("#fm-view-map").innerHeight() + 1 });
        }
        render(): any {
            var that: GalleryView = this;
            var template = _.template(FMViewGalleryTemplate);
            var data = {
                "pictures": FMM.getPictures().models,
                "dir": FMS.getBaseUrl() + FMS.getPictureDir(),
            };
            that.$el.html(template(data));
        }
        show(index): void {
            var that: GalleryView = this;
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
        }
        hide(): void {
            var that: GalleryView = this;
            that.$el.removeClass("galleria-show");
            FMV.getMapView().show();
        }
    }
}