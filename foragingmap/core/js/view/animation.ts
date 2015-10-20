/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class AnimationView extends Backbone.View<Backbone.Model> {
        private paper: Snap.Paper;
        private scale: number;
        private pBackground: any;   // group cor current view
        private pApple: any; // group for listview
        private sBranch: any;

        private bendVal: number;
        private baseXVal: number;
        private baseYVal: number;
        private branchPath: string;

        private tInterval: number;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
        }
        render(): any {
            var that: AnimationView = this;
            var template = _.template(FMAnimationViewTemplate);

            var data = {
            };
            that.$el.html(template(data));

            //var width: number = $('#leaflet-view-map').innerWidth() / 2;
            var width: number = Math.min(Math.floor(FMV.getWidth() / 2), 700);
            var height: number = Math.floor(width * 36 / 50);
            var top: number = Math.floor($('#leaflet-view-map').innerHeight() - height);
            that.scale = 1000 / width * 0.95;

            that.$el.css({
                width: width,
                height: height,
                top: top,    
            });
            $('#fruit-animation').css({
                width: width,
                height: height,
            });
            that.$el.removeClass('hidden');

            that.bendVal = 0;
            that.baseXVal = 330;
            that.baseYVal = 85;
            that.branchPath = "M60,140 Q190,107 330," + (that.baseYVal + that.bendVal);

            //console.log(that.branchPath);

            that.renderSVG();
            
        }

        renderSVG(): void {
            var that: AnimationView = this;
            that.paper = Snap('#fruit-animation');

            that.pBackground = that.paper.group();
            that.pApple = that.paper.group();

            var t: Snap.Matrix = new Snap.Matrix();
            t.scale(that.scale, that.scale, 0, 0);
            that.pBackground.transform(t);
            

            var treeBg01 = that.pBackground.path({
                path: "M-277.19-36.574c0-39.162,1.861-99.054,26.059-130.149c22.34-27.645,69.807-36.854,99.593-33.402     c14.888,1.153,26.059,8.063,39.088,17.278c16.754,13.821,15.822,16.125,29.784-3.457c24.199-35.705,51.191-43.766,87.491-49.528     c25.458-3.374,50.911,14.133,66.825,37.487l0.44,2.357c33.173-13.538,97.285-14.332,125.211-1.992     c58.629,23.32,110.884,74.08,127.636,154.41c8.38,41.461-6.281,38.87,27.223,67.374c25.131,23.323,52.353,46.643,69.105,80.329     c41.88,82.924-16.753,183.984-83.766,207.301c-50.254,18.146-193.029,26.91-237.063-16.597     c-8.515-8.416-28.88-24.855-28.88-24.855c-77.48,106.238-215.69,62.187-261.756-57.01     c-60.729,51.828-205.221,2.586-198.938-103.654c2.093-33.688,12.563-62.191,29.317-88.104     c23.036-36.279,56.538-36.279,81.668-59.602",
                fill: "#4A5328",
            });

            var treeBg04 = that.pBackground.path({
                path: "M0,0h504v273.499c0,0-151.959-222.517-349.479-93.24c0,0-96.521,84.817-154.521,59.707V0z",
                fill: "#B1D8E0",
                opacity: 0.4,
            });

            var treeBg05 = that.pBackground.path({
                path: "M504,360V213.693c0,0-93,70.307-300,34.307c0,0-161-61.307-204,38.847V360H504z",
                fill: "#D9EBEB",
                opacity: 0.2,
            });

            var treeBg06 = that.pBackground.path({
                path: "M0,370V157.202c0,0,134-126.65,451,10.323    c0,0,45,16.8,53-15.975v212.858L0,370z",
                "clip-path": "url(#SVGID_6_)",
                fill: "#69B1E1",
                opacity: 0.3,

            });

            var treeBg01 = that.pBackground.path({
                path: "M-277.19-36.574c0-39.162,1.861-99.054,26.059-130.149c22.34-27.645,69.807-36.854,99.593-33.402     c14.888,1.153,26.059,8.063,39.088,17.278c16.754,13.821,15.822,16.125,29.784-3.457c24.199-35.705,51.191-43.766,87.491-49.528     c25.458-3.374,50.911,14.133,66.825,37.487l0.44,2.357c33.173-13.538,97.285-14.332,125.211-1.992     c58.629,23.32,110.884,74.08,127.636,154.41c8.38,41.461-6.281,38.87,27.223,67.374c25.131,23.323,52.353,46.643,69.105,80.329     c41.88,82.924-16.753,183.984-83.766,207.301c-50.254,18.146-193.029,26.91-237.063-16.597     c-8.515-8.416-28.88-24.855-28.88-24.855c-77.48,106.238-215.69,62.187-261.756-57.01     c-60.729,51.828-205.221,2.586-198.938-103.654c2.093-33.688,12.563-62.191,29.317-88.104     c23.036-36.279,56.538-36.279,81.668-59.602",
                fill: "#4A5328",
                opacity: 0.8,
            });

            var treeBg02 = that.pBackground.path({
                path: "M19.008,271.731L10.844,543.78c0,5.499,23.559,5.903,29.057,5.903    c5.497,0,26.877-4.46,26.877-9.954l-7.899-295.28l-0.592-22.009l-3.41-127.526c0.316-1.334,0.262-2.666-0.104-3.854l-2.081-77.759    l141.186-97.803c1.928-1.327,1.705-4.984-0.496-8.155c-2.195-3.17-5.543-4.665-7.459-3.335L52.246-3.396l-2.389-89.343    c0-5.498-4.459-9.957-9.957-9.957c-5.498,0-9.956,4.459-9.956,9.957L24.88,76.004l-207.981-88.552    c-3.104-1.318-6.856,0.487-8.367,4.036c-1.51,3.552-0.213,7.507,2.893,8.831L24.431,91.004l-4.965,165.472L19.008,271.731z",
                "clip-path": "url(#SVGID_6_)",
                fill: "#6C442D",
            });

            that.sBranch = that.pBackground.path({
                //path: "M56.074,237.678 c68.471-59.341,189.44-148.358,271.608-63.907",
                path: that.branchPath,
                "clip-path": "url(#SVGID_6_)",
                fill: "none",
                stroke: "#6C442D",
                "stroke-width": 14,
                "stroke-linecap": "round",
                "stroke-miterlimit": 10,
            });

            // apple svg components
            var apple01 = that.pApple.path({
                path: "M-62.743,44.039c2.048,8.965,6.123,9.495,9.363,18.098   c2.731,7.245,11.926,10.802,18.842,7.42c4.961-2.427,10.001-2.472,15.021-0.191c2.675,1.217,5.423,1.804,8.336,1.275   c5.113-0.928,8.977-3.632,10.865-8.525c3.312-8.577,5.965-9.383,8.955-18.076c2.672-7.765,1.514-22.552-4.367-28.279   c-5.399-5.267-13.923-6.456-21.187-3.152c-6.638,3.017-13.229,3.075-19.844-0.016c-3.306-1.545-6.804-2.078-10.4-1.675   c-9.84,1.092-17.314,9.015-16.873,18.9C-63.874,33.385-63.538,40.561-62.743,44.039z",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                fill: "#9C1B39",
            });

            var apple02 = that.pApple.path({
                path: "M-62.743,44.039   c2.048,8.965,6.123,9.495,9.363,18.098c2.731,7.245,11.926,10.802,18.842,7.42c4.961-2.427,10.001-2.472,15.021-0.191   c2.675,1.217,5.423,1.804,8.336,1.275c5.113-0.928,8.977-3.632,10.865-8.525c3.312-8.577,5.965-9.383,8.955-18.076   c2.672-7.765,1.514-22.552-4.367-28.279c-5.399-5.267-13.923-6.456-21.187-3.152c-6.638,3.017-13.229,3.075-19.844-0.016   c-3.306-1.545-6.804-2.078-10.4-1.675c-9.84,1.092-17.314,9.015-16.873,18.9C-63.874,33.385-63.538,40.561-62.743,44.039z",
                fill: "none",
                stroke: "#A12F27",
                "stroke-width": 2,
                "stroke-miterlimit": 10,
            });

            var apple03 = that.pApple.path({
                path: "M-7.759,17.652c0,0,7.796,3.921,7.196,14.3l7.197-5.814c0,0-7.997-11.199-12.595-11.997   L-7.759,17.652z",
                opacity: 0.2,
                fill: "#FFFFFF",
            });

            var apple04 = that.pApple.path({
                path: "M-22.848,14.646c-0.007-0.203-1.208-0.316-2.683-0.252c-1.469,0.063-2.657,0.276-2.649,0.479   c0.01,0.204,1.209,0.317,2.684,0.255C-24.024,15.066-22.837,14.85-22.848,14.646z",
                opacity: 0.2,
                fill: "#231F20",
            });

            var apple05 = that.pApple.path({
                path: "M-5.737-6.875l2.19,3.859c0,0-18.486-0.871-22.749,17.57h1.016c0,0,5.841-19.703,23.14-15.546l-1.124-5.884H-5.737z",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                fill: "#6C442D",
                stroke: "#6C442D",
                "stroke-width": 3,
                "stroke-miterlimit": 10,
            });

            var apple06 = that.pApple.path({
                path: "M-28.881,14.141C-29.064,3.801-39.004-6.94-50.319-7.285   C-49.774,3.713-39.705,13.744-28.881,14.141z",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                fill: "#7BAD8E",
            });

            var apple07 = that.pApple.path({
                path: "M-48.947-5.344c0,0,16.796,4.426,16.993,16.108c0,0-6.485-2.588-8.495-8.054C-40.449,2.711-43.547-2.546-48.947-5.344z",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                opacity: 0.2,
                fill: "#286934",
                stroke: "#7BAD8E",
                "stroke-miterlimit": 10,

            });

            var apple08 = that.pApple.path({
                path: "M-31.886,10.729c0.643,1.33,1.593,2.617,3.005,3.411",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                opacity: 0.2,
                fill: "none",
                stroke: "#286934",
                "stroke-miterlimit": 10,
            });

            var apple09 = that.pApple.path({
                path: "M-32.126,10.19c0.076,0.181,0.155,0.36,0.24,0.539",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                opacity: 0.2,
                fill: "none",
                stroke: "#286934",
                "stroke-miterlimit": 10,
            });

            var t = new Snap.Matrix()
            t.scale(that.scale, that.scale, 0, 0);
            t.translate(that.baseXVal, that.baseYVal + 5);
            that.pApple.transform(t);

            that.customUpdate();
        }
        unrender(): void {
            var that: AnimationView = this;
            that.$el.html("");
            that.$el.addClass('hidden');
        }

        customUpdate = () => {
            var that: AnimationView = this;
            //console.log("Animation is updated");
            var item: Item = FMC.getSelectedItem();
            if (item != undefined) {
                // fetch new bends
                FMC.fetchBend(item.get('id'), function () {

                    // re draw chart
                    if (FMV.getUIView().getMode() == UIMode.DATA) {
                        FMV.getUIView().drawChart();
                        FMV.getUIView().refreshDataGrid();
                    }
                    

                    FMV.getSliderView().setDateToCurDate();
                    var ratio = FMM.getBendRatio(item);
                    //console.log(ratio);

                    // animate apple  & branch based on ratio
                    that.bendVal = ratio * 180;
                    that.branchPath = "M60,140 Q190,107 330," + (that.baseYVal + that.bendVal);
                    //console.log(that.branchPath);
                    var t = new Snap.Matrix();
                    t.scale(that.scale, that.scale, 0, 0);
                    t.translate(that.baseXVal, that.baseYVal + that.bendVal + 5);
                    that.pApple.animate({
                        transform: t,
                    }, 1000, mina.elastic);

                    that.sBranch.animate({
                        d: that.branchPath
                    }, 1000, mina.elastic);
                });
            }
            setTimeout(function () {
                if (FMV.getMapView().getAnimationToggleView().getIsActive()) {
                    that.customUpdate();
                }
            }, 2500);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMAnimationViewTemplate = '<svg id="fruit-animation"></svg>';