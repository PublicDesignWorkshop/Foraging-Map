module ForagingMap {
    export class Layer extends Backbone.Model {
        url: string = "core/php/layer.php";
        private isSavable = true;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            var that: Layer = this;
            that.url = Setting.BASE_URL + that.url;
            that.defaults = <any>{
                "name": "",
                "desc": "",
                "type": 0,
                "icon": "",
            };
            that.off("change");
            that.on("change", function (model, options) {
                if (that.isSavable == false) return;

                var i = FMV.getMapView().getMarkersView().removeMarkers(that);
                model.save(
                    {},
                    {
                        wait: true,
                        success: function (model: Layer, response: any) {
                            FMV.getUIView().render();
                            FMV.getMapView().getMarkersView().render();
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIInfoSaveSuccessMsg());
                        },
                        error: function (error) {
                            FMV.getUIView().render();
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
            response.type = parseInt(response.type);
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


    export class Layers extends Backbone.Collection<Layer> {
        url: string = "core/php/layers.php";
        constructor(models?: Layer[], options?: any) {
            super(models, options);
            this.model = Layer;
            this.url = Setting.BASE_URL + this.url;
        }
        getSizeOfType(typeIndex: number): number {
            var that: Layers = this;
            var result: number = 0;
            $.each(that.models, function (index: number, model: Layer) {
                if (parseInt(model.get("type")) == typeIndex) {
                    result++;
                }
            });
            return result;
        }
        toArray(): any {
            var that: Layers = this;
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.get("id")]);
            });
            return result;
        }
    }

    export class Type extends Backbone.Model {
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            this.defaults = <any>{
                "name": "",
                "type": 0,
            };
        }
        parse(response: any, options?: any): any {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.type = parseInt(response.type);
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
    }
    export class Types extends Backbone.Collection<Type> {
        constructor(models?: Type[], options?: any) {
            super(models, options);
            this.model = Type;
        }
        toArray(): any {
            var that: Types = this;
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.get("type")]);
            });
            return result;
        }
    }

    export class Icon extends Backbone.Model {
        icon: L.Icon;
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            this.defaults = <any>{
                "name": "",
                "src": "",
            };
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
    }
    export class Icons extends Backbone.Collection<Icon> {
        constructor(models?: Icon[], options?: any) {
            super(models, options);
            this.model = Icon;
        }
        toArray(): any {
            var that: Icons = this;
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.get("src")]);
            });
            return result;
        }
    }
}