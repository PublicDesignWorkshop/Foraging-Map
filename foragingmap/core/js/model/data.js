var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BendType;
(function (BendType) {
    BendType[BendType["None"] = 0] = "None";
    BendType[BendType["Normal"] = 1] = "Normal";
})(BendType || (BendType = {}));
var ForagingMap;
(function (ForagingMap) {
    var Bend = (function (_super) {
        __extends(Bend, _super);
        function Bend(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "core/php/bend.php";
            this.url = ForagingMap.Setting.BASE_URL + this.url;
            this.defaults = {
                "pid": 0,
                "type": DataType.None,
                "value": 0,
                "date": moment(new Date()).format(FMS.getDateTimeFormat()),
            };
        }
        Bend.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.type = parseInt(response.type);
            response.value = parseFloat(response.value);
            response.date = moment(response.date).format(FMS.getDateTimeFormat());
            return _super.prototype.parse.call(this, response, options);
        };
        Bend.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        return Bend;
    })(Backbone.Model);
    ForagingMap.Bend = Bend;
    var Bends = (function (_super) {
        __extends(Bends, _super);
        function Bends(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/bends.php";
            this.model = ForagingMap.Item;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        return Bends;
    })(Backbone.Collection);
    ForagingMap.Bends = Bends;
})(ForagingMap || (ForagingMap = {}));
