/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />
enum BendType {
    None = 0, Normal = 1
}
module ForagingMap {
    export class Bend extends Backbone.Model {
        url: string = "core/php/bend.php";
        isSavable: boolean = true;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var that: Bend = this;
            this.url = Setting.BASE_URL + this.url;
            this.defaults = <any>{
                "pid": 0,
                "type": BendType.None,
                "value": 0,
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
                            FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataSaveSuccessMsg());
                            FMV.getUIView().drawChart();
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
            response.value = parseFloat(response.value);
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
    export class Bends extends Backbone.Collection<Bend> {
        url: string = "core/php/bends.php";
        constructor(models?: Bend[], options?: any) {
            super(models, options);
            this.model = Bend;
            this.url = Setting.BASE_URL + this.url;
        }
        getCurrentBend(curDate: string): Bend {
            var that: Bends = this;
            var curDateValue = moment(curDate).valueOf();
            if (that.models.length == 0) {
                return null;
            } else {
                var result: Bend = that.models[0];
                $.each(that.models, function (index: number, model: Bend) {
                    var dateValue = moment(model.get("date")).valueOf();
                    var resultValue = moment(result.get("date")).valueOf();
                    if (curDateValue >= dateValue && resultValue <= dateValue) {
                        result = model;
                    }
                });
                return result;
            }
        }
        getLabels(maxLength: number): string[]{
            var that: Bends = this;
            var result = [];
            if (that.models.length > maxLength) {
                $.each(that.models, function (index: number, model: Bend) {
                    if (that.models.length - index < maxLength) {
                        result.push(moment(model.get("date")).format(FMS.getDateTimeFormat()));
                    }
                });
            } else {
                $.each(that.models, function (index: number, model: Bend) {
                    result.push(moment(model.get("date")).format(FMS.getDateTimeFormat()));
                });
            }
            
            return result;
        }
        getValues(maxLength: number): number[] {
            var that: Bends = this;
            var result = [];
            if (that.models.length > maxLength) {
                $.each(that.models, function (index: number, model: Bend) {
                    if (that.models.length - index < maxLength) {
                        result.push(model.get("value"));
                    }
                });
            } else {
                $.each(that.models, function (index: number, model: Bend) {
                    result.push(model.get("value"));
                });
            }
            return result;
        }
        getDataLength(maxLength: number): number {
            var that: Bends = this;
            if (that.models.length > maxLength) {
                return maxLength;
            } else {
                return that.models.length;
            }
        }
    }
}