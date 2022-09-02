

$(document).ready(function () {
   getAlldatafortable();
   getAllcategory();

});
var baseapi = "https://localhost:7026/api/";

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
   $("#txt_category").val($("#Catid option:selected").text() == "Select" ? "" : $("#Catid option:selected").text());
   $('#Subcatid option').remove();
   $('#Subsubcatid option').remove();
   $("#txt_subcategory").val('');
   $("#txt_subsubcategory").val('');
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
   $("#txt_subcategory").val($("#Subcatid option:selected").text() == "Select" ? "" : $("#Subcatid option:selected").text());
   $('#Subsubcatid option').remove();
   $("#txt_subsubcategory").val('');
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
function setsubSubcategory() {
   $("#txt_subsubcategory").val($("#Subsubcatid option:selected").text() == "Select" ? "" : $("#Subsubcatid option:selected").text());
};


function getAlldatafortable() {
   var _rToken = $('#_reQuestToken_').val();
   console.log(_rToken);
   $.ajax({
      url: baseapi + "Category/LoadAllCategory",
      type: "GET",
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Authorization': 'Bearer ' + _rToken
      },
      success: function (res) {

         var data = '';
         if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
               data += '<tr><td>' + res[i].categoryname + '</td><td colspan="3">';
               if (res[i].subcat.length > 0) {
                  data += '<table class="table">';
                  for (var j = 0; j < res[i].subcat.length; j++) {

                     data += '<tr><td width="42.86%">' + res[i].subcat[j].subcategoryname + '</td>';
                     data += '<td colspan="2" width="57.14%">';
                     if (res[i].subcat[j].subsubcat.length > 0) {
                        data += '<table class="table">';
                        for (var k = 0; k < res[i].subcat[j].subsubcat.length; k++) {
                           data += '<tr><td width="75%">' + res[i].subcat[j].subsubcat[k].subsubcategoryname + '</td>';
                           if (res[i].subcat[j].subsubcat[k].isactive) {
                              data += '<td><div class="form-check form-check-info" ><input type="checkbox" class="form-check-input" style="margin:0 auto;" checked><label class="form-check-label"></label></div></td></tr>';
                           }
                           else {
                              data += '<td><div class="form-check form-check-info" ><input type="checkbox" class="form-check-input" style="margin:0 auto;" ><label class="form-check-label"></label></div></td></tr>';

                           }

                        }
                        data += '</table>';
                     }
                     data += '</td></tr>';


                  }
                  data += '</table></td>';
               }

               data += '</tr>';
            }
         }

         $('#loadcategory').html(data);
      },
      error: function (xhr) {

      }
   });
};


function SubmitCat() {
   var catid = $("#Catid").val() == null || $("#Catid").val() == undefined || $("#Catid").val() == '' ? 0 : $("#Catid").val();
   var subid = $("#Subcatid").val() == null || $("#Subcatid").val() == undefined || $("#Subcatid").val() == '' ? 0 : $("#Subcatid").val();
   var thirdid = $("#Subsubcatid").val() == null || $("#Subsubcatid").val() == undefined || $("#Subsubcatid").val() == '' ? 0 : $("#Subsubcatid").val();

   var cat = $("#txt_category").val() == null || $("#txt_category").val() == undefined ? '' : $("#txt_category").val();
   var sub = $("#txt_subcategory").val() == null || $("#txt_subcategory").val() == undefined ? '' : $("#txt_subcategory").val();
   var third = $("#txt_subsubcategory").val() == null || $("#txt_subsubcategory").val() == undefined ? '' : $("#txt_subsubcategory").val();
   var check = $("#ck_isactive").is(":checked") ? true : false;

   if (catid > 0 && subid > 0 && thirdid > 0) {
      return alert('Nothing to save');
   }
   else if (catid > 0 && subid > 0 && thirdid == 0 && third == '') {
      return alert('Input third-level category');
   }
   else if (catid > 0 && subid == 0 && sub == '') {
      return alert('Input sub-category');
   }
   else if (catid == 0 && cat == '') {
      return alert('Input category');
   }

   else {
      var data = {
         'catid': catid,
         'subcatid': subid,
         'subsubcatid': thirdid,
         'category': cat,
         'subcategory': sub,
         'subsubcategory': third,
         'check': check

      };
      $.ajax({
         url: baseapi + "Category/PostAllCategory",
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

function EditCat() {
   alert("Response");
   var catid = $("#Catid").val() == null || $("#Catid").val() == undefined || $("#Catid").val() == '' ? 0 : $("#Catid").val();
   var subid = $("#Subcatid").val() == null || $("#Subcatid").val() == undefined || $("#Subcatid").val() == '' ? 0 : $("#Subcatid").val();
   var thirdid = $("#Subsubcatid").val() == null || $("#Subsubcatid").val() == undefined || $("#Subsubcatid").val() == '' ? 0 : $("#Subsubcatid").val();

   var cat = $("#txt_category").val() == null || $("#txt_category").val() == undefined ? '' : $("#txt_category").val();
   var sub = $("#txt_subcategory").val() == null || $("#txt_subcategory").val() == undefined ? '' : $("#txt_subcategory").val();
   var third = $("#txt_subsubcategory").val() == null || $("#txt_subsubcategory").val() == undefined ? '' : $("#txt_subsubcategory").val();
   var check = $("#ck_isactive").is(":checked") ? true : false;


   if (catid == 0) {
      return alert('Select a category');
   } else if (catid > 0 && cat == '') {
      return alert('Input category');
   } else if (subid > 0 && sub == '') {
      return alert('Input category');
   }
   else if (thirdid > 0 && third == '') {
      return alert('Input category');
   }

   else {
      var data = {
         'catid': catid,
         'subcatid': subid,
         'subsubcatid': thirdid,
         'category': cat,
         'subcategory': sub,
         'subsubcategory': third,
         'check': check

      };
      $.ajax({
         url: baseapi + "Category/EditAllCategory",
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


