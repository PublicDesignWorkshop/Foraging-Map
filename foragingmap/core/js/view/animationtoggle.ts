/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class AnimationToggle extends Backbone.View<Backbone.Model> {
        private isActive: boolean = false;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            this.render();
        }
        render(): any {
            var that: AnimationToggle = this;
            var template = _.template(FMViewAnimationTemplate);

            var data = {
            };
            that.$el.html(template(data));


            that.addEventListener();
        }
        addEventListener(): void {
            var that: AnimationToggle = this;

            that.$('.animation').on('click', function () {
                if (that.isActive) {
                    $(this).removeClass("animation-active");
                    that.isActive = false;
                } else {
                    $(this).addClass("animation-active");
                    that.isActive = true;
                }
                if (that.isActive) {
                    FMV.getAnimationView().render();
                } else {
                    FMV.getAnimationView().unrender();
                }
            });
        }

        getIsActive(): boolean {
            return this.isActive;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewAnimationTemplate = '';
FMViewAnimationTemplate += '<div class="leaflet-control">';
FMViewAnimationTemplate += '<div class="control-button animation">Animation</div>';
FMViewAnimationTemplate += '</div>';