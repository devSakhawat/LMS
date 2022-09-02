$(document).ready(function () {
   //ActiveIncidentList()
   //AssignIncidentList();
   DeniedIncidentList();
   //CloseIncidentList();
});

function DeniedIncidentList() {
   var comp = [];
   comp2 = [];
   $.ajax({
      url: baseurl + "HelpDesk/GetDeniedIncidentList",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {
         console.log(res)
         for (var i = 0; i < res.length; i++) {
            var str = ['' + (i + 1) + '', '' + res[i].title + '', '' + res[i].denieddate + ''];

            var str2 = { 'sl': (i + 1), 'assignid': res[i].assignid, 'incidentid': res[i].incidentid, 'title': res[i].title, 'assaignbyName': res[i].assaignbyName, 'assigndate': res[i].assigndate, 'deadline': res[i].deadline, 'denieddate': res[i].denieddate, 'servicedate': res[i].servicedate, 'impact': res[i].impact, 'priyority': res[i].priyority, 'status': res[i].status };
            comp.push(str);
            comp2.push(str2);
         }

         $('.datatables-basic').DataTable({
            data: comp,
            columns: [
               { title: 'sl' },
               { title: 'title' },
               { title: 'denieddate' },
               {
                  targets: 1,
                  title: 'Actions',
                  orderable: false,
                  render: function (data, type, full, meta) {
                     return (
                        '<div class="d-inline-flex">' +
                        '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
                        feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                        '</a>' +
                        '<div class="dropdown-menu dropdown-menu-end">' +
                        '<a class="dropdown-item" id="btnDetails"  asp-action="AssignIncidentDetail" asp-controller="HelpDesk" asp-route-assignid="@Model.Assignid">' +
                        feather.icons['file-text'].toSvg({ class: 'me-50 font-small-4' }) +
                        'Incident Details</a>' +
                        //'<a class="dropdown-item denied-record" id="btnReturn"  asp-action="DeniedIncident" asp-controller="HelpDesk" asp-route-Assignid="@Model.Assignid">' +
                        //feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                        //'Return Incident</a>' +
                        '<a class="dropdown-item close-record" id="btnCloseIncident"  asp-action="CloseIncident" asp-controller="HelpDesk" asp-route-assignid="@Model.assignid">' +
                        feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                        'Close Incident</a>' +
                        '</div>' +
                        '</div>' +

                        '<a href="javascript:;" class="item-edit" id="btnEdit">' +
                        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
                        '</a>'
                     );
                  }
               }
            ],
            /* data ordering using column position */
            order: [[0, 'asc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            displayLength: 10,
            lengthMenu: [10, 50, 100],
            buttons: [
               {
                  extend: 'collection',
                  className: 'btn btn-outline-secondary dropdown-toggle me-2',
                  text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
                  buttons: [
                     {
                        extend: 'print',
                        text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'csv',
                        text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'excel',
                        text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'pdf',
                        text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'copy',
                        text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     }
                  ],
                  init: function (api, node, config) {
                     $(node).removeClass('btn-secondary');
                     $(node).parent().removeClass('btn-group');
                     setTimeout(function () {
                        $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
                     }, 50);
                  }
               },
               {
                  text: feather.icons['plus'].toSvg({ class: 'me-50 font-small-4' }) + 'Add New',
                  className: 'create-new btn btn-primary',
                  attr: {
                     'data-bs-toggle': 'modal',
                     'data-bs-target': '#modals-slide-in'
                  },
                  init: function (api, node, config) {
                     $(node).removeClass('btn-secondary');
                  }
               }
            ],
            responsive: {
               details: {
                  display: $.fn.dataTable.Responsive.display.modal({
                     header: function (row) {
                        var data = row.data();
                        return 'Details of ' + data['full_name'];
                     }
                  }),
                  type: 'column',
                  renderer: function (api, rowIdx, columns) {
                     var data = $.map(columns, function (col, i) {
                        return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                           ? '<tr data-dt-row="' +
                           col.rowIdx +
                           '" data-dt-column="' +
                           col.columnIndex +
                           '">' +
                           '<td>' +
                           col.title +
                           ':' +
                           '</td> ' +
                           '<td>' +
                           col.data +
                           '</td>' +
                           '</tr>'
                           : '';
                     }).join('');

                     return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
                  }
               }
            },
            language: {
               paginate: {
                  // remove previous & next text from pagination
                  previous: '&nbsp;',
                  next: '&nbsp;'
               }
            }
         });
      },
      error: function (xhr) {
         console.log(xhr);
      }
   });
}


function ActiveIncidentList() {
   var comp = [];
   comp2 = [];
   $.ajax({
      url: baseurl + "HelpDesk/GetActiveIncidentList",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {
         console.log(res)
         for (var i = 0; i < res.length; i++) {

            var str = ['' + (i + 1) + '', '' + res[i].title + '', '' + res[i].deadline + '', 'Active'];

            var str2 = { 'sl': (i + 1), 'assignid': res[i].assignid, 'incidentid': res[i].incidentid, 'title': res[i].title, 'assaignbyName': res[i].assaignbyName, 'assigndate': res[i].assigndate, 'deadline': res[i].deadline, 'denieddate': res[i].denieddate, 'servicedate': res[i].servicedate, 'impact': res[i].impact, 'priyority': res[i].priyority, 'status': res[i].status };
            comp.push(str);
            comp2.push(str2);
         }

         $('.datatables-basic').DataTable({
            data: comp,
            columns: [
               { title: 'sl' },
               { title: 'title' },
               { title: 'deadline' },
               { title: 'status' },
               {
                  targets: 1,
                  title: 'Actions',
                  orderable: false,
                  render: function (data, type, full, meta) {
                     return (
                        '<div class="d-inline-flex">' +
                        '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
                        feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                        '</a>' +

                        '<div class="dropdown-menu dropdown-menu-end">' +

                        '<a class="dropdown-item delete-record" id="btnDetails"  asp-action="AssignIncidentDetail" asp-controller="HelpDesk" asp-route-assignid="@Model.Assignid">' +
                        feather.icons['file-text'].toSvg({ class: 'me-50 font-small-4' }) +
                        'Incident Details</a>' +

                        '<a class="dropdown-item denied-record" id="btnReturn"  asp-action="DeniedIncident" asp-controller="HelpDesk" asp-route-Assignid="@Model.Assignid">' +
                        feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                        'Return Incident</a>' +

                        '<a class="dropdown-item close-record" id="btnCloseIncident"  asp-action="CloseIncident" asp-controller="HelpDesk" asp-route-assignid="@Model.assignid">' +
                        feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                        'Close Incident</a>' +

                        '</div>' +
                        '</div>' +

                        '<a href="javascript:;" class="item-edit" id="btnEdit">' +
                        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
                        '</a>'
                     )
                  }
               }
            ],

            order: [[0, 'asc']],
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            displayLength: 10,
            lengthMenu: [10, 50, 100],
            buttons: [
               {
                  extend: 'collection',
                  className: 'btn btn-outline-secondary dropdown-toggle me-2',
                  text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
                  buttons: [
                     {
                        extend: 'print',
                        text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'csv',
                        text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'excel',
                        text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'pdf',
                        text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     },
                     {
                        extend: 'copy',
                        text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
                        className: 'dropdown-item',
                        exportOptions: { columns: [0, 1, 2, 3, 4] }
                     }
                  ],
                  init: function (api, node, config) {
                     $(node).removeClass('btn-secondary');
                     $(node).parent().removeClass('btn-group');
                     setTimeout(function () {
                        $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
                     }, 50);
                  }
               },
               {
                  text: feather.icons['plus'].toSvg({ class: 'me-50 font-small-4' }) + 'Add New',
                  className: 'create-new btn btn-primary',
                  attr: {
                     'data-bs-toggle': 'modal',
                     'data-bs-target': '#modals-slide-in'
                  },
                  init: function (api, node, config) {
                     $(node).removeClass('btn-secondary');
                  }
               }
            ],
            responsive: {
               details: {
                  display: $.fn.dataTable.Responsive.display.modal({
                     header: function (row) {
                        var data = row.data();
                        return 'Details of ' + data['full_name'];
                     }
                  }),
                  type: 'column',
                  renderer: function (api, rowIdx, columns) {
                     var data = $.map(columns, function (col, i) {
                        return col.title !== ''
                           ? '<tr data-dt-row="' +
                           col.rowIdx +
                           '" data-dt-column="' +
                           col.columnIndex +
                           '">' +
                           '<td>' +
                           col.title +
                           ':' +
                           '</td> ' +
                           '<td>' +
                           col.data +
                           '</td>' +
                           '</tr>'
                           : '';
                     }).join('');

                     return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
                  }
               }
            }
            ,
            language: {
               paginate: {
                  previous: '&nbsp;',
                  next: '&nbsp;'
               }
            }
         });
      },
      error: function (xhr) {
         console.log(xhr);
      }
   });
}