/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="..\..\..\Scripts\typings\moment\moment.d.ts" />
/// <reference path="..\controller\setting.ts" />

module ForagingMap {
    export class User extends Backbone.Model {
        isRemoved: boolean = false;
        url: string = "core/php/user.php";
        constructor(attributes?: any, options?: any) {
            super(attributes, options);
            //this.url = Setting.BASE_URL + this.url;
            this.defaults = <any>{
                "username": "",
                "name": "",
                "auth": 0,
            };
        }
        parse(response: any, options?: any): any {
            if (response.id != null) {
                response.id = parseInt(response.id);
            }
            response.auth = parseInt(response.auth);
            return super.parse(response, options);
        }
        toJSON(options?: any): any {
            var clone = this.clone().attributes;
            if (this.id != null) {
                clone["id"] = this.id;
            }
            return clone;
        }
        getIsAdmin() {
            if (this.get("auth") == 1) {
                return true;
            }
            return false;
        }
    }
}