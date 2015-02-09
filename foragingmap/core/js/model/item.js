var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ItemType;
(function (ItemType) {
    ItemType[ItemType["None"] = 0] = "None";
    ItemType[ItemType["Fruit"] = 1] = "Fruit";
    ItemType[ItemType["Station"] = 2] = "Station";
})(ItemType || (ItemType = {}));
var ForagingMap;
(function (ForagingMap) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(attributes, options) {
            _super.call(this, attributes, options);
            this.isRemoved = false;
            this.url = "core/php/item.php";
            this.url = ForagingMap.Setting.BASE_URL + this.url;
            this.defaults = {
                "name": "",
                "desc": "",
                "serial": "",
                "type": 0 /* None */,
                "sort": 0,
                "amount": 0,
                "lat": 0,
                "lng": 0,
                "regdate": moment(new Date()).format(FMS.getDateTimeFormat()),
                "update": moment(new Date()).format(FMS.getDateTimeFormat()),
            };
        }
        Item.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.type = parseInt(response.type);
            response.sort = parseInt(response.sort);
            response.amount = parseFloat(response.amount);
            response.lat = parseFloat(response.lat);
            response.lng = parseFloat(response.lng);
            response.update = moment(response.update).format(FMS.getDateTimeFormat());
            response.regdate = moment(response.regdate).format(FMS.getDateTimeFormat());
            return _super.prototype.parse.call(this, response, options);
        };
        Item.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        Item.prototype.setIsRemoved = function (isRemoved) {
            this.isRemoved = isRemoved;
        };
        Item.prototype.getIsRemoved = function () {
            return this.isRemoved;
        };
        return Item;
    })(Backbone.Model);
    ForagingMap.Item = Item;
    var Items = (function (_super) {
        __extends(Items, _super);
        function Items(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/items.php";
            this.model = Item;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        Items.prototype.getIds = function () {
            var that = this;
            var result = new Array();
            $.each(that.models, function (index, model) {
                result.push(model.id);
            });
            return result;
        };
        Items.prototype.getIdsToString = function () {
            var that = this;
            var result = new Array();
            $.each(that.models, function (index, model) {
                result.push(parseInt(model.id));
            });
            return result.sort(function (a, b) {
                return a - b;
            }).join(",");
        };
        Items.prototype.toArray = function () {
            var that = this;
            that.sort();
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.id]);
            });
            return result;
        };
        Items.prototype.comparator = function (model) {
            return model.get("name");
        };
        return Items;
    })(Backbone.Collection);
    ForagingMap.Items = Items;
})(ForagingMap || (ForagingMap = {}));
