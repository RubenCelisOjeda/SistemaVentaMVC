var idEmpleado;

$(document).ready(function () {
    $('#loadingVenta').show();

    //texto
    $('#txtEmpleadoId').prop("disabled", true);
   
    //funciones
    LimpiarControles();
    StateButton("cargar");
    ListarCombos();
    HabilitarDeshabilitarControles(true);
    DataTableEmpleado();

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
        BuscarEmpleado();
        $('#loadingVenta').hide();
    });

    $("#btnNuevo").on("click", function () {
        RestablecerBadges(2, 2);
        StateButton("nuevo");
        HabilitarDeshabilitarControles(false);
        LimpiarControles();
        $('#txtEmpleadoNombres').focus();
    });
    $("#btnGuardar").on("click", function () {
        $('#loadingVenta').show();
        GuardarEmpleado();
        $('#loadingVenta').hide();
    });
    $("#btnCancelar").on("click", function () {
        window.location.reload();
    });

    $('#loadingVenta').hide();
    RestablecerBadges(1, 2);
});

function BuscarEmpleado() {

    var textoABuscar = $("#txtBuscar").val();
    if (textoABuscar === "" || textoABuscar === null) { textoABuscar = '%'; }
    var oData = { "pNombre": textoABuscar };

    $.ajax({
        url: '/Empleado/ListaEmpleadoByNombre',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            $('#TablaEmpleadoCab tbody').html('');
            for (var i = 0; i < objData.Lista.length; i++) {

                var filaTabla = '<tr>'
                    + '<td>' + objData.Lista[i].Id + '</td>'
                    + '<td>' + objData.Lista[i].Nombre + '</td>'
                    + '<td>' + objData.Lista[i].ApellidoPaterno + '</td>'
                    + '<td>' + objData.Lista[i].ApellidoMaterno + '</td>'
                    + '<td>' + objData.Lista[i].FechaNacimiento + '</td>'
                    + '<td>' + objData.Lista[i].EstadoCivil + '</td>';

        
                var columnaAcciones = '<td><a class="btn btn-success" href="#" onclick="ObtenerEmpleado(' + objData.Lista[i].Id + ')"><i class="fa fa-search-plus"></i></a><a name="btnEditar" class="btn btn-info" href="#" onclick="EditarEmpleado(' + objData.Lista[i].Id + ')"><i class="fa fa-edit"></i></a><a name="btnEliminar" class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + objData.Lista[i].Id + ')"><i class="fa fa-trash-o"></i></a></td>';
                filaTabla = filaTabla + columnaAcciones + '</tr>';

                $('#TablaEmpleadoCab tbody').append(filaTabla);
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

function DataTableEmpleado() {
    $('#TablaEmpleadoCab').DataTable({

        "processing": true,
        "serverSide": false,
        "orderMulti": true,
        "searching": true,
        "paging": true,
        "info": true,
        "destroy": true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],

        "ajax": {
            "url": "/Empleado/Get",
            "type": "GET",
            "datatype": "JSON"
        },

        "columns": [

            { "data": "Id" },
            { "data": "Nombre" },
            { "data": "ApellidoPaterno" },
            { "data": "ApellidoMaterno" },
            { "data": "EstadoCivil" },
            { "data": "Direccion" },

            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    return '<a class="btn btn-success mr-2" href="#" onclick="ObtenerEmpleado(' + data["Id"] + ')" title="Consultar"><i class="fa fa-search-plus"></i></a><a class="btn btn-info mr-2" href="#" onclick="EditarEmpleado(' + data["Id"] + ')" title="Consultar"><i class="fa fa-edit"></i></a><a class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + data["Id"] + ')" title="Eliminar"><i class="fa fa-trash-o"></i></a>';
                },
            }
        ],
    });
}

function EditarEmpleado(pId) {
    DatosEmpleado(pId);
    HabilitarDeshabilitarControles(false);
    StateButton("editar");
    $('#txtEmpleadoNombres').focus();
}

function ObtenerEmpleado(pId) {
    StateButton("consultar");
    DatosEmpleado(pId);
    HabilitarDeshabilitarControles(true);
}

function DatosEmpleado(pId) {
    var oData = { "pId": pId };

    $.ajax({
        url: '/Empleado/ObtenerEmpleadoById',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {

                var date = new Date(objData.Lista[0].FechaNacimiento);
                var dateFormat = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

                $("#txtEmpleadoId").val(objData.Lista[0].Id);
                $("#txtEmpleadoNombres").val(objData.Lista[0].Nombre);
                $("#txtEmpleadoApePaterno").val(objData.Lista[0].ApellidoPaterno);
                $("#txtEmpleadoApeMaterno").val(objData.Lista[0].ApellidoMaterno);
                $("#txtEmpleadoFecNacimiento").val(dateFormat);
                $("#cboEmpleadoEstadoCivil").val(objData.Lista[0].EstadoCivil);
                $("#txtEmpleadoDireccion").val(objData.Lista[0].Direccion);
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
    idEmpleado = pId;
    if (pId !== 0) {
        $('#myModal').appendTo("body").modal("show");
    }
}

function EliminarEmpleado() {
    var oData = { "pId": idEmpleado };
    console.log(oData);

    $.ajax({
        url: '/Empleado/EliminarEmpleado',
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

function GuardarEmpleado() {

    if (ValidarEmpleado() === true) {

        var pEntidad = {
            DtoEmpleado: {
                "Id": $("#txtEmpleadoId").val().trim(),
                "Nombre": $("#txtEmpleadoNombres").val().trim(),
                "ApellidoPaterno": $("#txtEmpleadoApePaterno").val().trim(),
                "ApellidoMaterno": $("#txtEmpleadoApeMaterno").val().trim(),
                "FechaNacimiento": $("#txtEmpleadoFecNacimiento").val(),
                "EstadoCivil": $("#cboEmpleadoEstadoCivil").val(),
                "Direccion": $("#txtEmpleadoDireccion").val().trim(),
                "Status" : 1
            }
        };

        console.log(pEntidad);

        $.ajax({
            url: '/Empleado/GuardarEmpleado',
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

function ValidarEmpleado() {
    var IsValid;
    if (isNotEmpty(txtEmpleadoNombres, "Ingrese nombre.", msg_txtEmpleadoNombres) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtEmpleadoApePaterno, "Ingrese apellido paterno.", msg_txtEmpleadoApePaterno) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtEmpleadoApeMaterno, "Ingrese apellido materno.", msg_txtEmpleadoApeMaterno) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtEmpleadoFecNacimiento, "Seleccione fecha de nacimiento.", msg_txtEmpleadoFecNacimiento) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isSelected(cboEmpleadoEstadoCivil, "Seleccione estado civil", msg_cboEmpleadoEstadoCivil) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else {
        IsValid = true;
    }
    return IsValid;
}

function ListarCombos() {
    ListarComboEstadoCivil();
}

function ListarComboEstadoCivil() {
    ListarComboGenerico("/Empleado/ListarComboEstadoCivil", "cboEmpleadoEstadoCivil", null);
}

function LimpiarControles() {
    $('#txtEmpleadoId').val("0");
    $('#txtEmpleadoNombres').val("");
    $('#txtEmpleadoApePaterno').val("");
    $('#txtEmpleadoApeMaterno').val("");
    $('#txtEmpleadoFecNacimiento').val("");
    $('#cboEmpleadoEstadoCivil').val("0");
    $('#txtEmpleadoDireccion').val("");
}

function HabilitarDeshabilitarControles(estado) {
    $('#txtEmpleadoNombres').prop("disabled", estado);
    $('#txtEmpleadoApePaterno').prop("disabled", estado);
    $('#txtEmpleadoApeMaterno').prop("disabled", estado);
    $('#txtEmpleadoFecNacimiento').prop("disabled", estado);
    $('#cboEmpleadoEstadoCivil').prop("disabled", estado);
    $('#txtEmpleadoDireccion').prop("disabled", estado);
}