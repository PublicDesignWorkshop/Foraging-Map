/// <reference path="..\..\..\Scripts\typings\backbone\backbone.d.ts" />
/// <reference path="..\..\..\Scripts\typings\leaflet\leaflet.d.ts" />
/// <reference path="template.ts" />

module ForagingMap {
    export class MsgView extends Backbone.View<Backbone.Model> {
        private timeout: any;
        constructor(options?: Backbone.ViewOptions<Backbone.Model>) {
            super(options);
            this.setElement(options.el);
        }
        renderError(msg: string): void {
            var that: MsgView = this;
            var template = _.template(FMMsgViewErrorTemplate);
            var data = { "msg": msg };
            that.$el.html(template(data));
            if (that.timeout != null) {
                clearTimeout(that.timeout);
            }
            that.timeout = setTimeout(function () {
                that.$el.html("");
            }, FMS.getMsgTimeout());
        }
        renderSuccess(msg: string): void {
            var that: MsgView = this;
            var template = _.template(FMMsgViewSuccessTemplate);
            var data = { "msg": msg };
            that.$el.html(template(data));
            if (that.timeout != null) {
                clearTimeout(that.timeout);
            }
            that.timeout = setTimeout(function () {
                that.$el.html("");
            }, FMS.getMsgTimeout());
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMMsgViewErrorTemplate = '';
FMMsgViewErrorTemplate += '<span class="label label-warning"><%= msg %></span>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMMsgViewSuccessTemplate = '';
FMMsgViewSuccessTemplate += '<span class="label label-success"><%= msg %></span>';