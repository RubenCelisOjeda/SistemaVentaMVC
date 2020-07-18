var idCliente;

$(document).ready(function () {
    $('#loadingVenta').show();
    //texto
    $('#txtClienteId').prop("disabled", true);

    //funciones
    LimpiarControles();
    StateButton("cargar");
    HabilitarDeshabilitarControles(true);
    DataTableCliente();

    //Botones Siguente para cambio de pestaña
    $("#btnPaso2").on("click", function () {
        RestablecerBadges(2, 2);
    });

    //Posicionar Tab actual
    $("#datos1-tab").on("click", function () {
        RestablecerBadges(1, 2);
    });
    $("#datos2-tab").on("click", function () {
        RestablecerBadges(2, 2);
    });

    //botones
    $("#btnBuscar").on("click", function () {
        $('#loadingVenta').show();
        BuscarCliente();
        $('#loadingVenta').hide();
    });

    $("#btnNuevo").on("click", function () {
        RestablecerBadges(2, 2);
        StateButton("nuevo");
        HabilitarDeshabilitarControles(false);
        LimpiarControles();
        $('#txtClienteNombres').focus();
    });

    $("#btnGuardar").on("click", function () {
        $('#loadingVenta').show();
        GuardarCliente();
        $('#loadingVenta').hide();
    });

    $("#btnCancelar").on("click", function () {
        window.location.reload();
    });

    //boton reniec
    $("#btnConsultaReniec").on("click", function () {
        ConsultaDniReniec();
    });

    $('#loadingVenta').hide();
    RestablecerBadges(1, 2);
});

function DataTableCliente() {
    $('#TablaClienteCab').DataTable({

        "processing": true,
        "serverSide": false,
        "orderMulti": true,
        "searching": true,
        "paging": true,
        "info": true,
        "destroy": true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],

        "ajax": {
            "url": "/Cliente/Get",
            "type": "GET",
            "datatype": "JSON"
        },

        "columns": [

            { "data": "Id" },
            { "data": "Nombres" },
            { "data": "ApellidoPaterno" },
            { "data": "ApellidoMaterno" },
            { "data": "Dni" },

            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    return '<a class="btn btn-success mr-2" href="#" onclick="ObtenerCliente(' + data["Id"] + ')" title="Consultar"><i class="fa fa-search-plus"></i></a><a class="btn btn-info mr-2" href="#" onclick="EditarCliente(' + data["Id"] + ')" title="Consultar"><i class="fa fa-edit"></i></a><a class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + data["Id"] + ')" title="Eliminar"><i class="fa fa-trash-o"></i></a>';
                },
            }
        ],
    });
}

function ConsultaDniReniec() {
    var dni = $("#txtDniCliente").val().trim();
    var oData = { "pDni": dni };

    if (dni === "") {
        alert("Ingrese dni.");
        $("#txtDniCliente").focus(); return;
      
    } else if (dni.length !== 8) {
        alert("Ingrese dni válido.");
        $("#txtDniCliente").focus(); return;
    }

    $('#loadingVenta').show();
    $.ajax({
        url: '/Cliente/GetReniecCliente',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            if (objData.count === 1) {
                if ($("#txtDniCliente").val() !== "") { $("#txtDniCliente").val("") }
                $("#txtClienteNombres").val(objData.nombres);
                $("#txtClienteApePaterno").val(objData.apellidoPaterno);
                $("#txtClienteApeMaterno").val(objData.apellidoMaterno);
                $("#txtClienteDni").val(objData.dni);
                $('#loadingVenta').hide();
            } else {
                alert("No se encontro ,intente de nuevo.");
                $("#txtDniCliente").focus();
            }
            RestablecerBadges(2, 2);
            console.log("ir al paso 2, de 4");
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

function BuscarCliente() {

    var textoABuscar = $("#txtBuscar").val();
    if (textoABuscar === "" || textoABuscar === null) { textoABuscar = '%'; }
    var oData = { "pNombre": textoABuscar };

    $.ajax({
        url: '/Cliente/ListarClienteByNombre',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            $('#TablaClienteCab tbody').html('');
            for (var i = 0; i < objData.Lista.length; i++) {

                var filaTabla = '<tr>'
                    + '<td>' + objData.Lista[i].Id + '</td>'
                    + '<td>' + objData.Lista[i].Nombre + '</td>'
                    + '<td>' + objData.Lista[i].ApellidoPaterno + '</td>'
                    + '<td>' + objData.Lista[i].ApellidoMaterno + '</td>'
                    + '<td>' + objData.Lista[i].Dni + '</td>';

                var columnaAcciones = '<td><a class="btn btn-success" href="#" onclick="ObtenerCliente(' + objData.Lista[i].Id + ')"><i class="fa fa-search-plus"></i></a><a name="btnEditar" class="btn btn-info" href="#" onclick="EditarCliente(' + objData.Lista[i].Id + ')"><i class="fa fa-edit"></i></a><a name="btnEliminar" class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + objData.Lista[i].Id + ')"><i class="fa fa-trash-o"></i></a></td>';
                filaTabla = filaTabla + columnaAcciones + '</tr>';

                $('#TablaClienteCab tbody').append(filaTabla);
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

function EditarCliente(pId) {
    DatosCliente(pId);
    HabilitarDeshabilitarControles(false);
    StateButton("editar");
    $('#txtClienteNombres').focus();
}

function ObtenerCliente(pId) {
    StateButton("consultar");
    DatosCliente(pId);
    HabilitarDeshabilitarControles(true);
}

function DatosCliente(pId) {
    var oData = { "pId": pId };

    $.ajax({
        url: '/Cliente/ObtenerClienteById',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                $("#txtClienteId").val(objData.Lista[0].Id);
                $("#txtClienteNombres").val(objData.Lista[0].Nombres);
                $("#txtClienteApePaterno").val(objData.Lista[0].ApellidoPaterno);
                $("#txtClienteApeMaterno").val(objData.Lista[0].ApellidoMaterno);
                $("#txtClienteDni").val(objData.Lista[0].Dni);
                $("#txtClienteCelular").val(objData.Lista[0].Celular);
                $("#txtClienteNombreFacebook").val(objData.Lista[0].NombreFacebook);
                $("#txtClienteDireccion").val(objData.Lista[0].DireccionLugarEntrega);
            }
            RestablecerBadges(2, 2);
            console.log("ir al paso 2, de 4");
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

function ConfirmarEliminar(pId) {
    idCliente = pId;
    if (pId !== 0) {
        $('#myModal').appendTo("body").modal("show");
    }
}

function EliminarCliente() {
    var oData = { "pId": idCliente };
    console.log(oData);

    $.ajax({
        url: '/Cliente/EliminarCliente',
        data: oData,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log("Respuesta desde el web api.");
            console.log(data);
            alert("Se elimino correctamente");

            location.reload();
        },
        failure: function (msg) {
            console.log("funcion failure");
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

function GuardarCliente() {

    if (ValidarCliente() === true) {
        debugger;
        var pEntidad = {
            DtoCliente: {
                "Id": $("#txtClienteId").val().trim(),
                "Nombres": $("#txtClienteNombres").val().trim(),
                "ApellidoPaterno": $("#txtClienteApePaterno").val().trim(),
                "ApellidoMaterno": $("#txtClienteApeMaterno").val().trim(),
                "Dni": $("#txtClienteDni").val().trim(),
                "Celular": $("#txtClienteCelular").val().trim(),
                "NombreFacebook": $("#txtClienteNombreFacebook").val().trim(),
                "DireccionLugarEntrega": $("#txtClienteDireccion").val().trim()
            }
        };

        console.log(pEntidad);

        $.ajax({
            url: '/Cliente/GuardarCliente',
            data: pEntidad,
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log("Respuesta desde el web api.");
                console.log(data);
                alert("Se guardó correctamente.");
                window.location.reload();
            },
            failure: function (msg) {
                console.log("funcion failure");
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
}

function ValidarCliente() {
    var IsValid;
    if (isNotEmpty(txtClienteNombres, "Ingrese nombres.", msg_txtClienteNombres) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtClienteApePaterno, "Ingrese apellido paterno.", msg_txtClienteApePaterno) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtClienteApeMaterno, "Ingrese apellido materno.", msg_txtClienteApeMaterno) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtClienteCelular, "Ingrese celular.", msg_txtClienteCelular) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else {
        IsValid = true;
    }
    return IsValid;
}

function LimpiarControles() {
    $('#txtClienteId').val("0");
    $('#txtClienteNombres').val("");
    $('#txtClienteApePaterno').val("");
    $('#txtClienteApeMaterno').val("");
    $('#txtClienteDni').val("");
    $('#txtClienteCelular').val("");
    $('#txtClienteNombreFacebook').val("");
    $('#txtClienteDireccion').val("");
}

function HabilitarDeshabilitarControles(estado) {
    $('#txtClienteNombres').prop("disabled", estado);
    $('#txtClienteApePaterno').prop("disabled", estado);
    $('#txtClienteApeMaterno').prop("disabled", estado);
    $('#txtClienteDni').prop("disabled", estado);
    $('#txtClienteCelular').prop("disabled", estado);
    $('#txtClienteNombreFacebook').prop("disabled", estado);
    $('#txtClienteDireccion').prop("disabled", estado);
}