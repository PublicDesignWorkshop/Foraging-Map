/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class View extends Backbone.View<Backbone.Model> {
        private vMap: MapView;
        private vUI: UIView;
        private vMsg: MsgView;
        private vGallery: GalleryView;
        private vSlider: SliderView;
        
        private origWidth: number;
        private origHeight: number;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            this.origWidth = this.$el.innerWidth();
            this.origHeight = this.$el.innerHeight();
        }
        render(): any {
            var template = _.template(FMViewTemplate);
            var data = { "title": FML.getViewTitle(), "list": FML.getViewList(), "map": FML.getViewMap(), "login": FML.getViewLogIn(), "signup": FML.getViewSignUp(), "menu": FML.getViewMenu() };
            this.$el.html(template(data));
            this.vMap = new ForagingMap.MapView({ el: $("#leaflet-view-map") });
            this.vUI = new ForagingMap.UIView({ el: $("#leaflet-view-ui") });
            this.vMsg = new ForagingMap.MsgView({ el: $("#leaflet-view-msg") });
            this.vGallery = new ForagingMap.GalleryView({ el: $("#leaflet-view-galleria") });
            this.vSlider = new ForagingMap.SliderView({ el: $("#fm-view-slider") });

            this.resize();
            
        }
        resize(): void {
            this.origWidth = this.$el.innerWidth();
            this.origHeight = this.$el.innerHeight();

            this.vSlider.resize();
        }
        getOrigWidth(): number {
            return this.origWidth;
        }
        getOrigHeight(): number {
            return this.origHeight;
        }
        getMapView(): MapView {
            return this.vMap;
        }
        getUIView(): UIView {
            return this.vUI;
        }
        getMsgView(): MsgView {
            return this.vMsg;
        }
        getGalleryView(): GalleryView {
            return this.vGallery;
        }
        getSliderView(): SliderView {
            return this.vSlider;
        }
    }
}