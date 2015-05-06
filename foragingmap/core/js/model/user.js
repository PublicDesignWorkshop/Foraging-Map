var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var User = (function (_super) {
        __extends(User, _super);
        function User(attributes, options) {
            _super.call(this, attributes, options);
            this.isRemoved = false;
            this.url = "core/php/user.php";
            //this.url = Setting.BASE_URL + this.url;
            this.defaults = {
                "username": "",
                "name": "",
                "auth": 0,
            };
        }
        User.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.auth = parseInt(response.auth);
            return _super.prototype.parse.call(this, response, options);
        };
        User.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        User.prototype.getIsAdmin = function () {
            if (this.get("auth") == 1) {
                return true;
            }
            return false;
        };
        return User;
    })(Backbone.Model);
    ForagingMap.User = User;
})(ForagingMap || (ForagingMap = {}));
