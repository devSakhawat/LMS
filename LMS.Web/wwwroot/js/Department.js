$(document).ready(function () {
   getDepartment();
   getAlldatafortable();

});


var baseapi = "https://localhost:7026/api/";
var dept = [];
function getDepartment() {
   $('#Deptid option').remove();
   $.ajax({
      url: baseapi + "Department/LoadDepartment",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {         
         dept = res;
         $('#Deptid').append($('<option>').text('Select').attr({ 'value': '' }));
         $.each(res, function (index, v) {
            $('#Deptid').append($('<option>').text(v.departmentname).attr({ 'value': v.deptid }));

         });

      },
      error: function (xhr) {
         console.log(xhr);
      }
   });
}


function getAllDesignations(e) {
   var id = e.target.value;
   var de = $("#Deptid option:selected").text();
   var fin = dept.findIndex(f => f.departmentname == de);

   $("#txt_department").val(de);
   $("#txt_dept_description").val(dept[fin].description);
   $('#Desigid option').remove();
   $("#txt_designation").val('');
   $.ajax({
      url: baseapi + "Department/LoadDesignationbyid?deptid=" + id,
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      data: { Desigid: id },
      success: function (res) {
         console.log(res);
         $('#Desigid').append($('<option>').text('Select').attr({ 'value': '' }));
         $.each(res, function (index, v) {
            $('#Desigid').append($('<option>').text(v.designationname).attr({ 'value': v.desigid }));

         });

      },
      error: function (xhr) {

      }
   });
};

function getAlldatafortable() {
   $.ajax({
      url: baseapi + "Department/LoadAllDepartment",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {

         var data = '';
         if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
               var des = res[i].description == null ? "" : res[i].description;
               data += '<tr><td>' + res[i].departmentname + '</td><td>' + des + '</td><td>';
               if (res[i].designation.length > 0) {
                  data += '<table class="table table-bordered">';
                  for (var j = 0; j < res[i].designation.length; j++) {
                     data += '<tr><td>' + res[i].designation[j].designationname + '</td>';

                     data += '</td></tr>';


                  }
                  data += '</table></td>';
               }

               data += '</tr>';
            }
         }

         $('#loadDept').html(data);
      },
      error: function (xhr) {

      }
   });
};



function SubmitDepartment() {
   var deptId = $("#Deptid").val() == null || $("#Deptid").val() == undefined || $("#Deptid").val() == '' ? 0 : $("#Deptid").val();
   var desigId = $("#Desigid").val() == null || $("#Desigid").val() == undefined || $("#Desigid").val() == '' ? 0 : $("#Desigid").val();

   var dptName = $("#txt_department").val() == null || $("#txt_department").val() == undefined ? '' : $("#txt_department").val();
   var descrip = $("#txt_dept_description").val() == null || $("#txt_dept_description").val() == undefined ? '' : $("#txt_dept_description").val();
   var desigName = $("#txt_designation").val() == null || $("#txt_designation").val() == undefined ? '' : $("#txt_designation").val();

   if (deptId == 0 && dptName == '' && desigId == 0 && desigName != '') {
      return alert('Please insert department');
   }
   else if (deptId == 0 && dptName == '' && desigId == 0 && desigName == '') {
      return alert('Insert or select Department');
   }
   else if (deptId > 0 && desigId == 0 && desigName == '') {
      return alert('Please insert designation name');
   }
   else {
      var data = {
         'deptid': deptId,
         'desigid': desigId,
         'departmentname': dptName,
         'description': descrip,
         'designationname': desigName
      };
      $.ajax({
         url: baseapi + "Department/PostAllDepartment",
         type: "POST",
         dataType: "json",
         contentType: 'application/json',
         data: JSON.stringify(data),
         success: function (res) {
            alert(res.response);
            location.reload();
         },
         error: function (xhr) {

         }
      });
   }



};


