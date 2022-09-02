
$(document).ready(function () {
   getAlldatafortable();
   getAllQuickCatList();
   getAllThirdlevel();

});
var baseapi = "https://localhost:7026/api/";


function getAllQuickCatList() {
   $('#QuickcatId option').remove();
   $.ajax({
      url: baseapi + "Quickstartcategory/LoadQuickstartcategory",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {
         $('#QuickcatId').append($('<option>').text('Select').attr({ 'value': '' }));
         $.each(res, function (index, v) {
            $('#QuickcatId').append($('<option>').text(v.quickcatagoryName).attr({ 'value': v.quickcatid }));
         });
      },
      error: function (xhr) {
         console.log(xhr);
      }
   });
}

function getAllQuickList(e) {
   var id = e.target.value;
   $("#txt_QuickCat").val($("#QuickcatId option:selected").text() == "Select" ? "" : $("#QuickcatId option:selected").text());
   $('#Quickstartid option').remove();
   $("#txt_quick_title").val('');
   $("#txt_ql_description").val('');
   $("#txt_third_level").val('');
   $.ajax({
      url: baseapi + "Quickstart/LoadQuickListById",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      data: { quickcatid: id },
      success: function (res) {
         //console.log(res);
         $('#Quickstartid').append($('<option>').text('Select').attr({ 'value': '' }));
         $.each(res, function (index, v) {
            $('#Quickstartid').append($('<option>').text(v.title).attr({ 'value': v.quickstartid }));
         });
      },
      error: function (xhr) {

      }
   });
};

function getAllThirdlevel() {
   $('#Subsubcatid option').remove();
   $.ajax({
      url: baseapi + "Subsubcategory/LoadSubsubcategory",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {
         //console.log(res);
         $('#Subsubcatid').append($('<option>').text('Select').attr({ 'value': '' }));
         $.each(res, function (index, v) {
            $('#Subsubcatid').append($('<option>').text(v.subsubcategoryname).attr({ 'value': v.subsubcatid }));
         });
      },
      error: function (xhr) {
         console.log(xhr);
      }
   });
}

function getAlldatafortable() {
   $.ajax({
      url: baseapi + "Quickstart/LoadAllQuickList",
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function (res) {
         console.log(res);
         var data = '';
         if (res.length > 0) {

            for (var j = 0; j < res.length; j++) {
               data += '<tr><td width="25%">' + res[j].quickcatagoryName + '</td>';
               data += '<td colspan="3" width="75%">';
               if (res[j].quicklist.length > 0) {
                  data += '<table class="table">';
                  for (var k = 0; k < res[j].quicklist.length; k++) {
                     data += '<tr><td width="33.33%">' + res[j].quicklist[k].description + '</td>';
                     data += '<tr><td width="33.33%">' + res[j].quicklist[k].subsubcategoryname + '</td>';
                     data += '<tr><td width="33.33%">' + res[j].quicklist[k].title + '</td>';
                  }
                  data += '</table>';
               }
               data += '</td></tr>';


            }

         }

         $('#loadAllQuickList').html(data);
      },
      error: function (xhr) {

      }
   });
};

function SubmitQuickList() {
   var quickCatId = $("#QuickcatId").val() == null || $("#QuickcatId").val() == undefined || $("#QuickcatId").val() == '' ? 0 : $("#QuickcatId").val();
   var quickListId = $("#Quickstartid").val() == null || $("#Quickstartid").val() == undefined || $("#Quickstartid").val() == '' ? 0 : $("#Quickstartid").val();
   var subsubCatId = $("#Subsubcatid").val() == null || $("#Subsubcatid").val() == undefined || $("#Subsubcatid").val() == '' ? 0 : $("#Subsubcatid").val();

   var quickCat = $("#txt_QuickCat").val() == null || $("#txt_QuickCat").val() == undefined ? '' : $("#txt_QuickCat").val();
   var quickList = $("#txt_quick_title").val() == null || $("#txt_quick_title").val() == undefined ? '' : $("#txt_quick_title").val();
   var quickDescription = $("#txt_ql_description").val() == null || $("#txt_ql_description").val() == undefined ? '' : $("#txt_ql_description").val();
   var subsubCat = $("#txt_subsubcategory").val() == null || $("#txt_subsubcategory").val() == undefined ? '' : $("#txt_subsubcategory").val();

   //if (quickCat != "" && quickList != "" && subsubCatId == 0) {
   //   return alert('Select third level category');
   //}
   if (quickCatId == 0 && quickCat == "") {
      return alert('Insert Type');
   }
   else if (quickCatId > 0 && quickListId == 0 && quickList == "" && subsubCatId > 0) {
      return alert('Inser or select Quicklist');
   }
   else if (quickCat != "" && quickList == "" && subsubCatId > 0) {
      return alert('Insert Quicklist');
   }
   else if (quickCatId > 0 && quickListId > 0 && subsubCatId == 0) {
      return alert('Select Third level category');
   }
   else if (quickCat != "" && quickList != "" && subsubCatId == 0) {
      return alert('Select Third level category');
   }
   else {
      var data = {
         'quickcatid': quickCatId,
         'quickstartid': quickListId,
         'subsubcatid': subsubCatId,
         'type': quickCat,
         'title': quickList,
         'description': quickDescription,
         'subsubcategoryname': subsubCat
      };
      $.ajax({
         url: baseapi + "Quickstart/PostAllQuicklist",
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
   if (catid > 0 && subid > 0 && thirdid == 0 && third == '') {
      return alert('Input third-level category');
   }

   if (catid == 0) {
      return alert('Select a category');
   } else if (catid > 0 && cat == '') {
      return alert('Input category');
   }

   //else {
   //    var data = {
   //        'catid': catid,
   //        'subcatid': subid,
   //        'subsubcatid': thirdid,
   //        'category': cat,
   //        'subcategory': sub,
   //        'subsubcategory': third,
   //        'check': check

   //    };
   //    $.ajax({
   //        url: baseapi + "Category/PostAllCategory",
   //        type: "POST",
   //        dataType: "json",
   //        contentType: 'application/json',
   //        data: JSON.stringify(data),
   //        success: function (res) {
   //            alert(res.response);
   //            location.reload();
   //        },
   //        error: function (xhr) {

   //        }
   //    });
   //}



};



