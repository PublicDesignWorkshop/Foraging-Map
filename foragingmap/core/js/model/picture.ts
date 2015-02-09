/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />

module ForagingMap {
    export class Picture extends Backbone.Model {
        url: string = "core/php/picture.php";
        isSavable: boolean = true;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var that: Picture = this;
            this.url = Setting.BASE_URL + this.url;
            this.defaults = <any>{
                "pid": 0,
                "name": FML.getViewUIPictureTempName(),
                "url": "",
                "date": moment(new Date()).format(FMS.getDateTimeFormat()),
                "update": moment(new Date()).format(FMS.getDateTimeFormat()),
            };

            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false) return;
                that.isSavable = false;
                model.save(
                    { update: moment(new Date()).format(FMS.getDateTimeFormat()) },
                    {
                        success: function (model: Bend, response: any) {
                            model.isSavable = true;
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIDataSaveSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getMsgView().renderError(FML.getViewUIInfoSaveErrorMsg());
                        },
                    }
                    );
            });
        }
        parse(response: any, options?: any): any {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.pid = parseInt(response.pid);
            response.date = moment(response.date).format(FMS.getDateTimeFormat());
            response.update = moment(response.update).format(FMS.getDateTimeFormat());
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
        setIsSavable(isSavable: boolean): void {
            this.isSavable = isSavable;
        }
        getIsSavable(): boolean {
            return this.isSavable;
        }
    }
    export class Pictures extends Backbone.Collection<Picture> {
        url: string = "core/php/pictures.php";
        constructor(models?: Bend[], options?: any) {
            super(models, options);
            this.model = Picture;
            this.url = Setting.BASE_URL + this.url;
        }
    }
}