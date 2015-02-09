module ForagingMap {
    export class Model {
        private layers: Layers;
        private types: Types;
        private items: Items;
        private bends: Bends;
        private thresholds: Thresholds;
        private pictures: Pictures;
        constructor() {
            this.layers = new Layers();
            this.items = new Items();
            this.bends = new Bends();
            this.thresholds = new Thresholds();
            this.pictures = new Pictures();
            this.types = new Types();
            this.types.add(new Type({ name: "Fruit", type: 1 }));
            //this.types.add(new Type({ name: "Station", type: 2 }));
        }
        getTypes(): Types {
            return this.types;
        }
        getLayers(): Layers {
            return this.layers;
        }
        getItems(): Items {
            return this.items;
        }
        getBends(): Bends {
            return this.bends;
        }
        getPictures(): Pictures {
            return this.pictures;
        }
        getThresholds(): Thresholds {
            return this.thresholds;
        }
        getBendRatio(item: Item): number {
            var thresholds: Thresholds = new Thresholds(FMM.getThresholds().where({ pid: item.id }));
            var bends: Bends = new Bends(FMM.getBends().where({ pid: item.id }));
            var date: any = FMV.getSliderView().getCurDate();

            var curThreshold = thresholds.getCurrentThreshold(date);
            var curBend = bends.getCurrentBend(date);
            if (curThreshold != null && curBend != null) {
                var min = parseFloat(curThreshold.get("min"));
                var max = parseFloat(curThreshold.get("max"));
                var bend = parseFloat(curBend.get("value"));
                //console.log(min + "|" + max + "|" + bend);
                if (bend < min) {
                    return bend - min;
                } else {
                    return bend / max;
                }
            }
            return Number.MIN_VALUE;
        }
    }
}