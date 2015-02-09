var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "core/php/layer.php";
            this.isSavable = true;
            var that = this;
            that.url = ForagingMap.Setting.BASE_URL + that.url;
            that.defaults = {
                "name": "",
                "desc": "",
                "type": 0,
                "icon": "",
            };
            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false)
                    return;
                var i = FMV.getMapView().getMarkersView().removeMarkers(that);
                model.save({}, {
                    wait: true,
                    success: function (model, response) {
                        FMV.getUIView().render();
                        FMV.getMapView().getMarkersView().render();
                        FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getUIView().render();
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
        }
        Layer.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.type = parseInt(response.type);
            return _super.prototype.parse.call(this, response, options);
        };
        Layer.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        Layer.prototype.setIsSavable = function (isSavable) {
            this.isSavable = isSavable;
        };
        Layer.prototype.getIsSavable = function () {
            return this.isSavable;
        };
        return Layer;
    })(Backbone.Model);
    ForagingMap.Layer = Layer;
    var Layers = (function (_super) {
        __extends(Layers, _super);
        function Layers(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/layers.php";
            this.model = Layer;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        Layers.prototype.getSizeOfType = function (typeIndex) {
            var that = this;
            var result = 0;
            $.each(that.models, function (index, model) {
                if (parseInt(model.get("type")) == typeIndex) {
                    result++;
                }
            });
            return result;
        };
        return Layers;
    })(Backbone.Collection);
    ForagingMap.Layers = Layers;
    var Type = (function (_super) {
        __extends(Type, _super);
        function Type(attributes, options) {
            _super.call(this, attributes, options);
            this.defaults = {
                "name": "",
                "type": 0,
            };
        }
        Type.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.type = parseInt(response.type);
            return _super.prototype.parse.call(this, response, options);
        };
        Type.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        return Type;
    })(Backbone.Model);
    ForagingMap.Type = Type;
    var Types = (function (_super) {
        __extends(Types, _super);
        function Types(models, options) {
            _super.call(this, models, options);
            this.model = Type;
        }
        Types.prototype.toArray = function () {
            var that = this;
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.get("type")]);
            });
            return result;
        };
        return Types;
    })(Backbone.Collection);
    ForagingMap.Types = Types;
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(attributes, options) {
            _super.call(this, attributes, options);
            this.defaults = {
                "name": "",
                "src": "",
            };
        }
        Icon.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            return _super.prototype.parse.call(this, response, options);
        };
        Icon.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        return Icon;
    })(Backbone.Model);
    ForagingMap.Icon = Icon;
    var Icons = (function (_super) {
        __extends(Icons, _super);
        function Icons(models, options) {
            _super.call(this, models, options);
            this.model = Icon;
        }
        Icons.prototype.toArray = function () {
            var that = this;
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.get("src")]);
            });
            return result;
        };
        return Icons;
    })(Backbone.Collection);
    ForagingMap.Icons = Icons;
})(ForagingMap || (ForagingMap = {}));
