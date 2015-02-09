var files;
function prepareUpload(event) {
    files = event.target.files;
    //console.log(files);
}

function uploadFiles(event, model) {
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    // START A LOADING SPINNER HERE

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function (key, value) {
        data.append(key, value);
    });

    $.ajax({
        url: FMS.getBaseUrl() + 'core/php/upload.php?files',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function (data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                // Success so call function to process the form
                submitForm(event, data, model);
            } else {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
}

function submitForm(event, data, model) {
    // Create a jQuery object from the form
    $form = $(event.target);

    // Serialize the form data
    var formData = $form.serialize();

    // You should sterilise the file names
    $.each(data.files, function (key, value) {
        formData = formData + '&filenames[]=' + value;
    });

    $.ajax({
        url: FMS.getBaseUrl() + 'core/php/upload.php',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (typeof data.error === 'undefined') {
                // Success so call function to process the form
                //console.log('SUCCESS: ' + data.success);
                model.save(
                    { url: data.formData.filenames[0].replace('../../content/picture/', '') },
                    {
                        success: function (model, response) {
                            FMM.getPictures().add(model);
                            FMV.getUIView().render();
                            model.setIsSavable(true);
                            FMV.getMsgView().renderSuccess("'" + model.get("name") + "' " + FML.getViewUIDataDeleteSuccessMsg());
                        },
                        error: function () {
                            FMV.getMsgView().renderError(FML.getViewUIDataSaveErrorMsg());
                        },
                    }
                );
            } else {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
        },
        complete: function () {
            // STOP LOADING SPINNER
        }
    });
}