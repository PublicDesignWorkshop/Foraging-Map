/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\jqueryui\jqueryui.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class SliderView extends Backbone.View<Backbone.Model> {
        private isDraggable: boolean;
        private startDate: any;
        private endDate: any;
        private curDate: any;
        private slider: any;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            this.isDraggable = false;
            this.startDate = moment(new Date()).subtract(6, 'month').format(FMS.getDateTimeFormat());
            this.endDate = moment(new Date()).format(FMS.getDateTimeFormat());
            this.curDate = moment(new Date()).format(FMS.getDateTimeFormat());
            this.render();
        }
        render(): any {
            var that: SliderView = this;
            var template = _.template(FMViewSliderTemplate);
            var data = {

            };
            this.$el.html(template(data));

            $("#date-start", that.$el).datetimepicker({
                defaultDate: that.startDate,
                format: FMS.getDateTimeFormat(),
            }).on("dp.change", function () {
                that.startDate = $(this).data("date");
                if (moment(that.startDate).valueOf() >= moment(that.endDate).valueOf()) {
                    that.startDate = moment(that.endDate).subtract(1, 'day');
                }
                that.slider.slider("option", "min", moment(that.startDate).valueOf());
                that.slider.slider("value", that.slider.slider("value"));
                $("#date-slider", that.$el).slider('pips', { rest: 'label', last: true, step: (moment(that.endDate).valueOf() - moment(that.startDate).valueOf()) / (5 * 60 * 60 * 1000) });
            });

            $("#date-end", that.$el).datetimepicker({
                defaultDate: that.endDate,
                format: FMS.getDateTimeFormat(),
            }).on("dp.change", function () {
                that.endDate = $(this).data("date");
                if (moment(that.startDate).valueOf() >= moment(that.endDate).valueOf()) {
                    that.endDate = moment(that.startDate).add(1, 'day');
                }
                that.slider.slider("option", "max", moment(that.endDate).valueOf());
                that.slider.slider("value", that.slider.slider("value"));
                $("#date-slider", that.$el).slider('pips', { rest: 'label', last: true, step: (moment(that.endDate).valueOf() - moment(that.startDate).valueOf()) / (5 * 60 * 60 * 1000) });
            });
            that.slider = $("#date-slider", that.$el).slider({
                min: moment(that.startDate).valueOf(),
                max: moment(that.endDate).valueOf(),
                value: moment(new Date()).valueOf(),
                step: 60 * 60 * 1000,
            });
            $("#date-slider", that.$el).slider('pips', { rest: 'label', last: true, step: (moment(that.endDate).valueOf() - moment(that.startDate).valueOf()) / (5 * 60 * 60 * 1000) });
            //$('#date-slider', that.$el).slider('float');

            $("#date-slider", that.$el).bind('slide', function (event, ui) {
                that.curDate = moment(ui.value).format(FMS.getDateTimeFormat());
                FMV.getMsgView().renderSuccess("Slider Date: " + that.curDate);
                FMV.getMapView().getMarkersView().render();
            });

            if (that.isDraggable) {
                that.slider.slider("enable");
            } else {
                that.slider.slider("disable");
            }
        }
        resize(): void {
            $("#fm-view-body .nav-primary").css({ width: $("#fm-view-body .panel-heading").innerWidth() - $("#fm-view-body .nav-title").outerWidth() - $("#fm-view-body .nav-secondary").outerWidth() });
            $("#fm-view-body .date-slider-wrapper").css({ width: $("#fm-view-body .panel-heading").innerWidth() - $("#fm-view-body .nav-title").outerWidth() - $("#fm-view-body .nav-secondary").outerWidth() - 100 });
        }
        getCurDate(): any {
            return this.curDate;
        }
        getIsDraggable(): boolean {
            return this.isDraggable;
        }
        setIsDraggable(isDraggable: boolean): void {
            var that: SliderView = this;
            that.isDraggable = isDraggable;
            if (that.isDraggable) {
                that.slider.slider("enable");
            } else {
                that.slider.slider("disable");
            }
        }
    }
}

var FMViewSliderTemplate =  '';
FMViewSliderTemplate += '<div class="nav-float">';
FMViewSliderTemplate +=     '<div class="input-group" id= "date-start">';
FMViewSliderTemplate +=         '<input type="text" class="form-control hidden" id="slider-start-date" value="" />';
FMViewSliderTemplate +=         '<span class="input-group-addon input-group-addon-calendar-left" id="slider-start-date-select"></span>';
FMViewSliderTemplate +=     '</div>';
FMViewSliderTemplate += '</div>';

FMViewSliderTemplate += '<div class="nav-float date-slider-wrapper">';
FMViewSliderTemplate +=     '<div id="date-slider">';
FMViewSliderTemplate +=     '</div>';
FMViewSliderTemplate += '</div>';

FMViewSliderTemplate += '<div class="nav-float">';
FMViewSliderTemplate +=     '<div class="input-group" id= "date-end">';
FMViewSliderTemplate +=         '<input type="text" class="form-control hidden" id="slider-end-date" value="" />';
FMViewSliderTemplate +=         '<span class="input-group-addon input-group-addon-calendar-right" id="slider-end-date-select"></span>';
FMViewSliderTemplate +=     '</div>';
FMViewSliderTemplate += '</div>';