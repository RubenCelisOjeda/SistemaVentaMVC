var IdUsuario;

$(document).ready(function () {
    $('#loadingVenta').show();

    //texto
    $('#txtUsuarioId').prop("disabled", true);
    $('#txtUsuarioFechaRegistro').prop("disabled", true);
  
    //funciones
    LimpiarCombos();
    LimpiarControles();
    StateButton("cargar");
    ListarCombos();
    DataTableUsuario();
    HabilitarDeshabilitarControles(true);

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
        BuscarUsuario();
        $('#loadingVenta').hide();
    });
    $("#btnNuevo").on("click", function () {
        RestablecerBadges(2, 2);
        StateButton("nuevo");
        HabilitarDeshabilitarControles(false);
        LimpiarControles();
        $('#cboUsuarioEmpleadoId option').remove();
        $('#cboUsuarioEmpleadoId').append($('<option>').val(0).text("Seleccione"));
        ListarComboEmpleado(1, 0)
        $('#cboUsuarioRolId').focus();
    });
    $("#btnGuardar").on("click", function () {
        $('#loadingVenta').show();
        GuardarUsuario();
        $('#loadingVenta').hide();
    });
    $("#btnCancelar").on("click", function () {
        $('#loadingVenta').show();
        window.location.reload();
        $('#loadingVenta').hide();
    });

    $('#loadingVenta').hide();
    RestablecerBadges(1, 2);
});

function DataTableUsuario() {

    $('#TablaUsuarioCab').DataTable({

        "processing": true,
        "serverSide": false,
        "orderMulti": true,
        "searching": true,
        "paging": true,
        "info": true,
        "destroy": true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],

        "ajax": {
            "url": "/Usuario/Get",
            "type": "GET",
            "datatype": "JSON"
        },

        "columns": [

            { "data": "Id" },
            { "data": "UsuarioName" },
            { "data": "Password" },
            { "data": "Email" },
            { "data": "Empleado" },
            { "data": "RolUsuario" },
            { "data": "Estado" },

            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    return '<a class="btn btn-success mr-2" href="#" onclick="ObtenerUsuario(' + data["Id"] + ')" title="Consultar"><i class="fa fa-search-plus"></i></a><a class="btn btn-info mr-2" href="#" onclick="EditarUsuario(' + data["Id"] + ')" title="Consultar"><i class="fa fa-edit"></i></a><a class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + data["Id"] + ')" title="Eliminar"><i class="fa fa-trash-o"></i></a>';
                },
            }
        ],
    });
}

function BuscarUsuario() {

    var textoABuscar = $("#txtBuscar").val();
    if (textoABuscar === "" || textoABuscar === null) { textoABuscar = '%'; }
    var oData = { "pNombre": textoABuscar };

    $.ajax({
        url: '/Usuario/ListaUsuarioByNombre',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            $('#TablaUsuarioCab tbody').html('');
            for (var i = 0; i < objData.Lista.length; i++) {

                var filaTabla = '<tr>'
                    + '<td>' + objData.Lista[i].Id + '</td>'
                    + '<td>' + objData.Lista[i].Usuario1 + '</td>'
                    + '<td>' + objData.Lista[i].Password + '</td>'
                    + '<td>' + objData.Lista[i].Email + '</td>'
                    + '<td>' + objData.Lista[i].Empleado + '</td>'
                    + '<td>' + objData.Lista[i].RolUsuario + '</td>';

                var columnaEstado = '';

                if (objData.Lista[i].Estado === 1) { columnaEstado = '<td><span class="badge badge-success">Activo</span></td>'; }
                else { columnaEstado = '<td><span class="badge badge-danger">Inactivo</span></td>'; }

                var columnaAcciones = '<td><a class="btn btn-success" href="#" onclick="ObtenerUsuario(' + objData.Lista[i].Id + ')"><i class="fa fa-search-plus"></i></a><a name="btnEditar" class="btn btn-info" href="#" onclick="EditarUsuario(' + objData.Lista[i].Id + ')"><i class="fa fa-edit"></i></a><a name="btnEliminar" class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + objData.Lista[i].Id + ')"><i class="fa fa-trash-o"></i></a></td>';
                filaTabla = filaTabla + columnaEstado + columnaAcciones + '</tr>';

                $('#TablaUsuarioCab tbody').append(filaTabla);
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

function EditarUsuario(pId) {
    debugger;
    ListarComboEmpleado(0, pId)
    DatosUsuario(pId);
    HabilitarDeshabilitarControles(false);
    StateButton("editar");
    $('#cboUsuarioEmpleadoId').prop("disabled",true);
}

function ObtenerUsuario(pId) {
    debugger;
    StateButton("consultar");
    ListarComboEmpleado(0, pId)
    DatosUsuario(pId);
    HabilitarDeshabilitarControles(true);
}

function DatosUsuario(pId) {
    var oData = { "pId": pId };
    $.ajax({
        url: '/Usuario/ObtenerUsuarioById',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            var date = new Date(objData.Lista[0].FechaRegistro);
            var dateFormat = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {

                $("#txtUsuarioId").val(objData.Lista[0].Id);
                $("#txtUsuarioNombre").val(objData.Lista[0].UsuarioName);
                $("#txtUsuarioPassword").val(objData.Lista[0].Password);
                $("#txtUsuarioConfirmarPassword").val(objData.Lista[0].Password);
                $("#txtUsuarioEmail").val(objData.Lista[0].Email);
                $("#cboUsuarioRolId").val(objData.Lista[0].RoId);
                $("#chkUsuarioEstado").prop("checked",objData.Lista[0].Estado);
                $("#txtUsuarioFechaRegistro").val(dateFormat);
                $("#cboUsuarioEmpleadoId").val(objData.Lista[0].IdEmpleado);

                RestablecerBadges(2,2);
            }
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
    IdUsuario = pId;
    if (pId !== 0) {
        $('#myModal').appendTo("body").modal("show");
    }
}

function EliminarUsuario() {

    var oData = { "pId": IdUsuario };

    console.log(oData);

    $.ajax({
        url: '/Usuario/EliminarUsuario',
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

function GuardarUsuario() {

    if (ValidarUsuario() === true) {

        if ($('#txtUsuarioPassword').val() !== $('#txtUsuarioConfirmarPassword').val()) {
            alert("Contraseñas no coinciden");
            return;
        }

        var check;
        if ($("#chkUsuarioEstado").is(":checked")) check = 1;
        else check = 0;

        var pEntidad = {
            DtoUsuario: {
                "Id": $("#txtUsuarioId").val().trim(),
                "UsuarioName": $("#txtUsuarioNombre").val().trim(),
                "Password": $("#txtUsuarioPassword").val().trim(),
                "Email": $("#txtUsuarioEmail").val().trim(),
                "RoId": $("#cboUsuarioRolId").val(),
                "Estado": check,
                "FechaRegistro": ObtenerFecha(),
                "IdEmpleado": $("#cboUsuarioEmpleadoId").val(),
                "Status": 1
            }
        };

        console.log(pEntidad);

        $.ajax({
            url: '/Usuario/GuardarUsuario',
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

function ValidarUsuario() {
    var IsValid;
    if (isSelected(cboUsuarioRolId, "Seleccione tipo de rol.", msg_cboUsuarioRolId) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtUsuarioEmail, "Ingrese email.", msg_txtUsuarioEmail) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isValidEmail(txtUsuarioEmail, "Ingrese email válido.", msg_txtUsuarioEmail) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtUsuarioNombre, "Ingrese usuario.", msg_txtUsuarioNombre) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtUsuarioPassword, "Ingrese contraseña", msg_txtUsuarioPassword) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtUsuarioConfirmarPassword, "Ingrese contraseña", msg_txtUsuarioConfirmarPassword) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isSelected(cboUsuarioEmpleadoId, "Seleccione un empleado.", msg_cboUsuarioEmpleadoId) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else {
        IsValid = true;
    }
    return IsValid;
}

function ListarCombos() {
    ListarComboRolUsuario();
    ListarComboEmpleado(1,0);
}

function ListarComboRolUsuario() {
    ListarComboGenerico("/Usuario/ListarComboRolUsuario","cboUsuarioRolId",null);
}

function LimpiarCombos() {
    LimpiarComboRolUsuario();
    LimpiarComboEmpleado();
}

function LimpiarComboRolUsuario() {
    $('#cboUsuarioRolId option').remove();
    $('#cboUsuarioRolId').append($('<option>').val(0).text("Seleccione"));
}
function LimpiarComboEmpleado() {
    $('#cboUsuarioEmpleadoId option').remove();
    $('#cboUsuarioEmpleadoId').append($('<option>').val(0).text("Seleccione"));
}

function ListarComboEmpleado(pIdCombo, pIdUsuario) {
    var oData = { "pIdCombo": pIdCombo, "pIdUsuario": pIdUsuario};
    $.ajax({
        url: '/Usuario/ListarComboEmpleado',
        data: oData,
        method: 'GET',
        async:false,
        dataType: 'json',
        success: function (response) {

            var objData = jQuery.parseJSON(response);
            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                for (var i = 0; i < objData.Lista.length; i++) {
                    var fila = '<option value="' + objData.Lista[i].Id + '">' + objData.Lista[i].Etiqueta + '</option>';
                    $('#cboUsuarioEmpleadoId').append(fila);
                }
            } else {
                $('#cboUsuarioEmpleadoId option').remove();
                $('#cboUsuarioEmpleadoId').append($('<option>').val(0).text("Seleccione"));
            }
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


function LimpiarControles() {
    $('#txtUsuarioId').val("0");
    $('#cboUsuarioRolId').val("0");
    $('#txtUsuarioEmail').val("");
    $('#txtUsuarioNombre').val("");
    $('#txtUsuarioPassword').val("");
    $('#txtUsuarioConfirmarPassword').val("");
    $('#cboUsuarioEmpleadoId').val("0");
    $('#txtUsuarioFechaRegistro').val("");
    $('#chkUsuarioEstado').prop("checked",false);
}

function HabilitarDeshabilitarControles(estado) {
    $('#cboUsuarioRolId').prop("disabled", estado);
    $('#txtUsuarioEmail').prop("disabled", estado);
    $('#txtUsuarioNombre').prop("disabled", estado);
    $('#txtUsuarioPassword').prop("disabled", estado);
    $('#txtUsuarioConfirmarPassword').prop("disabled", estado);
    $('#cboUsuarioEmpleadoId').prop("disabled", estado);
    $('#chkUsuarioEstado').prop("disabled", estado);
}