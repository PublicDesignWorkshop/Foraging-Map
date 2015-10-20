var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var Bend = (function (_super) {
        __extends(Bend, _super);
        function Bend(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "core/php/bend.php";
            this.isSavable = true;
            var that = this;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
            this.defaults = {
                "pid": 0,
                "type": 0,
                "value": 0,
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
                        FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataSaveSuccessMsg());
                        FMV.getUIView().drawChart();
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
        }
        Bend.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.pid = parseInt(response.pid);
            response.type = parseInt(response.type);
            response.value = parseFloat(response.value);
            response.date = moment(response.date).format(FMS.getDateTimeFormat());
            response.update = moment(response.update).format(FMS.getDateTimeFormat());
            return _super.prototype.parse.call(this, response, options);
        };
        Bend.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        Bend.prototype.setIsSavable = function (isSavable) {
            this.isSavable = isSavable;
        };
        Bend.prototype.getIsSavable = function () {
            return this.isSavable;
        };
        return Bend;
    })(Backbone.Model);
    ForagingMap.Bend = Bend;
    var Bends = (function (_super) {
        __extends(Bends, _super);
        function Bends(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/bends.php";
            this.model = Bend;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        Bends.prototype.getCurrentBend = function (curDate) {
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
                    if (curDateValue >= dateValue && resultValue <= dateValue) {
                        result = model;
                    }
                });
                return result;
            }
        };
        Bends.prototype.getLabels = function (maxLength) {
            var that = this;
            var result = [];
            if (that.models.length > maxLength) {
                $.each(that.models, function (index, model) {
                    if (that.models.length - index < maxLength) {
                        result.push(moment(model.get("date")).format(FMS.getDateTimeFormatSimple()));
                    }
                });
            }
            else {
                $.each(that.models, function (index, model) {
                    result.push(moment(model.get("date")).format(FMS.getDateTimeFormatSimple()));
                });
            }
            return result;
        };
        Bends.prototype.getValues = function (maxLength) {
            var that = this;
            var result = [];
            if (that.models.length > maxLength) {
                $.each(that.models, function (index, model) {
                    if (that.models.length - index < maxLength) {
                        result.push(model.get("value"));
                    }
                });
            }
            else {
                $.each(that.models, function (index, model) {
                    result.push(model.get("value"));
                });
            }
            return result;
        };
        Bends.prototype.getDataLength = function (maxLength) {
            var that = this;
            if (that.models.length > maxLength) {
                return maxLength;
            }
            else {
                return that.models.length;
            }
        };
        return Bends;
    })(Backbone.Collection);
    ForagingMap.Bends = Bends;
})(ForagingMap || (ForagingMap = {}));
