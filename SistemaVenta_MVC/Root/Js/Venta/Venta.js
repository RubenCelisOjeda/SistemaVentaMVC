var _idVenta;

$(document).ready(function () {
    $('#loadingVenta').show();

    //ocultar input
    $('#txtConceptoVentaId').prop("disabled", true);
    $('#txtVentaTotal').prop("disabled", true);
    $('#txtVentaImporte').prop("disabled", true);
    $('#txtVentaPrecio').prop("disabled", true);
    $('#txtVentaFecha').prop("disabled", true);
    
    //ocultar  
    $('#grupoTotal').css("visibility", "hidden");

    //funciones
    LimpiarControles();
    StateButton("cargarVenta");
    HabilitarDeshabilitarControles(true);
    ListarCombos();
    DataTableVenta();

    //Botones Siguente para cambio de pestaña
    $("#btnPaso2").on("click", function () {
        RestablecerBadges(2, 2);
    });

    //Posicionar Tab actual
    $("#datos1-tab").on("click", function () {
        $('#grupoTotal').css("visibility", "hidden");
        RestablecerBadges(1, 2);
        StateButton("datosClick");
    });
    $("#datos2-tab").on("click", function () {
        RestablecerBadges(2, 2);
        $('#grupoTotal').css("visibility", "visible");

        var count = $('#TablaConceptoVentaCab tbody tr').length;

        if (count === 0) StateButton("datosClick");
        else StateButton("consultarVenta");
    });

    //Botones
    $("#btnNuevo").on("click", function () {
        RestablecerBadges(2, 2);
        StateButton("nuevo");
        HabilitarDeshabilitarControles(false);
        LimpiarControles();
        $('#grupoTotal').css("visibility", "visible");
        $('#cboVentaProductoId').focus();
    });

    $("#btnImprimirVenta").on("click", function () {
        window.location.href = "/Root/Report/VentaGenerada.aspx?id=" + _idVenta;
    });
    //

    ///evento onchange
    $('#txtVentaCantidad').on("change", function () {
        if ($(this).val() === "") {
            $(this).val("0");
        }
        ObtenerTotal($('#txtVentaPrecio').val(), $('#txtVentaCantidad').val());
    });
    $('#cboVentaProductoId').on("change", function () {
        if ($(this).val() !== "0") {
            ObtenerProductoPrecio($(this).val());

        } else {
            $('#txtVentaPrecio').val("0");
        }
    });
    $('#txtVentaCantidad').on("keyup", function () {
        ObtenerTotal($('#txtVentaPrecio').val(), $('#txtVentaCantidad').val());
    });
    $('#loadingVenta').hide();
    RestablecerBadges(1, 2);
});

function ObtenerTotal(pPrecio, pCantidad) {
    var precio = pPrecio;
    var cantidad = pCantidad === "" ? "0" : pCantidad;
    var total = 0;
    total = (parseFloat(precio) * parseFloat(cantidad)).toFixed(2);

    _importeProducto = total;
    CurrencyFormat("txtVentaImporte", total);
}

function ObtenerProductoPrecio(pId) {
    var oData = { "pId": pId };

    $.ajax({
        url: '/Venta/GetProductoPrecio',
        data: oData,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            var objData = jQuery.parseJSON(response);
            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                $('#txtVentaPrecio').val("");
                $('#txtVentaPrecio').val(objData.Lista[0].Precio);
            }
        },
        error: function () {
            console.log("ERROR: No se ha podido obtener la información");
        },
    });
}

function DataTableVenta() {

    $('#TablaVentaCab').DataTable({

        "processing": true,
        "serverSide": false,
        "orderMulti": true,
        "searching": true,
        "paging": true,
        "info": true,
        "destroy": true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],

        "ajax": {
            "url": "/Venta/Get",
            "type": "GET",
            "datatype": "json",
            "cache": false
        },

        "columns": [

            { "data": "Id" },
            { "data": "Cliente" },
            { "data": "Total" },
            { "data": "Fecha"},

            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    return '<a class="btn btn-success mr-2" href="#" onclick="ObtenerConceptoVenta(' + data["Id"] + ')" title="Consultar"><i class="fa fa-search-plus"></i></a><a class="btn btn-danger" href="#" onclick="ConfirmarEliminar(' + data["Id"] + ')" title="Eliminar"><i class="fa fa-trash-o"></i></a>';
                },
            }
        ],
    });
}

function ObtenerConceptoVenta(pId) {
    _idVenta = pId;
    DataTableConceptoVenta(pId);
    RestablecerBadges(2, 2);
    StateButton("consultarVenta");
    $('#grupoTotal').css("visibility", "visible");
}

function EditarConceptoVenta(pId) {
    if (pId !== "0") {
        DatosConceptoVenta(pId);
        $('#cboVentaProductoId').focus();
    }
}

function DatosConceptoVenta(pId) {
    var oData = { "pId": pId };
    $.ajax({
        url: '/Venta/ObtenerConceptoVentaById',
        data: oData,
        method: 'GET',
        dataType: 'JSON',
        async: false,
        success: function (response) {
            var objData = jQuery.parseJSON(response);

            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                $('#txtConceptoVentaId').val(objData.Lista[0].Id);
                $('#cboVentaProductoId').val(objData.Lista[0].ProductoId);
                $('#cboVentaClienteId').val(objData.Lista[0].ClienteId);
                $('#txtVentaPrecio').val(objData.Lista[0].PrecioUnitario);
                $('#txtVentaCantidad').val(objData.Lista[0].Cantidad);
                $('#txtVentaImporte').val(objData.Lista[0].Importe);
            }
        },
        error: function () {
            console.log("ERROR: No se ha podido obtener la información");
        },
    });
}

function DataTableConceptoVenta(pId) {
    var pData = { "pId": pId };
    $('#TablaConceptoVentaCab').DataTable({

        "processing": true,
        "serverSide": false,
        "orderMulti": true,
        "searching": true,
        "paging": true,
        "info": true,
        "destroy":true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],

        "ajax": {
            "url": "/Venta/ObtenerConceptoDetalleVenta",
            "type": "GET",
            "data":pData,
            "datatype": "json",
            "async" : false
        },
        
        "columns": [

            { "data": "Id" },
            { "data": "Producto" },
            { "data": "Cliente" },
            { "data": "Cantidad" },
            { "data": "PrecioUnitario" },
            { "data": "Importe" },
            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    CurrencyFormat("txtVentaTotal", data["Total"]);
                    return '<a class="btn btn-success" href="#" onclick="EditarConceptoVenta(' + data["Id"] + ')" title="Eliminar"><i class="fa fa-search-plus"></i></a>';
                },
            }
        ],
    });
}

function ConfirmarEliminar(pId) {
    _idVenta = pId;
    if (pId !== 0) {
        $('#myModal').appendTo("body").modal("show");
    }
}

function EliminarConceptoVenta() {
    var oData = { "pId": _idVenta };

    $.ajax({
        url: '/Venta/EliminarVenta',
        data: oData,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log("Respuesta desde el web api.");
            console.log(data);
            alert("Se elimino correctamente");
            $('#TablaVentaCab').DataTable().ajax.reload();
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

function GuardarConceptoVenta() {
    if (ValidarConceptoVenta() === true) {
        var pEntidad = {
            DtoConceptoVenta: {
                "Id": $("#txtConceptoVentaId").val().trim(),
                "VentaId": _idVenta,
                "ProductoId": $("#cboVentaProductoId").val(),
                "UsuarioId": 0,
                "Cantidad": $("#txtVentaCantidad").val().trim(),
                "PrecioUnitario": $("#txtVentaPrecio").val().trim(),
                "Importe": $("#txtVentaImporte").val().trim()
            }
        };

        console.log(pEntidad);

        $.ajax({
            url: '/ConceptoVenta/GuardarConceptoVenta',
            data: pEntidad,
            method: 'POST',
            dataType: 'JSON',
            success: function (data) {
                console.log("Respuesta desde el web api.");
                console.log(data);
             
                alert("Se guardó correctamente.");
                
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

function ValidarConceptoVenta() {
    var IsValid;
    if (isSelected(cboVentaProductoId, "Seleccione un producto.", msg_cboVentaProductoId) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isSelected(cboVentaClienteId, "Seleccione un cliente.", msg_cboVentaClienteId) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmptyInt(txtVentaCantidad, "Ingrese cantidad.", msg_txtVentaCantidad) === false){
        RestablecerBadges(2, 2);
        IsValid = false;

    }  else {
        IsValid = true;
    }
    return IsValid;
}

function ListarCombos() {
    ListarComboProducto();
    ListarComboCliente();
}

function ListarComboProducto() {
    ListarComboGenerico("/Venta/ListarComboProducto", "cboVentaProductoId", null);
}

function ListarComboCliente() {
    ListarComboGenerico("/Venta/ListarComboCliente", "cboVentaClienteId", null);
}

function LimpiarCombos() {
    LimpiarComboProducto();
    LimpiarComboCliente();
}

function LimpiarComboProducto() {
    $('#cboVentaProductoId option').remove();
    $('#cboVentaProductoId').append($('<option>').val(0).text("Seleccione"));
}

function LimpiarComboCliente() {
    $('#cboVentaClienteId option').remove();
    $('#cboVentaClienteId').append($('<option>').val(0).text("Seleccione"));
}

function LimpiarControles() {
    $('#txtConceptoVentaId').val("0");
    $('#cboVentaProductoId').val("0");
    $('#cboVentaClienteId').val("0");
    $('#txtVentaPrecio').val("0");
    $('#txtVentaCantidad').val("0");
    $('#txtVentaImporte').val("");
    $('#txtVentaTotal').val("S/0.00");
    $('#txtVentaFecha').val("");
}

function HabilitarDeshabilitarControles(estado) {
    $('#cboVentaProductoId').prop("disabled", estado);
    $('#cboVentaClienteId').prop("disabled", estado);
    $('#txtVentaCantidad').prop("disabled", estado);
}