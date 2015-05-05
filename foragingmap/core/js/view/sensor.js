var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var Sensor = (function (_super) {
        __extends(Sensor, _super);
        function Sensor(options) {
            _super.call(this, options);
            this.setElement(options.el);
            this.render();
        }
        Sensor.prototype.render = function () {
            var that = this;
            var template = _.template(FMViewSensorTemplate);
            var data = {};
            that.$el.html(template(data));
        };
        return Sensor;
    })(Backbone.View);
    ForagingMap.Sensor = Sensor;
})(ForagingMap || (ForagingMap = {}));
var FMViewSensorTemplate = '';
FMViewSensorTemplate += '<div class="leaflet-control">';
FMViewSensorTemplate += '<div class="control-button sensor">B</div>';
FMViewSensorTemplate += '</div>';
