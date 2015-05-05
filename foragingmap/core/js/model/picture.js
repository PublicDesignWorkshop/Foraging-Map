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
    var Picture = (function (_super) {
        __extends(Picture, _super);
        function Picture(attributes, options) {
            _super.call(this, attributes, options);
            this.url = "core/php/picture.php";
            this.isSavable = true;
            var that = this;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
            this.defaults = {
                "pid": 0,
                "name": FML.getViewUIPictureTempName(),
                "url": "",
                "date": moment(new Date()).format(FMS.getDateTimeFormat()),
                "update": moment(new Date()).format(FMS.getDateTimeFormat()),
            };
            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false)
                    return;
                that.isSavable = false;
                model.save({ update: moment(new Date()).format(FMS.getDateTimeFormat()) }, {
                    wait: true,
                    success: function (model, response) {
                        model.isSavable = true;
                        FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIDataSaveSuccessMsg());
                    },
                    error: function (error) {
                        FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                    },
                });
            });
        }
        Picture.prototype.parse = function (response, options) {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.pid = parseInt(response.pid);
            response.date = moment(response.date).format(FMS.getDateTimeFormat());
            response.update = moment(response.update).format(FMS.getDateTimeFormat());
            return _super.prototype.parse.call(this, response, options);
        };
        Picture.prototype.toJSON = function (options) {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        };
        Picture.prototype.setIsSavable = function (isSavable) {
            this.isSavable = isSavable;
        };
        Picture.prototype.getIsSavable = function () {
            return this.isSavable;
        };
        return Picture;
    })(Backbone.Model);
    ForagingMap.Picture = Picture;
    var Pictures = (function (_super) {
        __extends(Pictures, _super);
        function Pictures(models, options) {
            _super.call(this, models, options);
            this.url = "core/php/pictures.php";
            this.model = Picture;
            this.url = ForagingMap.Setting.BASE_URL + this.url;
        }
        return Pictures;
    })(Backbone.Collection);
    ForagingMap.Pictures = Pictures;
})(ForagingMap || (ForagingMap = {}));
