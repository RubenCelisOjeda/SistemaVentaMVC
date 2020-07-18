var idProducto;

$(document).ready(function () {
    $('#loadingVenta').hide();

    //texto
    $('#txtProductoId').prop("disabled", true);

    //funciones
    LimpiarControles();
    StateButton("cargar");
    HabilitarDeshabilitarControles(true);
    DataTableProducto();

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
        BuscarProducto();
        $('#loadingVenta').hide();
    });

    $("#btnNuevo").on("click", function () {
        RestablecerBadges(2, 2);
        StateButton("nuevo");
        HabilitarDeshabilitarControles(false);
        LimpiarControles();
        $('#txtProductoNombre').focus();
    });

    $("#btnGuardar").on("click", function () {
        $('#loadingVenta').show();
        GuardarProducto();
        $('#loadingVenta').hide();
    });

    $("#btnCancelar").on("click", function () {
        window.location.reload();
    });

    $('#loadingVenta').hide();
    RestablecerBadges(1, 2);
});

function DataTableProducto() {
    $('#TablaProductoCab').DataTable({

        "processing": true,
        "serverSide": false,
        "orderMulti": true,
        "searching": true,
        "paging": true,
        "info": true,
        "destroy": true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],

        "ajax": {
            "url": "/Producto/Get",
            "type": "GET",
            "datatype": "JSON"
        },

        "columns": [

            { "data": "Id" },
            { "data": "Nombre" },
            { "data": "Precio" },
            { "data": "Costo" },
            { "data": "Stock" },

            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    return '<a class="btn btn-success mr-2" href="#" onclick="ObtenerProducto(' + data["Id"] + ')" title="Consultar"><i class="fa fa-search-plus"></i></a><a class="btn btn-info mr-2" href="#" onclick="EditarProducto(' + data["Id"] + ')" title="Consultar"><i class="fa fa-edit"></i></a><a class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + data["Id"] + ')" title="Eliminar"><i class="fa fa-trash-o"></i></a>';
                },
            }
        ],
    });
}

function BuscarProducto() {

    var textoABuscar = $("#txtBuscar").val();
    if (textoABuscar === "" || textoABuscar === null) { textoABuscar = '%'; }
    var oData = { "pNombre": textoABuscar };

    $.ajax({
        url: '/Producto/ListarProductoByNombre',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            $('#TablaProductoCab tbody').html('');
            for (var i = 0; i < objData.Lista.length; i++) {

                var filaTabla = '<tr>'
                    + '<td>' + objData.Lista[i].Id + '</td>'
                    + '<td>' + objData.Lista[i].Nombre + '</td>'
                    + '<td>' + objData.Lista[i].Precio + '</td>'
                    + '<td>' + objData.Lista[i].Costo + '</td>'
                    + '<td>' + objData.Lista[i].Stock + '</td>' ;

                var columnaAcciones = '<td><a class="btn btn-success" href="#" onclick="ObtenerProducto(' + objData.Lista[i].Id + ')"><i class="fa fa-search-plus"></i></a><a name="btnEditar" class="btn btn-info" href="#" onclick="EditarProducto(' + objData.Lista[i].Id + ')"><i class="fa fa-edit"></i></a><a name="btnEliminar" class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + objData.Lista[i].Id + ')"><i class="fa fa-trash-o"></i></a></td>';
                filaTabla = filaTabla + columnaAcciones + '</tr>';

                $('#TablaProductoCab tbody').append(filaTabla);
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

function EditarProducto(pId) {
    DatosProducto(pId);
    HabilitarDeshabilitarControles(false);
    StateButton("editar");
}

function ObtenerProducto(pId) {
    StateButton("consultar");
    DatosProducto(pId);
    HabilitarDeshabilitarControles(true);
}

function DatosProducto(pId) {
    var oData = { "pId": pId };
    $.ajax({
        url: '/Producto/ObtenerProductoById',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                $("#txtProductoId").val(objData.Lista[0].Id);
                $("#txtProductoNombre").val(objData.Lista[0].Nombre);
                $("#txtProductoPrecio").val(objData.Lista[0].Precio);
                $("#txtProductoCosto").val(objData.Lista[0].Costo);
                $("#txtProductoStock").val(objData.Lista[0].Stock);
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
    idProducto = pId;
    if (pId !== 0) {
        $('#myModal').appendTo("body").modal("show");
    }
}

function EliminarProducto() {

    var oData = { "pId": idProducto };

    console.log(oData);

    $.ajax({
        url: '/Producto/EliminarProducto',
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

function GuardarProducto() {

    if (ValidarProducto() === true) {

        var pEntidad = {
            DtoProducto: {
                "Id": $("#txtProductoId").val().trim(),
                "Nombre": $("#txtProductoNombre").val().trim(),
                "Precio": $("#txtProductoPrecio").val().trim(),
                "Costo": $("#txtProductoCosto").val().trim(),
                "Stock": $("#txtProductoStock").val().trim()
            }
        };

        console.log(pEntidad);

        $.ajax({
            url: '/Producto/GuardarProducto',
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

function ValidarProducto() {
    var IsValid;

    if (isNotEmpty(txtProductoNombre, "Ingrese producto.", msg_txtProductoNombre) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtProductoPrecio, "Ingrese precio.", msg_txtProductoPrecio) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtProductoCosto, "Ingrese costo.", msg_txtProductoCosto) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtProductoStock, "Ingrese stock.", txtProductoStock) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else {
        IsValid = true;
    }
    return IsValid;
}

function LimpiarControles() {
    $('#txtProductoId').val("0");
    $('#txtProductoNombre').val("");
    $('#txtProductoPrecio').val("");
    $('#txtProductoCosto').val("");
    $('#txtProductoStock').val("");
}

function HabilitarDeshabilitarControles(estado) {
    $('#txtProductoNombre').prop("disabled", estado);
    $('#txtProductoPrecio').prop("disabled", estado);
    $('#txtProductoCosto').prop("disabled", estado);
}