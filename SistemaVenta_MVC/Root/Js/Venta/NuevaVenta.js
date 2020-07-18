var _arrayProducto = [];
var _idVenta;
var _totalVenta = 0.00;
var _totalStock = 0;
var _importeProducto = 0.00;
var _codProducto = 0;
var _cantidad = 0;

$(document).ready(function () {

    //ocultar input
    $('#txtVentaId').prop("disabled", true);
    $('#txtVentaTotal').prop("disabled", true);
    $('#txtVentaImporte').prop("disabled", true);
    $('#txtVentaPrecio').prop("disabled", true);
    $('#txtVentaStock').prop("disabled", true);

    //funciones
    LimpiarControles();
    StateButton("cargar");
    HabilitarDeshabilitarControles(true);
    ListarCombos();

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

    //acciones botones
    $("#btnNuevo").on("click", function () {
        RestablecerBadges(2, 2);
        StateButton("nuevo");
        HabilitarDeshabilitarControles(false);
        LimpiarControles();
        $('#cboVentaProductoId').focus();
    });
    $("#btnGuardarVenta").on("click", function () {
        var count = $('#TablaConceptoVentaCab tbody tr').length;
        if (count === 0) {
            alert("Agregue un producto para guardar la venta.");

        } else {
            GuardarVenta();
        }
    });
    $("#btnGenerarVenta").on("click", function () {
        var count = $('#TablaConceptoVentaCab tbody tr').length;
        if (count === 0) {
            alert("Agregue un producto para guardar e imprimir la venta.");

        } else {
            GuardarGenerarVenta();
        }
    });

    $("#btnCancelar").on("click", function () {
        var count = $('#TablaConceptoVentaCab tbody tr').length;

        if (count === 0) {
            LimpiarControles();
            HabilitarDeshabilitarControles(true);
            StateButton("cancelar");

        } else {
            alert("Tiene ventas agregadas,elimine las existentes para poder cancelar");
        }
    });

    $('#btnAgregarProducto').on("click", function () {
        var stock = parseInt($('#txtVentaStock').val());
        var cantidad = parseInt($('#txtVentaCantidad').val());

        if ( cantidad > stock) {
            alert("Stock no disponible,consulte con el administrador.");

        } else {
            AgregarConceptoVenta();
        }
    });

    //evento onchange
    $('#cboVentaProductoId').on("change", function () {
        if ($(this).val() !== "0") {
            _codProducto = $(this).val();
            ObtenerProductoPrecioStock($(this).val());

        } else {
            $('#txtVentaPrecio').val("0");
        }
        ObtenerTotal($('#txtVentaPrecio').val(),$('#txtVentaCantidad').val());
    });

    $('#txtVentaCantidad').on("change", function () {
        if ($(this).val() === "") {
            $(this).val("0");
        }
        ObtenerTotal($('#txtVentaPrecio').val(), $('#txtVentaCantidad').val());
    });

    $('#txtVentaCantidad').on("keyup", function () {
        ObtenerTotal($('#txtVentaPrecio').val(), $('#txtVentaCantidad').val());
    });

    $('table tbody').on('click', '.btn', function () {

        var idProducto = 0;
        var cantidad = 0;
        var importe = 0;
        var numero = 0;

        idProducto = $(this).closest('tr').attr("id");
        cantidad = $(this).closest('tr').data("cantidad");
        importe = $(this).closest('tr').data("importe");
        numero = $(this).closest('tr').data("numero");
        $(this).closest('tr').remove();
        RemoveRowArray(_arrayProducto, numero);

        //actulizar total
        _totalVenta = parseFloat(_totalVenta) - parseFloat(importe);
        CurrencyFormat("txtVentaTotal", _totalVenta);

        ActualizarStock(idProducto,cantidad,"sumar");
    });

});

function RemoveRowArray(pArray = [],pIdProducto) {
    for (var i = 0; i < pArray.length; i++) {
        if (pArray[i]["Nro"] === pIdProducto) {
            pArray.splice(i,1);
        }
    }
}

function ObtenerTotal(pPrecio, pCantidad) {
    
    var precio = pPrecio;
    var cantidad = pCantidad === "" ? "0" : pCantidad;
    var total = 0;
    total = (parseFloat(precio) * parseFloat(cantidad)).toFixed(2);

    _importeProducto = total;
    CurrencyFormat("txtVentaImporte",total);
}

function ObtenerProductoPrecioStock(pId) {
    var oData = { "pId": pId };
    var oPrecio = 0;
    $.ajax({
        url: '/Venta/GetProductoPrecioStock',
        data: oData,
        method: 'GET',
        dataType: 'json',
        async:false,
        success: function (response) {
            var objData = jQuery.parseJSON(response);
         
            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                oPrecio = objData.Lista[0].Precio;
                CurrencyFormatInt("txtVentaPrecio", oPrecio);
                $('#txtVentaStock').val(objData.Lista[0].Stock);
            }
        },
        error: function () {
            console.log("ERROR: No se ha podido obtener la información");
        },
    });
}

function AgregarConceptoVenta() {
    if (ValidarConceptoVenta() === true) {
        AgregarProducto();
        $('#cboVentaClienteId').prop("disabled",true);
    }
}

function AgregarProducto() {
    debugger;

    //asignando valores
    var ventaId = $("#txtVentaId").val();
    var productoId = $("#cboVentaProductoId").val();
    var producto = $("#cboVentaProductoId option:selected").text();
    var usuario = "0";
    var cantidad = $("#txtVentaCantidad").val();
    var precio = $("#txtVentaPrecio").val();
    var subImporte = $("#txtVentaImporte").val();
    let codFormatoProducto = _codProducto;
    var codProducto = ('000' + codFormatoProducto).slice(-4);

    //contador
    var count = $('#TablaConceptoVentaCab tbody tr').length + 1;

    //agregando en el array
    var oProducto = {
        "Id": "0",
        "Nro": count,
        "VentaId": ventaId,
        "ProductoId": productoId,
        "Producto": producto,
        "UsuarioId": usuario,
        "Cantidad": cantidad,
        "PrecioUnitario": precio,
        "Importe": _importeProducto
    }
    _arrayProducto.push(oProducto);

    //total
    _totalVenta = parseFloat(_totalVenta) + parseFloat(_importeProducto);

    //cantidad
    _cantidad = _cantidad + cantidad; 

    //agregando en la tabla
    var filaTabla = '<tr id= "' + _codProducto + '" data-cantidad = "' + cantidad + '" data-importe = "' + _importeProducto + '" data-numero ="' + count + '">'
        + '<td>' + count + '</td>'
        + '<td>' + producto + '</td>'
        + '<td>' + codProducto + '</td>'
        + '<td>' + cantidad + '</td>'
        + '<td>' + CurrencyFormatTabla(precio) + '</td>'
        + '<td>' + subImporte + '</td>';

    var columnaAcciones = '<td><a name="btnEliminar" class="btn btn-danger mr-1 ml-1" href="#" onclick="EliminarVenta(' + count + ')" title ="Eliminar"><i class="fa fa-trash-o"></i></a></td>';
    filaTabla = filaTabla + columnaAcciones + "</tr>";

    //asignacion
    $('#TablaConceptoVentaCab tbody').append(filaTabla);
    CurrencyFormat("txtVentaTotal", _totalVenta);
    $('#txtVentaStock').val(cantidad);

    //formato
    LimpiarProducto();

    //stock
    ActualizarStock(_codProducto,cantidad,"restar");
}

function ActualizarStock(pIdProducto,pCantidad,pAccion) {

    var oData = {
        DtoStock: {
            "Id": pIdProducto,
            "Stock": pCantidad,
            "Accion": pAccion
        }
    }

    $.ajax({
        url: '/Venta/ActualizarStock',
        data: oData,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log("Respuesta desde el web api.");
            console.log(data)
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

function GuardarVenta() {
    debugger;
    var pEntidad = {
        DtoVenta: {
            "Id": $("#txtVentaId").val().trim(),
            "Total": _totalVenta,
            "Fecha": ObtenerFecha(),
            "ClienteId": $("#cboVentaClienteId").val(),
            DtoConceptoVenta : _arrayProducto
        }
    };

    console.log(pEntidad);

    $.ajax({
        url: '/Venta/GuardarVenta',
        data: pEntidad,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log("Respuesta desde el web api.");
            console.log(data);

            StateButton("cargar");
            HabilitarDeshabilitarControles(true);
            LimpiarControles();

            $('#TablaConceptoVentaCab tbody').html('');
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

function GuardarGenerarVenta() {
    var pEntidad = {
        DtoVenta: {
            "Id": $("#txtVentaId").val().trim(),
            "Total": _totalVenta,
            "Fecha": ObtenerFecha(),
            "ClienteId": $("#cboVentaClienteId").val(),
            DtoConceptoVenta: _arrayProducto
        }
    };

    $.ajax({
        url: '/Venta/GuardarGenerarVenta',
        data: pEntidad,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            
            StateButton("cargar");
            HabilitarDeshabilitarControles(true);
            LimpiarControles();
            $('#TablaConceptoVentaCab tbody').html('');

            var objJson = jQuery.parseJSON(data);

            if (objJson.Entity !== null) {
                window.location.href = "/Root/Report/VentaGenerada.aspx?id=" + objJson.Entity.Id;
            }
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

function ValidarConceptoVenta() {
    var IsValid;

    if (isSelected(cboVentaProductoId, "Seleccione un producto.", msg_cboVentaProductoId) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isSelected(cboVentaClienteId, "Seleccione un cliente.", msg_cboVentaClienteId) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmptyInt(txtVentaCantidad, "Ingrese cantidad.", msg_txtVentaCantidad) === false) {
        RestablecerBadges(2, 2);
        IsValid = false;

    } else if (isNotEmpty(txtVentaCantidad, "Ingrese cantidad.", msg_txtVentaCantidad) === false){
        RestablecerBadges(2, 2);
        IsValid = false;

    }else {
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


function LimpiarProducto() {
    $('#txtVentaId').val("0");
    $('#cboVentaProductoId').val("0");
    $('#txtVentaPrecio').val("0");
    $('#txtVentaStock').val("0");
    $('#txtVentaCantidad').val("0");
    $('#txtVentaImporte').val("S/0.00");
}

function LimpiarControles() {
    $('#txtVentaId').val("0");
    $('#cboVentaProductoId').val("0");
    $('#cboVentaClienteId').val("0");
    $('#txtVentaPrecio').val("0");
    $('#txtVentaStock').val("0");
    $('#txtVentaCantidad').val("0");
    $('#txtVentaImporte').val("S/0.00");
    $('#txtVentaTotal').val("S/0.00");
    $('#txtVentaFecha').val("");
}

function HabilitarDeshabilitarControles(estado) {
    $('#cboVentaProductoId').prop("disabled", estado);
    $('#cboVentaClienteId').prop("disabled", estado);
    $('#txtVentaCantidad').prop("disabled", estado);
    $('#btnAgregarProducto').prop("disabled", estado);
}