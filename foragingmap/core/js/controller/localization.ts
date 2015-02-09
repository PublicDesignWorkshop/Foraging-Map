module ForagingMap {
    export class Localization {
        url: string = "core/json/localization.json" + "?" + moment();
        data: any;
        error: string = "N/A";
        constructor() {

        }
        fetch(callback: Function): void {
            var that: Localization = this;
            $.getJSON(Setting.BASE_URL + this.url, {
                cache: false,
            }).done(function (data) {
                that.data = data.en;
                callback();
            });
        }
        getViewTitle(): string {
            if (this.data.view.title) {
                return this.data.view.title;
            }
            return this.error;
        }
        getViewCreator(): string {
            if (this.data.view.creator) {
                return this.data.view.creator;
            }
            return this.error;
        }
        getViewList(): string {
            if (this.data.view.list) {
                return this.data.view.list;
            }
            return this.error;
        }
        getViewMap(): string {
            if (this.data.view.map) {
                return this.data.view.map;
            }
            return this.error;
        }
        getViewLogIn(): string {
            if (this.data.view.login) {
                return this.data.view.login;
            }
            return this.error;
        }
        getViewSignUp(): string {
            if (this.data.view.signup) {
                return this.data.view.signup;
            }
            return this.error;
        }
        getViewMenu(): string {
            if (this.data.view.menu) {
                return this.data.view.menu;
            }
            return this.error;
        }
        getViewUIItemNotSelectedErrorMsg(): string {
            try {
            return this.data.view.ui.itemNotSelectedErrorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUILocateSuccessMsg(): string {
            try {
            return this.data.view.ui.locate.successMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUILocateErrorMsg(): string {
            try {
            return this.data.view.ui.locate.errorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIInfoHeader(): string {
            try {
            return this.data.view.ui.info.header;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIInfoSaveSuccessMsg(): string {
            try {
            return this.data.view.ui.info.saveSuccessMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIInfoSaveErrorMsg(): string {
            try {
            return this.data.view.ui.info.saveErrorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIInfoDeleteConfirmMsg(): string {
            try {
            return this.data.view.ui.info.deleteConfirmMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIInfoDeleteSuccessMsg(): string {
            try {
            return this.data.view.ui.info.deleteSuccessMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIInfoDeleteErrorMsg(): string {
            try {
            return this.data.view.ui.info.deleteErrorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIAddHeader(): string {
            try {
            return this.data.view.ui.add.header;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIAddTempName(): string {
            try {
                return this.data.view.ui.add.tempName;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIAddTypeSelectError(): string {
            try {
                return this.data.view.ui.add.typeSelectError;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataHeader(): string {
            try {
                return this.data.view.ui.data.header;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataSaveSuccessMsg(): string {
            try {
            return this.data.view.ui.data.saveSuccessMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataSaveErrorMsg(): string {
            try {
            return this.data.view.ui.data.saveErrorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataDeleteConfirmMsg(): string {
            try {
            return this.data.view.ui.data.deleteConfirmMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataDeleteSuccessMsg(): string {
            try {
            return this.data.view.ui.data.deleteSuccessMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataDeleteErrorMsg(): string {
            try {
            return this.data.view.ui.data.deleteErrorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIDataNoDataMsg(): string {
            try {
            return this.data.view.ui.data.noDataMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIPictureHeader(): string {
            try {
            return this.data.view.ui.picture.header;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIPictureTempName(): string {
            try {
                return this.data.view.ui.picture.tempName;
            } catch (error) {
                return this.error;
            }
        }
        getViewUIThresholdHeader(): string {
            try {
                return this.data.view.ui.threshold.header;
            } catch (error) {
                return this.error;
            }
        }
        getViewMarkerSaveSuccessMsg(): string {
            try {
                return this.data.view.map.marker.saveSuccessMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewMarkerSaveErrorMsg(): string {
            try {
                return this.data.view.map.marker.saveErrorMsg;
            } catch (error) {
                return this.error;
            }
        }
        getViewUILayerHeader(): string {
            try {
                return this.data.view.ui.layer.header;
            } catch (error) {
                return this.error;
            }
        }
    }
}
