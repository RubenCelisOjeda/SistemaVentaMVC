var _idUser;
$(document).ready(function () {

    //texto
    $('#txtRol').prop("disabled", true);
    $('#txtEstado').prop("disabled", true);

    //funciones
    GetAccount();

    //Botones Siguente para cambio de pestaña
    $("#btnGuardar").on("click", function () {
        PutAccount();
    });
});

function GetAccount() {

    $.ajax({
        url: '/Home/GetAccount',
        method: 'GET',
        dataType: 'JSON',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            _idUser = objData.Id;
            $('#txtUsuario').val(objData.UserName);
            $('#txtEmail').val(objData.Email);
            $('#txtRol').val(objData.Rol);
            $('#txtEstado').val(objData.Status);
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

function PutAccount() {

    var pData = {
        pEntidad: {
            "Id": 0,
            "Usuario": $('#txtUsuario').val().trim(),
            "Email": $('#txtEmail').val().trim()
        }
    }

    $.ajax({
        url: '/Home/PutAccount',
        data: pData,
        method: 'POST',
        dataType: 'JSON',
        success: function (response) {

            var obj = jQuery.parseJSON(response);

            if (obj.CodigoError === 0) {
                alert("Se realizo los cambios correctamente.");
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