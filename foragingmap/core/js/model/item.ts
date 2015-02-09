/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />

enum ItemType {
    None = 0, Fruit = 1, Station = 2
}

module ForagingMap {
    export class Item extends Backbone.Model {
        isRemoved: boolean = false;
        marker: L.Marker;
        circle: L.Circle;
        url: string = "core/php/item.php";
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            this.url = Setting.BASE_URL + this.url;
            this.defaults = <any>{
                "name": "",
                "desc": "",
                "serial": "",
                "type": ItemType.None,
                "sort": 0,
                "amount": 0,
                "lat": 0,
                "lng": 0,
                "regdate": moment(new Date()).format(FMS.getDateTimeFormat()),
                "update": moment(new Date()).format(FMS.getDateTimeFormat()),
            };
        }
        parse(response: any, options?: any): any {
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
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
        setIsRemoved(isRemoved: boolean): void {
            this.isRemoved = isRemoved;
        }
        getIsRemoved(): boolean {
            return this.isRemoved;
        }
    }

    export class Items extends Backbone.Collection<Item> {
        url: string = "core/php/items.php";
        constructor(models?: Item[], options?: any) {
            super(models, options);
            this.model = Item;
            this.url = Setting.BASE_URL + this.url;
        }
        getIds(): Array<number> {
            var that: Items = this;
            var result = new Array<number>();
            $.each(that.models, function (index: number, model: Backbone.Model) {
                result.push(model.id);
            });
            return result;
        }
        getIdsToString(): string {
            var that: Items = this;
            var result = new Array<number>();
            $.each(that.models, function (index: number, model: Backbone.Model) {
                result.push(parseInt(model.id));
            });
            return result.sort(function (a, b) { return a - b }).join(",");
        }
        toArray(): any {
            var that: Items = this;
            that.sort();
            var result = new Array();
            _.each(that.models, function (item) {
                result.push([item.get("name"), item.id]);
            });
            return result;
        }
        comparator(model: Item): any {
            return model.get("name");
        }
    }
}