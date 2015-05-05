/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />
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
        function Sensor(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "core/php/sensor.php";
            this.isSavable = true;
            var that = this;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
            this.defaults = {
                "initial": "",
                "name": "",
            };
            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false)
                    return;
                that.isSavable = false;
                model.save({}, {
                    wait: true,
                    success: function (model, response) {
                        model.isSavable = true;
                        FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
        }
        Sensor.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            return _super.prototype.parse.call(this, response, options);
        };
        Sensor.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        Sensor.prototype.setIsSavable = function (isSavable) {
            this.isSavable = isSavable;
        };
        Sensor.prototype.getIsSavable = function () {
            return this.isSavable;
        };
        return Sensor;
    })(Backbone.Model);
    ForagingMap.Sensor = Sensor;
    var Sensors = (function (_super) {
        __extends(Sensors, _super);
        function Sensors(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/sensors.php";
            this.model = Sensor;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        Sensors.prototype.intializeCurType = function () {
            var that = this;
            $.each(that.models, function (index, model) {
                if (that.curType == null) {
                    that.curType = model;
                    console.log("Set Sensor Type as " + that.curType.get("name"));
                    if (FMV.getMapView() && FMV.getMapView().getSensorView()) {
                        FMV.getMapView().getSensorView().render();
                    }
                }
            });
        };
        Sensors.prototype.getCurType = function () {
            return this.curType;
        };
        Sensors.prototype.setCurType = function (num) {
            var that = this;
            $.each(that.models, function (index, model) {
                if (parseInt(model.get('id')) == num) {
                    that.curType = model;
                    console.log("Set Sensor Type as " + that.curType.get("name"));
                    FMV.getMapView().getSensorView().render();
                }
            });
        };
        return Sensors;
    })(Backbone.Collection);
    ForagingMap.Sensors = Sensors;
})(ForagingMap || (ForagingMap = {}));
