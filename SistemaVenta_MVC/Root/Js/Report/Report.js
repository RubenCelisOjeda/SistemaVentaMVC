$(document).ready(function () {

    $('.pagination > li').addClass("btn btn-ligth");

    $('#btnReporte').on("click", function () {
        FilterReport($('#txtBuscar').val(), $('#txtFechaDesde').val(), $('#txtFechaHasta').val());
    });
});
function FilterReport(pText, pDateStart, pDateEnd) {

    var pFilter = {
        "Text": pText,
        "DateStart": pDateStart,
        "DateEnd": pDateEnd
    } 

    $.ajax({
        url: '/Report/Index',
        data: pFilter,
        method: 'GET',
        dataType: 'JSON',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
               
            if (objData.Count ===   0) {

            }
        },
        failure: function (msg) {
            console.log("entro a la funcion failure");
            console.log(msg);
        },
        error: function () {
            console.log("ERROR: No se ha podido obtener la información");
        },
        complete: function () {
            console.log("COMPLETE: No se ha podido obtener la información");
        }
    });
}