

$(document).ready(function () {
    getAllquicklist();
    getAllcategory();
    getUrgency();
});
var baseapi = "https://localhost:7026/api/";
var quciklistArray = [];
function getAllquicklist() {
    $('#quicklist option').remove();
    $.ajax({
        url: baseapi + "Incident/LoadAllQuicklist",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            quciklistArray.push(res);
            $('#quicklist').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {

                if (v.ishead == true) {
                    $('#quicklist').append($('<option>').text(v.description).attr({ 'value': v.quickstartid, 'disabled': 'disabled' }).css({ 'font-weight': '900' }));

                }
                else {
                    $('#quicklist').append($('<option>').text(v.description).attr({ 'value': v.quickstartid }));
                }

            });

        },
        error: function (xhr) {

        }
    });
}

function getAllcategory() {
    $('#Catid option').remove();
    $.ajax({
        url: baseapi + "Category/LoadCategory",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            $('#Catid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {
                $('#Catid').append($('<option>').text(v.categoryname).attr({ 'value': v.catid }));

            });

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function getSubcategory(e) {
    var id = e.target.value;
    $('#Subcatid option').remove();
    $('#Subsubcatid option').remove();
    $.ajax({
        url: baseapi + "Incident/LoadSubcategorybyid",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        data: { catid: id },
        success: function (res) {
            $('#Subcatid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {
                $('#Subcatid').append($('<option>').text(v.subcategoryname).attr({ 'value': v.subcatid }));

            });

        },
        error: function (xhr) {

        }
    });
};

function getsubSubcategory(e) {
    var id = e.target.value;
    $('#Subsubcatid option').remove();
    $.ajax({
        url: baseapi + "Incident/LoadsubSubcategorybyid",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        data: { catid: id },
        success: function (res) {
            $('#Subsubcatid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {
                $('#Subsubcatid').append($('<option>').text(v.subsubcategoryname).attr({ 'value': v.subsubcatid }));

            });

        },
        error: function (xhr) {

        }
    });
};

function getUrgency() {
    $('#Urgencyid option').remove();
    $.ajax({
        url: baseapi + "Urgencyinfo/LoadUrgencyinfo",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            $('#Urgencyid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {
                $('#Urgencyid').append($('<option>').text(v.urgency).attr({ 'value': v.urgencyid }));
            });
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function changeQuicklist(e) {
    var id = parseInt(e.target.value);
    var ind = quciklistArray[0].findIndex(f => f.quickstartid === id);
    if (ind != -1) {
        $('#errortitle').val(quciklistArray[0][ind].title);
    }
    else {
        $('#errortitle').val('');
    }

    $('#Catid option').remove();
    $('#Subcatid option').remove();
    $('#Subsubcatid option').remove();
    $.ajax({
        url: baseapi + "Incident/Getallbasedonquicklist/" + id,
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            //console.log(res);
            $('#Catid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res[0].cat, function (index, v) {
                $('#Catid').append($('<option>').text(v.categoryname).attr({ 'value': v.catid }));
            });
            $('#Catid').val(res[0].ids.catid);


            $('#Subcatid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res[0].sub, function (index, v) {
                $('#Subcatid').append($('<option>').text(v.subcategoryname).attr({ 'value': v.subcatid }));

            });
            $('#Subcatid').val(res[0].ids.subcatid);

            $('#Subsubcatid').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res[0].third, function (index, v) {
                $('#Subsubcatid').append($('<option>').text(v.subsubcategoryname).attr({ 'value': v.subsubcatid }));

            });
            $('#Subsubcatid').val(res[0].ids.subsubcatid);
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}


