var ForagingMap;
(function (ForagingMap) {
    var Model = (function () {
        function Model() {
            this.layers = new ForagingMap.Layers();
            this.items = new ForagingMap.Items();
            this.bends = new ForagingMap.Bends();
            this.thresholds = new ForagingMap.Thresholds();
            this.pictures = new ForagingMap.Pictures();
            this.types = new ForagingMap.Types();
            this.types.add(new ForagingMap.Type({ name: "Fruit", type: 1 }));
            this.icons = new ForagingMap.Icons();
        }
        Model.prototype.getIcons = function () {
            return this.icons;
        };
        Model.prototype.getTypes = function () {
            return this.types;
        };
        Model.prototype.getLayers = function () {
            return this.layers;
        };
        Model.prototype.getItems = function () {
            return this.items;
        };
        Model.prototype.getBends = function () {
            return this.bends;
        };
        Model.prototype.getPictures = function () {
            return this.pictures;
        };
        Model.prototype.getThresholds = function () {
            return this.thresholds;
        };
        Model.prototype.getBendRatio = function (item) {
            var thresholds = new ForagingMap.Thresholds(FMM.getThresholds().where({ pid: item.id }));
            var bends = new ForagingMap.Bends(FMM.getBends().where({ pid: item.id }));
            var date = FMV.getSliderView().getCurDate();
            var curThreshold = thresholds.getCurrentThreshold(date);
            var curBend = bends.getCurrentBend(date);
            if (curThreshold != null && curBend != null) {
                var min = parseFloat(curThreshold.get("min"));
                var max = parseFloat(curThreshold.get("max"));
                var bend = parseFloat(curBend.get("value"));
                if (bend < min) {
                    return bend - min;
                }
                else {
                    return bend / max;
                }
            }
            return Number.MIN_VALUE;
        };
        return Model;
    })();
    ForagingMap.Model = Model;
})(ForagingMap || (ForagingMap = {}));
