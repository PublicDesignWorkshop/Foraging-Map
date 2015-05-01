var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var SliderView = (function (_super) {
        __extends(SliderView, _super);
        function SliderView(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.isDraggable = false;
            this.startDate = moment(new Date()).subtract(6, 'month').format(FMS.getDateTimeFormat());
            this.endDate = moment(new Date()).format(FMS.getDateTimeFormat());
            this.curDate = moment(new Date()).format(FMS.getDateTimeFormat());
            this.timeInterval = 60 * 60;
        }
        SliderView.prototype.getTimeInterval = function () {
            return this.timeInterval;
        };
        SliderView.prototype.setTimeInterval = function (interval) {
            this.timeInterval = interval;
        };
        SliderView.prototype.getStartDateValue = function () {
            return moment(this.startDate).valueOf();
        };
        SliderView.prototype.getEndDateValue = function () {
            return moment(this.endDate).valueOf();
        };
        SliderView.prototype.getCurDateValue = function () {
            return moment(this.curDate).valueOf();
        };
        SliderView.prototype.render = function () {
            var that = this;
            var template = _.template(FMViewSliderTemplate);
            var data = {};
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
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: false, replace: true });
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
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: false, replace: true });
            });
            that.slider = $("#date-slider", that.$el).slider({
                min: moment(that.startDate).valueOf(),
                max: moment(that.endDate).valueOf(),
                value: moment(that.curDate).valueOf(),
                step: that.timeInterval * 1000,
            });
            $("#date-slider", that.$el).bind('slide', function (event, ui) {
                that.curDate = moment(ui.value).format(FMS.getDateTimeFormat());
                FMV.getMsgView().renderSuccess("Slider Date: " + that.curDate);
                FMV.getMapView().getMarkersView().render();
                FMC.getRouter().navigate('map/' + FMV.getMapView().getMapZoom() + "/" + FMV.getMapView().getMapCenter().lat + "/" + FMV.getMapView().getMapCenter().lng + "/" + FMV.getSliderView().getTimeInterval() + "/" + FMV.getSliderView().getStartDateValue() + "/" + FMV.getSliderView().getEndDateValue() + "/" + FMV.getSliderView().getCurDateValue(), { trigger: false, replace: true });
            });
            if (that.isDraggable) {
                that.slider.slider("enable");
            }
            else {
                that.slider.slider("disable");
            }
        };
        SliderView.prototype.resize = function () {
            $("#fm-view-body .nav-primary").css({ width: $("#fm-view-body .panel-heading").innerWidth() - $("#fm-view-body .nav-title").outerWidth() - $("#fm-view-body .nav-secondary").outerWidth() });
            $("#fm-view-body .date-slider-wrapper").css({ width: $("#fm-view-body .panel-heading").innerWidth() - $("#fm-view-body .nav-title").outerWidth() - $("#fm-view-body .nav-secondary").outerWidth() - 100 });
        };
        SliderView.prototype.renderSlider = function (interval, start, end, cur) {
            this.startDate = moment(parseInt(start)).format(FMS.getDateTimeFormat());
            this.endDate = moment(parseInt(end)).format(FMS.getDateTimeFormat());
            this.curDate = moment(parseInt(cur)).format(FMS.getDateTimeFormat());
            this.timeInterval = interval;
            this.render();
            this.resize();
        };
        SliderView.prototype.getCurDate = function () {
            return this.curDate;
        };
        SliderView.prototype.getIsDraggable = function () {
            return this.isDraggable;
        };
        SliderView.prototype.setIsDraggable = function (isDraggable) {
            var that = this;
            that.isDraggable = isDraggable;
            if (that.isDraggable) {
                that.slider.slider("enable");
            }
            else {
                that.slider.slider("disable");
            }
        };
        return SliderView;
    })(Backbone.View);
    ForagingMap.SliderView = SliderView;
})(ForagingMap || (ForagingMap = {}));
var FMViewSliderTemplate = '';
FMViewSliderTemplate += '<div class="nav-float">';
FMViewSliderTemplate += '<div class="input-group" id= "date-start">';
FMViewSliderTemplate += '<input type="text" class="form-control hidden" id="slider-start-date" value="" />';
FMViewSliderTemplate += '<span class="input-group-addon input-group-addon-calendar-left" id="slider-start-date-select"></span>';
FMViewSliderTemplate += '</div>';
FMViewSliderTemplate += '</div>';
FMViewSliderTemplate += '<div class="nav-float date-slider-wrapper">';
FMViewSliderTemplate += '<div id="date-slider">';
FMViewSliderTemplate += '</div>';
FMViewSliderTemplate += '</div>';
FMViewSliderTemplate += '<div class="nav-float">';
FMViewSliderTemplate += '<div class="input-group" id= "date-end">';
FMViewSliderTemplate += '<input type="text" class="form-control hidden" id="slider-end-date" value="" />';
FMViewSliderTemplate += '<span class="input-group-addon input-group-addon-calendar-right" id="slider-end-date-select"></span>';
FMViewSliderTemplate += '</div>';
FMViewSliderTemplate += '</div>';
