
$(document).ready(function () {
    getAllHoliday();
    getFacility();
});

var baseurl = "https://localhost:7281/";
var baseapi = "https://localhost:7026/api/";
var comp2 = [];

function getAllHoliday() {
   var comp = [];
   comp2 = [];
    $.ajax({
        url: baseurl + "Configuration/GetHoliday",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                var str = ['' + (i + 1) + '', '' + res[i].facilityname + '', '' + res[i].holidaylist + '', '' + res[i].dayCount + '', '' + res[i].description + ''];
                var str2 = { 'sl': (i + 1), 'holidayid': res[i].holidayid, 'facilityId': res[i].facilityid, 'startdate': res[i].startdate, 'enddate': res[i].enddate, 'description': res[i].description };
                comp.push(str);
                comp2.push(str2);
            }          
            $('.datatables-basic').DataTable({
                data: comp,
                columns: [
                    { title: 'sl' },
                    { title: 'facilityname' },
                    { title: 'holidaylist' },
                    { title: 'dayCount' },
                    { title: 'description' },
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
                                '<a href="javascript:;" class="dropdown-item">' +
                                feather.icons['file-text'].toSvg({ class: 'me-50 font-small-4' }) +
                                'Details</a>' +
                                '<a href="javascript:;" class="dropdown-item delete-record" id="btnDelete"  asp-action="DeleteHoliday" asp-controller="Holiday" asp-route-holidayId="@Model.holidayId">' +
                                feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                                'Delete</a>' +
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


function getFacility() {
    $('#hfacilityId option').remove();
    $.ajax({
        url: baseapi + "Facility/LoadFacility",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            $('#hfacilityId').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {
                $('#hfacilityId').append($('<option>').text(v.facilityname).attr({ 'value': v.facilityid }));
            });
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}


$('body').on('click', '#btnEdit', function () {
  var dt= $('.datatables-basic').DataTable();
   var row = $(this).parents('tr')[0];
   var sl = dt.row(row).data()[0];
   var ind = comp2.findIndex(f => f.sl == sl);
   var dta = comp2[ind];
   $('#holidayId').val(dta.holidayid);
   $('#hfacilityId').val(dta.facilityId);
   $('#hStartdate').val(dta.startdate);
   $('#hEnddate').val(dta.enddate);
   $('#hDescription').val(dta.description);
   $('#modals-slide-in').modal('show');
});

$('body').on('click', '#btnDelete', function () {
    var dt = $('.datatables-basic').DataTable();
    var row = $(this).parents('tr')[0];
    var sl = dt.row(row).data()[0];
    var ind = comp2.findIndex(f => f.sl == sl);
    var dta = comp2[ind];

    $.ajax({
        url: baseurl + "Configuration/DeleteHoliday",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        data: { holidayId : dta.holidayid },
        success: function (res) {
            /*console.log(res);*/
            alert("Delete Successfully");
            /*window.location.href = '/Configuration/Holiday';*/
            window.location.reload();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
});
