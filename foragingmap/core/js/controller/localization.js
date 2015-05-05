var ForagingMap;
(function (ForagingMap) {
    /**
     * Import localizaiton.json file and store into this class to parse the string values.
     */
    var Localization = (function () {
        function Localization() {
            this.url = "core/json/localization.json" + "?" + moment(); // Put timeline so that it cannot be cached.
            this.error = "N/A"; // Default string value if the value cannot be found in localizaiton.json file.
        }
        // Import json file and save into this class.
        Localization.prototype.fetch = function (callback) {
            var that = this;
            $.getJSON(ForagingMap.Setting.BASE_URL + this.url, {
                cache: false,
            }).done(function (data) {
                that.data = data.en;
                callback();
            });
        };
        // View Panel Message
        Localization.prototype.getViewTitle = function () {
            if (this.data.view.title) {
                return this.data.view.title;
            }
            return this.error;
        };
        Localization.prototype.getViewCreator = function () {
            if (this.data.view.creator) {
                return this.data.view.creator;
            }
            return this.error;
        };
        Localization.prototype.getViewList = function () {
            if (this.data.view.list) {
                return this.data.view.list;
            }
            return this.error;
        };
        Localization.prototype.getViewMap = function () {
            if (this.data.view.map) {
                return this.data.view.map;
            }
            return this.error;
        };
        Localization.prototype.getViewLogIn = function () {
            if (this.data.view.login) {
                return this.data.view.login;
            }
            return this.error;
        };
        Localization.prototype.getViewSignUp = function () {
            if (this.data.view.signup) {
                return this.data.view.signup;
            }
            return this.error;
        };
        Localization.prototype.getViewMenu = function () {
            if (this.data.view.menu) {
                return this.data.view.menu;
            }
            return this.error;
        };
        Localization.prototype.getViewUIItemNotSelectedErrorMsg = function () {
            try {
                return this.data.view.ui.itemNotSelectedErrorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUILocateSuccessMsg = function () {
            try {
                return this.data.view.ui.locate.successMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUILocateErrorMsg = function () {
            try {
                return this.data.view.ui.locate.errorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIInfoHeader = function () {
            try {
                return this.data.view.ui.info.header;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIInfoSaveSuccessMsg = function () {
            try {
                return this.data.view.ui.info.saveSuccessMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIInfoSaveErrorMsg = function () {
            try {
                return this.data.view.ui.info.saveErrorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIInfoDeleteConfirmMsg = function () {
            try {
                return this.data.view.ui.info.deleteConfirmMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIInfoDeleteSuccessMsg = function () {
            try {
                return this.data.view.ui.info.deleteSuccessMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIInfoDeleteErrorMsg = function () {
            try {
                return this.data.view.ui.info.deleteErrorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIAddHeader = function () {
            try {
                return this.data.view.ui.add.header;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIAddTempName = function () {
            try {
                return this.data.view.ui.add.tempName;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIAddTypeSelectError = function () {
            try {
                return this.data.view.ui.add.typeSelectError;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataHeader = function () {
            try {
                return this.data.view.ui.data.header;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataSaveSuccessMsg = function () {
            try {
                return this.data.view.ui.data.saveSuccessMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataSaveErrorMsg = function () {
            try {
                return this.data.view.ui.data.saveErrorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataDeleteConfirmMsg = function () {
            try {
                return this.data.view.ui.data.deleteConfirmMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataDeleteSuccessMsg = function () {
            try {
                return this.data.view.ui.data.deleteSuccessMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataDeleteErrorMsg = function () {
            try {
                return this.data.view.ui.data.deleteErrorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIDataNoDataMsg = function () {
            try {
                return this.data.view.ui.data.noDataMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIPictureHeader = function () {
            try {
                return this.data.view.ui.picture.header;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIPictureTempName = function () {
            try {
                return this.data.view.ui.picture.tempName;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUIThresholdHeader = function () {
            try {
                return this.data.view.ui.threshold.header;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewMarkerSaveSuccessMsg = function () {
            try {
                return this.data.view.map.marker.saveSuccessMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewMarkerSaveErrorMsg = function () {
            try {
                return this.data.view.map.marker.saveErrorMsg;
            }
            catch (error) {
                return this.error;
            }
        };
        Localization.prototype.getViewUILayerHeader = function () {
            try {
                return this.data.view.ui.layer.header;
            }
            catch (error) {
                return this.error;
            }
        };
        return Localization;
    })();
    ForagingMap.Localization = Localization;
})(ForagingMap || (ForagingMap = {}));
