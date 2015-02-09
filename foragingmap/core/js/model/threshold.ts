 /// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />
enum ThresholdType {
    None = 0, Normal = 1
}
module ForagingMap {
    export class Threshold extends Backbone.Model {
        url: string = "core/php/threshold.php";
        isSavable: boolean = true;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var that: Bend = this;
            this.url = Setting.BASE_URL + this.url;
            this.defaults = <any>{
                "pid": 0,
                "type": ThresholdType.None,
                "min": 0,
                "max": 0,
                "date": moment(new Date()).format(FMS.getDateTimeFormat()),
                "update": moment(new Date()).format(FMS.getDateTimeFormat()),
            };

            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false) return;
                that.isSavable = false;
                model.save(
                    {},
                    {
                        wait: true,
                        success: function (model: Bend, response: any) {
                            model.isSavable = true;
                            FMV.getMsgView().renderSuccess("'" + model.get("min") + " - " + model.get("max") + "' " + FML.getViewUIDataSaveSuccessMsg());
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
            response.type = parseInt(response.type);
            response.min = parseFloat(response.min);
            response.max = parseFloat(response.max);
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
    export class Thresholds extends Backbone.Collection<Threshold> {
        url: string = "core/php/thresholds.php";
        constructor(models?: Bend[], options?: any) {
            super(models, options);
            this.model = Threshold;
            this.url = Setting.BASE_URL + this.url;
        }
        getCurrentThreshold(curDate: string): Threshold {
            var that: Thresholds = this;
            var curDateValue = moment(curDate).valueOf();
            if (that.models.length == 0) {
                return null;
            } else {
                var result: Threshold = that.models[0];
                $.each(that.models, function (index: number, model: Threshold) {
                    var dateValue = moment(model.get("date")).valueOf();
                    var resultValue = moment(result.get("date")).valueOf();
                    if (curDateValue <= dateValue && resultValue <= dateValue) {
                        result = model;
                    }
                });
                return result;
            }
        }
    }
}