module ForagingMap {
    export class Sensor extends Backbone.Model {
        url: string = "core/php/sensor.php";
        isSavable: boolean = true;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var that: Sensor = this;
            this.url = Setting.BASE_URL + this.url;
            this.defaults = <any>{
                "initial": "",
                "name": "",
            };
            
            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false) return;
                that.isSavable = false;
                model.save(
                    {},
                    {
                        wait: true,
                        success: function (model: Sensor, response: any) {
                            model.isSavable = true;
                            FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataSaveSuccessMsg());
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
    export class Sensors extends Backbone.Collection<Sensor> {
        url: string = "core/php/sensors.php";
        curType: Sensor;
        constructor(models?: Sensor[], options?: any) {
            super(models, options);
            this.model = Sensor;
            this.url = Setting.BASE_URL + this.url;
        }
        intializeCurType(): void {
            var that: Sensors = this;
            $.each(that.models, function (index: number, model: Sensor) {
                if (that.curType == null) {
                    that.curType = model;
                    console.log("Set Sensor Type as " + that.curType.get("name"));
                    if (FMV.getMapView() && FMV.getMapView().getSensorView()) {
                        FMV.getMapView().getSensorView().render();
                    }
                }
            });
        }
        getCurType(): Sensor {
            return this.curType;
        }
        setCurType(num: number): void {
            var that: Sensors = this;
            $.each(that.models, function (index: number, model: Sensor) {
                if (parseInt(model.get('id')) == num) {
                    that.curType = model;
                    console.log("Set Sensor Type as " + that.curType.get("name"));
                    FMV.getMapView().getSensorView().render();
                }
            });
        }
    }
}