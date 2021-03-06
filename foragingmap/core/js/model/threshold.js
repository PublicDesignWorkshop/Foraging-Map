var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />
var ThresholdType;
(function (ThresholdType) {
    ThresholdType[ThresholdType["None"] = 0] = "None";
    ThresholdType[ThresholdType["Normal"] = 1] = "Normal";
})(ThresholdType || (ThresholdType = {}));
var ForagingMap;
(function (ForagingMap) {
    var Threshold = (function (_super) {
        __extends(Threshold, _super);
        function Threshold(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "core/php/threshold.php";
            this.isSavable = true;
            var that = this;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
            this.defaults = {
                "pid": 0,
                "type": 0 /* None */,
                "min": 0,
                "max": 0,
                "date": moment(new Date()).format(FMS.getDateTimeFormat()),
                "update": moment(new Date()).format(FMS.getDateTimeFormat()),
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
                        FMV.getMsgView().renderSuccess("'" + model.get("min") + " - " + model.get("max") + "' " + FML.getViewUIDataSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
        }
        Threshold.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.pid = parseInt(response.pid);
            response.type = parseInt(response.type);
            response.min = parseFloat(response.min);
            response.max = parseFloat(response.max);
            response.date = moment(response.date).format(FMS.getDateTimeFormat());
            response.update = moment(response.update).format(FMS.getDateTimeFormat());
            return _super.prototype.parse.call(this, response, options);
        };
        Threshold.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        Threshold.prototype.setIsSavable = function (isSavable) {
            this.isSavable = isSavable;
        };
        Threshold.prototype.getIsSavable = function () {
            return this.isSavable;
        };
        return Threshold;
    })(Backbone.Model);
    ForagingMap.Threshold = Threshold;
    var Thresholds = (function (_super) {
        __extends(Thresholds, _super);
        function Thresholds(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/thresholds.php";
            this.model = Threshold;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        Thresholds.prototype.getCurrentThreshold = function (curDate) {
            var that = this;
            var curDateValue = moment(curDate).valueOf();
            if (that.models.length == 0) {
                return null;
            }
            else {
                var result = that.models[0];
                $.each(that.models, function (index, model) {
                    var dateValue = moment(model.get("date")).valueOf();
                    var resultValue = moment(result.get("date")).valueOf();
                    if (curDateValue <= dateValue && resultValue <= dateValue) {
                        result = model;
                    }
                });
                return result;
            }
        };
        return Thresholds;
    })(Backbone.Collection);
    ForagingMap.Thresholds = Thresholds;
})(ForagingMap || (ForagingMap = {}));
