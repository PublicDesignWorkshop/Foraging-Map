var DatePickerCellEditor = Backgrid.InputCellEditor.extend({
    events: {},
    initialize: function () {
        Backgrid.InputCellEditor.prototype.initialize.apply(this, arguments);
        var input = this;
        $(this.el).datetimepicker({
            defaultDate: input.model.get("date"),
            format: FMS.getDateTimeFormat(),
        }).on("dp.hide", function () {
            if ($(this).data("date") != undefined) {
                var command = new Backgrid.Command({});
                input.model.set(input.column.get("name"), $(this).data("date"));
                input.model.trigger("backgrid:edited", input.model, input.column, command);
            }
        });
    },
});

var DeleteCell = Backgrid.Cell.extend({
    template: _.template(FMViewUIDataLayerDeleteTemplate),
    events: {
        "click": "deleteRow"
    },
    deleteRow: function (e) {
        var r = confirm(FML.getViewUIDataDeleteConfirmMsg());
        if (r == true) {
            e.preventDefault();
            this.model.collection.remove(this.model);
            this.model.destroy(
                {
                    wait: true,
                    success: function (model, response) {
                        FMV.getUIView().render();
                        if (model.get("value") != undefined) {
                            FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataDeleteSuccessMsg());
                        } else if (model.get("name") != undefined) {
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIDataDeleteSuccessMsg());
                        } else if (model.get("min") != undefined) {
                            FMV.getMsgView().renderSuccess("'" + model.get("min") + " - " + model.get("max") + "' " + FML.getViewUIDataDeleteSuccessMsg());
                        }
                        
                    },
                    error: function () {
                        FMV.getMsgView().renderError(FML.getViewUIDataDeleteErrorMsg());
                    },
                }
            );
        }
    },
    render: function () {
        $(this.el).html(this.template());
        this.delegateEvents();
        return this;
    }
});

var BendAddCell = Backgrid.Cell.extend({
    template: _.template(FMViewUIDataLayerAddTemplate),
    events: {
        "click": "addRow"
    },
    addRow: function (e) {
        e.preventDefault();
        var model = this.model;
        var collection = this.model.collection;
        collection.remove(model);
        FMM.getBends().add(model);
        model.save(
            //update: moment(new Date()).format(FMS.getDateTimeFormat())
            {},
            {
                wait: true,
                success: function (model, response) {
                    FMV.getUIView().render();
                    model.setIsSavable(true);
                    FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataDeleteSuccessMsg());
                },
                error: function () {
                    FMV.getMsgView().renderError(FML.getViewUIDataSaveErrorMsg());
                },
            }
        );

    },
    render: function () {
        $(this.el).html(this.template());
        this.delegateEvents();
        return this;
    }
});

var ThresholdAddCell = Backgrid.Cell.extend({
    template: _.template(FMViewUIDataLayerAddTemplate),
    events: {
        "click": "addRow"
    },
    addRow: function (e) {
        e.preventDefault();
        var model = this.model;
        var collection = this.model.collection;
        collection.remove(model);
        FMM.getThresholds().add(model);
        model.save(
            //update: moment(new Date()).format(FMS.getDateTimeFormat())
            {},
            {
                wait: true,
                success: function (model, response) {
                    FMV.getUIView().render();
                    model.setIsSavable(true);
                    FMV.getMsgView().renderSuccess("'" + model.get("min") + " - " + model.get("max") + "' " + FML.getViewUIDataSaveSuccessMsg());
                },
                error: function () {
                    FMV.getMsgView().renderError(FML.getViewUIDataSaveErrorMsg());
                },
            }
        );

    },
    render: function () {
        $(this.el).html(this.template());
        this.delegateEvents();
        return this;
    }
});

var PictureCell = Backgrid.Cell.extend({
    template: _.template(FMViewUIPictureTemplate),
    className: 'picture-frame',
    events: {
        "click": "zoomIn"
    },
    render: function () {
        var data = {
            "url": FMS.getBaseUrl() + FMS.getPictureDir() + this.model.get("url"),
        };
        $(this.el).html(this.template(data));
        this.delegateEvents();
        return this;
    },
    zoomIn: function (e) {
        e.preventDefault();
        FMV.getGalleryView().render();
        FMV.getGalleryView().show($("table.backgrid img").index($(e.target)));
    },
});

var pictureColumn = [
	{
	    name: "url",
	    label: "Picture",
	    editable: false,
	    cell: PictureCell,
	}, {
	    name: "name",
	    label: "Name",
	    editable: true,
	    cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
	}, {
	    name: "date",
	    label: "Date",
	    editable: true,
	    cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
	}, {
	    label: "delete",
	    sortable: false,
	    editable: false,
	    cell: DeleteCell,
	}
];


var PictureSelectCell = Backgrid.Cell.extend({
    template: _.template(FMUIPictureSelectTemplate),
    className: 'picture-frame',
    events: {
    },
    render: function () {
        $(this.el).html(this.template());
        this.delegateEvents();
        setTimeout(function () {
            $('#picture-add-panel input[type=file]').off('change');
            $('#picture-add-panel input[type=file]').on('change', prepareUpload);
        }, 500);
        return this;
    }
});

var PictureAddCell = Backgrid.Cell.extend({
    template: _.template(FMUIPictureAddTemplate),
    events: {
        "click": "addRow"
    },
    addRow: function (e) {
        console.log("try add");
        e.preventDefault();
        var model = this.model;
        var collection = this.model.collection;
        collection.remove(model);
        uploadFiles(e, model);
    },
    render: function () {
        $(this.el).html(this.template());
        this.delegateEvents();
        return this;
    }
});

var pictureAddColumn = [
	{
	    name: "url",
	    label: "Picture",
	    editable: false,
	    cell: PictureSelectCell,
	}, {
	    name: "name",
	    label: "Name",
	    editable: true,
	    cell: "string",
	}, {
	    name: "date",
	    label: "Date",
	    editable: true,
	    cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
	}, {
	    label: "add",
	    sortable: false,
	    editable: false,
	    cell: PictureAddCell,
	}];

var dataColumn = [
    {
	    name: "value",
	    label: "Value (°)",
	    editable: true,
	    cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
	}, {
	    name: "date",
	    label: "Date",
	    editable: true,
	    cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
	}, {
	    name: "update",
	    label: "Updated",
	    editable: false,
	    cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
	}, {
	    label: "delete",
	    sortable: false,
	    editable: false,
	    cell: DeleteCell,
    }
];

var dataAddColumn = [
    {
        name: "value",
        label: "Value (°)",
        editable: true,
        cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
    }, {
        name: "date",
        label: "Date",
        editable: true,
        cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
    }, {
        name: "update",
        label: "Updated",
        editable: false,
        cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
    }, {
        label: "add",
        sortable: false,
        editable: false,
        cell: BendAddCell,
    }
];

var thresholdColumn = [
    {
        name: "min",
        label: "Min (°)",
        editable: true,
        cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
    }, {
        name: "max",
        label: "Max (°)",
        editable: true,
        cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
    }, {
        name: "date",
        label: "Date",
        editable: true,
        cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
    }, {
        name: "update",
        label: "Updated",
        editable: false,
        cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
    }, {
        label: "delete",
        sortable: false,
        editable: false,
        cell: DeleteCell,
    }
];

var thresholdAddColumn = [
    {
        name: "min",
        label: "Min (°)",
        editable: true,
        cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
    }, {
        name: "max",
        label: "Max (°)",
        editable: true,
        cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
    }, {
        name: "date",
        label: "Date",
        editable: true,
        cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
    }, {
        name: "update",
        label: "Updated",
        editable: false,
        cell: Backgrid.Cell.extend({ editor: DatePickerCellEditor }),
    }, {
        label: "add",
        sortable: false,
        editable: false,
        cell: ThresholdAddCell,
    }
];


var layerColumn = [
    {
        name: "icon",
        label: "Icon",
        editable: true,
        /*
        cell: Backgrid.SelectCell.extend({
            optionValues: FMM.getTypes(),
        })
        */
    }, {
        name: "name",
        label: "Name",
        editable: true,
        cell: "string"
    }, {
        name: "desc",
        label: "Desc",
        editable: true,
        cell: "string"
    }, {
        label: "delete",
        sortable: false,
        editable: false,
        cell: DeleteCell,
    }
];

var LayerAddCell = Backgrid.Cell.extend({
    template: _.template(FMViewUIDataLayerAddTemplate),
    events: {
        "click": "addRow"
    },
    addRow: function (e) {
        e.preventDefault();
        var model = this.model;
        var collection = this.model.collection;
        collection.remove(model);
        FMM.getLayers().add(model);
        model.save(
            //update: moment(new Date()).format(FMS.getDateTimeFormat())
            {},
            {
                wait: true,
                success: function (model, response) {
                    FMV.getUIView().render();
                    model.setIsSavable(true);
                    FMV.getMsgView().renderSuccess("'" + model.get("value") + "' " + FML.getViewUIDataDeleteSuccessMsg());
                },
                error: function () {
                    FMV.getMsgView().renderError(FML.getViewUIDataSaveErrorMsg());
                },
            }
        );

    },
    render: function () {
        $(this.el).html(this.template());
        this.delegateEvents();
        return this;
    }
});

var layerAddColumn = [
    {
        name: "icon",
        label: "Icon",
        editable: true,
        /*
        cell: Backgrid.SelectCell.extend({
            optionValues: FMM.getTypes(),
        })
        */
    }, {
        name: "name",
        label: "Name",
        editable: true,
        cell: "string"
    }, {
        name: "desc",
        label: "Desc",
        editable: true,
        cell: "string"
    }, {
        label: "add",
        sortable: false,
        editable: false,
        cell: LayerAddCell,
    }
];