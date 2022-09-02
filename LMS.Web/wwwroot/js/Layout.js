"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/webHub").build();
var baseapi = "https://localhost:7026/api/";
connection.start().then(function () {
    getNotification();

}).catch(function (err) {
    return alert('Can not connect!!!');
});
connection.on("Refresh", function () {
    getNotification();
});
function createIncident() {

    var data =
    {
        'incidentid': 0,
        'description': document.getElementById("describtion").value.trim(),
        'quickstartid': $("#quicklist").val(),
        'subsubcatid': $("#Subsubcatid").val(),
        'urgencyid': $("#Urgencyid").val(),
        'title': $("#errortitle").val()
    };
    console.log(data);
    $.ajax({
        url: baseapi + "Incident/AddIncident",
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            console.log(res);
            sendNotification();
            connection.invoke("SendNotification").catch(function (err) {
                event.preventDefault();
            });
        },
        error: function (xhr) {
            sendNotification();
            connection.invoke("SendNotification").catch(function (err) {
                event.preventDefault();
            });
        }
    });
}
function sendNotification() {
    $.ajax({
        url:  "/Home/AddNotification",
        type: "GET",
        dataType: "json",
        contentType: 'application/json',        
        success: function (res) {
            connection.invoke("SendNotification").catch(function (err) {
                event.preventDefault();
            });
        },
        error: function (xhr) {
            connection.invoke("SendNotification").catch(function (err) {
                event.preventDefault();
            });
        }
    });
}
function getNotification() {

    $.ajax({
        url: "/Home/GetNatification",
        type: "GEL",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            console.log(res);
            var total = parseInt(res.unreadnot);
            var tt = '';
            var not = '';
            var shortnot = '';
            if (total > 0) {
                tt = '<span class="badge rounded-pill bg-danger badge-up">' + total + '</span>';
            }
            $('#notid').html(tt);
            if (res.allnot.length > 0) {

                for (var i = 0; i < res.allnot.length; i++) {
                    not += '<tr><th>&#8718;</th><td>' + res.allnot[i].notification + '</td><td>' + res.allnot[i].notificationdate + '</td></tr>';

                    if (i<6) {
                        shortnot += ' <a class="d-flex" href="#"><div class="list-item d-flex align-items-start"> <div class="me-1">';
                        shortnot += ' <div class="avatar">&#8718;</div></div><div class="list-item-body flex-grow-1">';
                        shortnot += ' <p class="media-heading"><span class="fw-bolder">Hello 🎉</span>';
                        if (!res.allnot[i].isread) {
                            shortnot += ' <span class="fw-bolder" ><a style="float:right" onclick="MarkRead(' + res.allnot[i].notificationid +')">Read</a></span>';
                        }
                       
                        
                        shortnot += ' </p><small class="notification-text"> ' + res.allnot[i].notification.substring(0, 40) + '</small></div></div></a>';
                               
                    }
                }
                
            }
            $('#shortnoteid').html(shortnot);
            $('#notificationlist').html(not);
            
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function MarkAllRead() {
    $.ajax({
        url: "/Home/MarkasRead",
        type: "GEL",
        dataType: "json",
        contentType: 'application/json',
        success: function (res) {
            connection.invoke("SendNotification").catch(function (err) {
                event.preventDefault();
            });
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function MarkRead(id) {
    alert(id);
    $.ajax({
        url: "/Home/MarkasRead",
        type: "GET",        
        data: { notid: id },
        success: function (res) {
            connection.invoke("SendNotification").catch(function (err) {
                event.preventDefault();
            });
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}


