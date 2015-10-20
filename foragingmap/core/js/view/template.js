//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewTemplate = '';
FMViewTemplate += '<div id="fm-view-body" class="panel panel-primary">';
// Panel Heading Start
FMViewTemplate += '<div class="panel-heading">';
FMViewTemplate += '<div id="fm-logo" class="panel-title nav-title"><%= title %></div>';
FMViewTemplate += '<div class="btn-group nav-primary" role="group" aria-label="nav-primary">';
FMViewTemplate += '<div id="fm-view-slider"></div>';
//FMViewTemplate +=               '<button type="button" class="btn btn-default"><%= list %></button>';
//FMViewTemplate +=               '<button type="button" class="btn btn-default"><%= map %></button>';
FMViewTemplate += '</div>';
FMViewTemplate += '<div class="btn-group nav-secondary" role="group" aria-label="nav-secondary">';
FMViewTemplate += '<button type="button" id="btn-toggle-menu" class="btn btn-default"><span class="glyphicon glyphicon-tasks"></span> <%= menu %></button>';
FMViewTemplate += '</div>';
FMViewTemplate += '<div class="clear" />';
FMViewTemplate += '</div>';
// Panel Body Start
FMViewTemplate += '<div id="fm-view-map">';
FMViewTemplate += '<div id="leaflet-view-ui"></div>';
FMViewTemplate += '<div id="leaflet-view-map"></div>';
FMViewTemplate += '<div id="leaflet-view-msg"></div>';
FMViewTemplate += '<div id="leaflet-view-menu"></div>';
FMViewTemplate += '<div id="leaflet-view-galleria">';
FMViewTemplate += '</div>';
FMViewTemplate += '<div id="leaflet-view-animation"></div>';
FMViewTemplate += '</div>';
FMViewTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMUIInfoLayerTemplate = '';
FMUIInfoLayerTemplate += '<div class="ui-header"><%= header %></div>';
FMUIInfoLayerTemplate += '<div class="ui-body">';
FMUIInfoLayerTemplate += '<form class="form-horizontal">';
// item-info-id
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-id" class="col-xs-3 control-label">#id</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-id" value="<%= id %>" readonly>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-name
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-name" class="col-xs-3 control-label">Name</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-name" value="<%= name %>"<% if (!isAdmin) { %>readonly<% } %>>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-desc
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-desc" class="col-xs-3 control-label">Description</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-desc" value="<%= desc %>"<% if (!isAdmin) { %>readonly<% } %>>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-serial
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-serial" class="col-xs-3 control-label">Sensor Serial</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-serial" value="<%= serial %>"<% if (!isAdmin) { %>readonly<% } %>>';
//FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-serial" value="<%= serial %>" disabled>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-serial-select TODO
FMUIInfoLayerTemplate += '<% if (isAdmin) { %>'; // if admin
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-qrcode" class="col-xs-3 control-label">QRCode</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<input class="fileupload" id="item-info-qrcode" placeholder="" type="file" accept="image/*" capture="camera" />';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '<% } %>'; // if non-admin
// item-info-type
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-type" class="col-xs-3 control-label">Type</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<select id="item-info-type" class="selectpicker" <% if (!isAdmin) { %>disabled<% } %>>';
//FMUIInfoLayerTemplate += '<optgroup label="None">';
//FMUIInfoLayerTemplate += '<option data-type="0" data-sort="0">None</option>';
//FMUIInfoLayerTemplate += '</optgroup>';
FMUIInfoLayerTemplate += '<optgroup label="Fruit">';
FMUIInfoLayerTemplate += '<% _.each(sort1, function (sort) { %>';
FMUIInfoLayerTemplate += '<option data-type="1" data-sort="<%= sort.get("id") %>"><%= sort.get("name") %></option>';
FMUIInfoLayerTemplate += '<% }); %>';
FMUIInfoLayerTemplate += '                              </optgroup>';
//FMUIInfoLayerTemplate += '<optgroup label="Station">';
//FMUIInfoLayerTemplate += '<% _.each(sort2, function (sort) { %>';
//FMUIInfoLayerTemplate += '<option data-type="2" data-sort="<%= sort.get("id") %>"><%= sort.get("name") %></option>';
//FMUIInfoLayerTemplate += '<% }); %>';
//FMUIInfoLayerTemplate += '</optgroup>';
FMUIInfoLayerTemplate += '</select>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-amount
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-amount" class="col-xs-3 control-label">Amount</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<div class="input-group">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-amount" value="<%= amount %>"<% if (!isAdmin) { %>readonly<% } %>>';
FMUIInfoLayerTemplate += '<span class="input-group-addon">s</span>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-lat
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-lat" class="col-xs-3 control-label">Latitude</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<div class="input-group">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-lat" value="<%= lat %>"<% if (!isAdmin) { %>readonly<% } %>>';
FMUIInfoLayerTemplate += '<span class="input-group-addon">°</span>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-lng    
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-lng" class="col-xs-3 control-label">Longitude</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<div class="input-group">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-lng" value="<%= lng %>"<% if (!isAdmin) { %>readonly<% } %>>';
FMUIInfoLayerTemplate += '<span class="input-group-addon">°</span>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-date
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-date" class="col-xs-3 control-label">Updated</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
//FMUIInfoLayerTemplate +=                            '<div class="input-group date" id="item-info-date-picker">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" id="item-info-date" value="<%= update %>" readonly>';
//FMUIInfoLayerTemplate +=                                '<span class="input-group-addon input-group-addon-click" id="item-info-date-select"></span>';
//FMUIInfoLayerTemplate +=                            '</div>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
// item-info-reg
FMUIInfoLayerTemplate += '<div class="form-group">';
FMUIInfoLayerTemplate += '<label for="item-info-reg" class="col-xs-3 control-label">Registered</label>';
FMUIInfoLayerTemplate += '<div class="col-xs-9">';
FMUIInfoLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-reg" value="<%= regdate %>" readonly>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '<% if (isAdmin) { %>'; // if admin
// item-info-btn-edit
FMUIInfoLayerTemplate += '<button id="item-info-btn-edit" type="button" class="btn btn-default col-xs-6"><span class="glyphicon glyphicon-ok"></span> Save</button>';
// item-info-btn-delete
FMUIInfoLayerTemplate += '<button id="item-info-btn-delete" type="button" class="btn btn-default col-xs-6"><span class="glyphicon glyphicon-remove"></span> Delete</button>';
FMUIInfoLayerTemplate += '<div style="clear:both;"/>';
FMUIInfoLayerTemplate += '</form>';
FMUIInfoLayerTemplate += '</div>';
FMUIInfoLayerTemplate += '<% } %>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMUIAddLayerTemplate = '';
FMUIAddLayerTemplate += '<div class="ui-header"><%= header %></div>';
FMUIAddLayerTemplate += '<div class="ui-body">';
FMUIAddLayerTemplate += '<form class="form-horizontal">';
// item-info-name
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-name" class="col-xs-3 control-label">Name</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-name" value="<%= name %>">';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-desc
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-desc" class="col-xs-3 control-label">Description</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-desc" value="<%= desc %>">';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-serial
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-serial" class="col-xs-3 control-label">Sensor Serial</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-serial" value="<%= serial %>">';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-serial-select TODO
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-qrcode" class="col-xs-3 control-label">QRCode</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<input class="fileupload" id="item-info-qrcode" placeholder="" type="file" accept="image/*" capture="camera" />';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-type
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-type" class="col-xs-3 control-label">Type</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<select id="item-info-type" class="selectpicker">';
FMUIAddLayerTemplate += '<optgroup label="None">';
FMUIAddLayerTemplate += '<option data-type="0" data-sort="0">None</option>';
FMUIAddLayerTemplate += '</optgroup>';
FMUIAddLayerTemplate += '<optgroup label="Fruit">';
FMUIAddLayerTemplate += '<% _.each(sort1, function (sort) { %>';
FMUIAddLayerTemplate += '<option data-type="1" data-sort="<%= sort.get("id") %>"><%= sort.get("name") %></option>';
FMUIAddLayerTemplate += '<% }); %>';
FMUIAddLayerTemplate += '</optgroup>';
FMUIAddLayerTemplate += '</select>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-amount
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-amount" class="col-xs-3 control-label">Amount</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<div class="input-group">';
FMUIAddLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-amount" value="<%= amount %>">';
FMUIAddLayerTemplate += '<span class="input-group-addon">s</span>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-lat
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-lat" class="col-xs-3 control-label">Latitude</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<div class="input-group">';
FMUIAddLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-lat" value="<%= lat %>">';
FMUIAddLayerTemplate += '<span class="input-group-addon">°</span>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-lng    
FMUIAddLayerTemplate += '<div class="form-group">';
FMUIAddLayerTemplate += '<label for="item-info-lng" class="col-xs-3 control-label">Longitude</label>';
FMUIAddLayerTemplate += '<div class="col-xs-9">';
FMUIAddLayerTemplate += '<div class="input-group">';
FMUIAddLayerTemplate += '<input type="text" class="form-control" placeholder="" id="item-info-lng" value="<%= lng %>">';
FMUIAddLayerTemplate += '<span class="input-group-addon">°</span>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
FMUIAddLayerTemplate += '</div>';
// item-info-btn-edit
FMUIAddLayerTemplate += '<button id="item-info-btn-edit" type="button" class="btn btn-default col-xs-6"><span class="glyphicon glyphicon-ok"></span> Save</button>';
// item-info-btn-delete
FMUIAddLayerTemplate += '<button id="item-info-btn-delete" type="button" class="btn btn-default col-xs-6"><span class="glyphicon glyphicon-remove"></span> Cancel</button>';
FMUIAddLayerTemplate += '<div style="clear:both;"/>';
FMUIAddLayerTemplate += '</form>';
FMUIAddLayerTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewUIDataLayerTemplate = '';
FMViewUIDataLayerTemplate += '<div class="ui-header"><%= header %></div>';
FMViewUIDataLayerTemplate += '<div class="ui-body">';
FMViewUIDataLayerTemplate += '<div id="bendWrapper" style="overflow-x: scroll; overflow-y: hidden;"><canvas id="bendChart" width= "460" height= "250"></canvas></div>';
FMViewUIDataLayerTemplate += '<% if (isAdmin) { %>'; // if admin
FMViewUIDataLayerTemplate += '<button type="button" data-toggle="collapse" data-target="#date-add-panel" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-plus"></span> Add New Data</button>';
FMViewUIDataLayerTemplate += '<div class="collapse" id="date-add-panel">';
FMViewUIDataLayerTemplate += '<% } %>';
FMViewUIDataLayerTemplate += '</div><div class="grid-data"></div>';
FMViewUIDataLayerTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewUIThresholdLayerTemplate = '';
FMViewUIThresholdLayerTemplate += '<div class="ui-header"><%= header %></div>';
FMViewUIThresholdLayerTemplate += '<div class="ui-body">';
FMViewUIThresholdLayerTemplate += '<% if (isAdmin) { %>'; // if admin
FMViewUIThresholdLayerTemplate += '<button type="button" data-toggle="collapse" data-target="#threshold-add-panel" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-plus"></span> Add New Threshold</button>';
FMViewUIThresholdLayerTemplate += '<div class="collapse" id="threshold-add-panel">';
FMViewUIThresholdLayerTemplate += '<% } %>';
FMViewUIThresholdLayerTemplate += '</div>';
FMViewUIThresholdLayerTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewUIDataLayerDeleteTemplate = '';
FMViewUIDataLayerDeleteTemplate = '<button type="button" class="btn btn-default btn-table"><span class="glyphicon glyphicon-remove"></span></button>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewUIDataLayerAddTemplate = '';
FMViewUIDataLayerAddTemplate = '<button type="button" class="btn btn-default btn-table"><span class="glyphicon glyphicon-plus"></span></button>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewUILayerPictureTemplate = '';
FMViewUILayerPictureTemplate += '<div class="ui-header"><%= header %></div>';
FMViewUILayerPictureTemplate += '<div class="ui-body ui-picture">';
FMViewUILayerPictureTemplate += '<% if (isAdmin) { %>'; // if admin
FMViewUILayerPictureTemplate += '<button type="button" data-toggle="collapse" data-target="#picture-add-panel" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-plus"></span> Add New Picture</button>';
FMViewUILayerPictureTemplate += '<div class="collapse" id="picture-add-panel">';
FMViewUILayerPictureTemplate += '<% } %>';
FMViewUILayerPictureTemplate += '</div>';
FMViewUILayerPictureTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewUIPictureTemplate = '';
FMViewUIPictureTemplate += '<img class="picture-thumbnail" src="<%= url %>" />';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMUIPictureSelectTemplate = '';
FMUIPictureSelectTemplate += '<input class="fileupload" type="file" accept="image/*" capture="camera" />';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMUIPictureAddTemplate = '';
FMUIPictureAddTemplate = '<button type="button" class="btn btn-default btn-table"><span class="glyphicon glyphicon-plus"></span></button>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewGalleryTemplate = '';
FMViewGalleryTemplate += '<button id="btn-galleria-close" type="button" class="btn btn-default btn-table"><span class="glyphicon glyphicon-remove-circle"></span> Close</button>';
FMViewGalleryTemplate += '<div class="galleria">';
FMViewGalleryTemplate += '<% _.each(pictures, function(picture) { %>';
FMViewGalleryTemplate += '<img data-id="<%= picture.get("id") %>" src="<%= dir %><%= picture.get ("url") %>" data-title="<%= picture.get ("name") %>" data-description="<%= moment(picture.get("date")).format(FMS.getDateTimeFormat()) %>" />';
FMViewGalleryTemplate += '<% }); %>';
FMViewGalleryTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewLayerTemplate = '';
FMViewLayerTemplate += '<div class="ui-header"><%= header %></div>';
FMViewLayerTemplate += '<div class="ui-body">';
FMViewLayerTemplate += '<button type="button" data-toggle="collapse" data-target="#layer-add-panel" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-plus"></span> Manage Layers</button>';
FMViewLayerTemplate += '<div class="collapse <%= isIn %>" id="layer-add-panel">';
FMViewLayerTemplate += '<div id="layer-add-grid"></div>';
FMViewLayerTemplate += '<div id="layer-list-grid"></div>';
FMViewLayerTemplate += '</div>';
FMViewLayerTemplate += '<div class="checkbox btn btn-negative col-xs-12 layer-checkbox layer-checkbox-header">';
FMViewLayerTemplate += '<label class="label-header"><input type="checkbox" id="check-unassigned-layer" data-sort="0" checked>Unassigned Layer Toggle</label>';
FMViewLayerTemplate += '</div>';
FMViewLayerTemplate += '<div class="checkbox btn btn-default col-xs-12 layer-checkbox layer-checkbox-header">';
FMViewLayerTemplate += '<label class="label-header"><input type="checkbox" id="check-event-layer" checked>Event Layer Toggle</label>';
FMViewLayerTemplate += '<% _.each(sort1, function (sort) { %>';
FMViewLayerTemplate += '<div class="checkbox btn btn-default col-xs-12 layer-checkbox">';
FMViewLayerTemplate += '<label><input type="checkbox" value= "" data-type="1" data-sort="<%= sort.get("id") %>"><%= sort.get("name") %> - <%= sort.get("desc") %></label>';
FMViewLayerTemplate += '</div>';
FMViewLayerTemplate += '<% }); %>';
FMViewLayerTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMMenuTemplate = '';
FMMenuTemplate += '';
FMMenuTemplate += '<div class="ui-body">';
FMMenuTemplate += '<form class="form-horizontal">';
FMMenuTemplate += '<% if (!isAdmin) { %>'; // if non-admin
FMMenuTemplate += '<div class="form-group">';
FMMenuTemplate += '<label for="input-menu-login-username" class="col-xs-3 control-label">Username</label>';
FMMenuTemplate += '<div class="col-xs-9">';
FMMenuTemplate += '<input type="text" class="form-control" placeholder="" id="input-menu-login-username" value="">';
FMMenuTemplate += '</div>';
FMMenuTemplate += '</div>';
FMMenuTemplate += '<div class="form-group">';
FMMenuTemplate += '<label for="input-menu-login-password" class="col-xs-3 control-label">Password</label>';
FMMenuTemplate += '<div class="col-xs-9">';
FMMenuTemplate += '<input type="password" class="form-control" placeholder="" id="input-menu-login-password" value="">';
FMMenuTemplate += '</div>';
FMMenuTemplate += '</div>';
FMMenuTemplate += '<button id="btn-menu-login" type="button" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-log-in"></span> Sign In</button>';
FMMenuTemplate += '<div class="clear-float"></div>';
FMMenuTemplate += '</form>';
FMMenuTemplate += '<% } else { %>'; // if admin
FMMenuTemplate += '<button id="btn-menu-logout" type="button" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-log-out"></span> Log Out from <strong><%= username %></strong></button>';
FMMenuTemplate += '<div class="clear-float"></div>';
FMMenuTemplate += '</form>';
FMMenuTemplate += '<% } %>';
FMMenuTemplate += '<hr>';
FMMenuTemplate += '<% if (isAdmin) { %>'; // if admin
FMMenuTemplate += '<form class="form-horizontal">';
FMMenuTemplate += '<div class="form-group">';
FMMenuTemplate += '<label for="input-menu-qrcode" class="col-xs-3 control-label">QRCode</label>';
FMMenuTemplate += '<div class="col-xs-9">';
FMMenuTemplate += '<input class="fileupload" id="input-menu-qrcode" placeholder="" type="file" accept="image/*" capture="camera" />';
FMMenuTemplate += '</div>';
FMMenuTemplate += '</div>';
FMMenuTemplate += '<button type="button" id="btn-near-loc" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-screenshot"></span> Get Near Items</button>';
FMMenuTemplate += '<div id="item-near-loc">';
FMMenuTemplate += '</div>';
FMMenuTemplate += '<div class="clear-float"></div>';
FMMenuTemplate += '<button id="btn-menu-register-sensor" type="button" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-plus-sign"></span> Create New Item</button>';
FMMenuTemplate += '<div class="clear-float"></div>';
FMMenuTemplate += '</form>';
FMMenuTemplate += '<% } %>';
FMMenuTemplate += '<label class="control-label">Time Slider Interval</label>';
FMMenuTemplate += '<div class="clear-float"></div>';
FMMenuTemplate += '<button id="btn-menu-slider-1" type="button" class="btn btn-default col-xs-3"><span class="glyphicon glyphicon-time"></span> 1 sec</button>';
FMMenuTemplate += '<button id="btn-menu-slider-60" type="button" class="btn btn-default col-xs-3"><span class="glyphicon glyphicon-time"></span> 1 min</button>';
FMMenuTemplate += '<button id="btn-menu-slider-3600" type="button" class="btn btn-default col-xs-3"><span class="glyphicon glyphicon-time"></span> 1 hour</button>';
FMMenuTemplate += '<button id="btn-menu-slider-24" type="button" class="btn btn-default col-xs-3"><span class="glyphicon glyphicon-time"></span> 1 day</button>';
FMMenuTemplate += '<hr>';
FMMenuTemplate += '</div>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMViewMenuSetSerialTemplate = '';
FMViewMenuSetSerialTemplate = '<button type="button" class="btn btn-default btn-table"><span class="glyphicon glyphicon-hand-left"></span></button>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var FMUIAddSensorTemplate = '';
FMUIAddSensorTemplate += '<div class="ui-header"><%= header %></div>';
FMUIAddSensorTemplate += '<div class="ui-body">';
FMUIAddSensorTemplate += '<% if (isAdmin) { %>'; // if admin
FMUIAddSensorTemplate += '<button type="button" data-toggle="collapse" data-target="#sensor-add-panel" class="btn btn-default col-xs-12"><span class="glyphicon glyphicon-plus"></span> Add New Sensor</button>';
FMUIAddSensorTemplate += '<div class="collapse" id="sensor-add-panel">';
FMUIAddSensorTemplate += '<% } %>';
FMUIAddSensorTemplate += '</div>';
FMUIAddSensorTemplate += '</div>';
