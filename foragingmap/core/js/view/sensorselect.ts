/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class SensorSelect extends Backbone.View<Backbone.Model> {
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
            this.render();
        }
        render(): any {
            var that: SensorSelect = this;
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
        }
        addEventListener(): void {
            var that: SensorSelect = this;

            that.$('.sensor').on('click', function () {
                var num: number = parseInt($(this).attr('data-id'));
                FMM.getSensors().setCurType(num);
                FMC.resetData();
                FMC.fetchItems(FMV.getMapView().getMapBounds());
                that.$('#add-new-sensor').removeClass('sensor-active');
            });

            that.$('#add-new-sensor').on("click", function (event) {
                if (!$(this).hasClass("sensor-active")) {          // open ui
                    $(this).addClass("sensor-active");
                    FMV.getUIView().show(UIMode.ADDSENSOR);
                    FMV.getMapView().resize(true);
                    setTimeout(function () {
                        FMV.getMapView().getMarkersView().render();
                    }, 500);
                } else {                                        // close ui
                    $(this).removeClass("sensor-active");
                    FMC.setSelectedItem(null);
                    FMV.getUIView().hide();
                    FMV.getMapView().resize(false);
                }
            });
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewSensorTemplate = '';
FMViewSensorTemplate += '<div class="leaflet-control">';
FMViewSensorTemplate += '<% _.each(sensors, function (sensor) { %>';
FMViewSensorTemplate += '<div class="control-button sensor" data-id="<%= sensor.get("id") %>"><%= sensor.get("initial") %></div>';
FMViewSensorTemplate += '<% }); %>';
FMViewSensorTemplate += '<% if (isAdmin) { %>';   // if admin
FMViewSensorTemplate += '<% if (isActive) { %>';   // if active
FMViewSensorTemplate += '<div id="add-new-sensor" class="control-button sensor sensor-plus sensor-active">+</div>';
FMViewSensorTemplate += '<% } else { %>';
FMViewSensorTemplate += '<div id="add-new-sensor" class="control-button sensor-plus">+</div>';
FMViewSensorTemplate += '<% } %>';
FMViewSensorTemplate += '<% } %>';
FMViewSensorTemplate += '</div>';