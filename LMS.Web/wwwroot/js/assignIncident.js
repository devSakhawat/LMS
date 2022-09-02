
$(document).ready(function () {
    //getAllAssignIncident();
    getDepartment();
});

var baseurl = "https://localhost:7281/";
var baseapi = "https://localhost:7026/api/";
var comp2 = [];


function getDepartment() {
    $('#department option').remove();
    $.ajax({
        url: baseapi + "Department/LoadDepartment",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            $('#department').append($('<option>').text('Select').attr({ 'value': '' }));
            $.each(res, function (index, v) {
                $('#department').append($('<option>').text(v.departmentname).attr({ 'value': v.deptid }));
            });
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

//MAPPING RELAVANT Designation TO Department
$("#department").change(function () {
    $("#technician").empty();
    console.log($("#technician").val());
    $.ajax({
        url: baseapi + "Designations/LoadDesignation",
        dataType: "json",
        type: "GET",

        data: { deptid: $("#department").val() },

        success: function (data) {
            var items = "";
            items = "<option value=\"\">Select</option>";
            $.each(data, function (i, item) {
                items += "<option value=\"" + item.designationId + "\">" + item.designationme + "</option>";
            });

            $("#technician").html(items);
        }
    });
});



//var datavalue = [];
//function setValue(e) {
//    var val = e.target.value;
//    var ischecked = e.srcElement.checked;
//    if (ischecked) {
//        var st = { 'Value': val };
//        datavalue.push(st);
       
//    }
//    else {
//        var ind = datavalue.findIndex(f => f.value === val);
//        datavalue.splice(ind,1);
       
//    }
    
   
//}

//function saveWeekend() {
    
//    var facility = $('#hfacilityId').val();
//    if (facility == undefined || facility == '' || facility == null) return alert('Please select a facility');
//    var darray = {
//        'facilityid': facility,
//        'val': JSON.stringify(datavalue)
//    };
//    $.ajax({
//        url: "/Configuration/AddWeekend",
//        type: "POST",
//        dataType: "json",
//        contentType: 'application/json',
//        data: JSON.stringify(darray),
//        success: function (res) {
//            alert(res.response);
//            location.reload();
//        },
//        error: function (xhr) {

//        }
//    });
//}

