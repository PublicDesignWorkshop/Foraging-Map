var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ForagingMap;
(function (ForagingMap) {
    var MsgView = (function (_super) {
        __extends(MsgView, _super);
        function MsgView(options) {
            _super.call(this, options);
            this.setElement(options.el);
        }
        MsgView.prototype.renderError = function (msg) {
            var that = this;
            var template = _.template(FMMsgViewErrorTemplate);
            var data = { "msg": msg };
            that.$el.html(template(data));
            if (that.timeout != null) {
                clearTimeout(that.timeout);
            }
            that.timeout = setTimeout(function () {
                that.$el.html("");
            }, FMS.getMsgTimeout());
        };
        MsgView.prototype.renderSuccess = function (msg) {
            var that = this;
            var template = _.template(FMMsgViewSuccessTemplate);
            var data = { "msg": msg };
            that.$el.html(template(data));
            if (that.timeout != null) {
                clearTimeout(that.timeout);
            }
            that.timeout = setTimeout(function () {
                that.$el.html("");
            }, FMS.getMsgTimeout());
        };
        return MsgView;
    })(Backbone.View);
    ForagingMap.MsgView = MsgView;
})(ForagingMap || (ForagingMap = {}));
var FMMsgViewErrorTemplate = '';
FMMsgViewErrorTemplate += '<span class="label label-warning"><%= msg %></span>';
var FMMsgViewSuccessTemplate = '';
FMMsgViewSuccessTemplate += '<span class="label label-success"><%= msg %></span>';
