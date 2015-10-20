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
    var SensorSelect = (function (_super) {
        __extends(SensorSelect, _super);
        function SensorSelect(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.render();
        }
        SensorSelect.prototype.render = function () {
            var that = this;
            var template = _.template(FMViewSensorTemplate);
            var data = {
                isAdmin: FMC.getUser().getIsAdmin(),
                sensors: FMM.getSensors().models,
                isActive: $('#add-new-sensor').hasClass('sensor-active'),
            };
            that.$el.html(template(data));
            that.$('.sensor').each(function () {
                if (parseInt($(this).attr('data-id')) == parseInt(FMM.getSensors().getCurType().get("id"))) {
                    $(this).addClass('sensor-active');
                }
            });
            that.addEventListener();
        };
        SensorSelect.prototype.addEventListener = function () {
            var that = this;
            that.$('.sensor').on('click', function () {
                var num = parseInt($(this).attr('data-id'));
                FMM.getSensors().setCurType(num);
                FMC.resetData();
                FMC.fetchItems(FMV.getMapView().getMapBounds());
                that.$('#add-new-sensor').removeClass('sensor-active');
            });
            that.$('#add-new-sensor').on("click", function (event) {
                if (!$(this).hasClass("sensor-active")) {
                    $(this).addClass("sensor-active");
                    FMV.getUIView().show(7 /* ADDSENSOR */);
                    FMV.getMapView().resize(true);
                    setTimeout(function () {
                        FMV.getMapView().getMarkersView().render();
                    }, 500);
                }
                else {
                    $(this).removeClass("sensor-active");
                    FMC.setSelectedItem(null);
                    FMV.getUIView().hide();
                    FMV.getMapView().resize(false);
                }
            });
        };
        return SensorSelect;
    })(Backbone.View);
    ForagingMap.SensorSelect = SensorSelect;
})(ForagingMap || (ForagingMap = {}));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewSensorTemplate = '';
FMViewSensorTemplate += '<div class="leaflet-control">';
FMViewSensorTemplate += '<% _.each(sensors, function (sensor) { %>';
FMViewSensorTemplate += '<div class="control-button sensor" data-id="<%= sensor.get("id") %>"><%= sensor.get("initial") %></div>';
FMViewSensorTemplate += '<% }); %>';
FMViewSensorTemplate += '<% if (isAdmin) { %>'; // if admin
FMViewSensorTemplate += '<% if (isActive) { %>'; // if active
FMViewSensorTemplate += '<div id="add-new-sensor" class="control-button sensor sensor-plus sensor-active">+</div>';
FMViewSensorTemplate += '<% } else { %>';
FMViewSensorTemplate += '<div id="add-new-sensor" class="control-button sensor-plus">+</div>';
FMViewSensorTemplate += '<% } %>';
FMViewSensorTemplate += '<% } %>';
FMViewSensorTemplate += '</div>';
