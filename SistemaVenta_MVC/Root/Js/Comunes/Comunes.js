
$(document).ready(function () {

});

/**
 * /Funcion que carga un combobox mediante un ws
 * @param {any} pUrlSericio Url del Servicio rest del cual se obtendrá el datasource.
 * @param {any} pNombreCombo Nombre del combobox al cual se incrustarán los datos.
 * @param {any} pParametros Parámetros que se enviarán al Servicio rest para cargar el combo, por defecto es Null
 */
function ListarComboGenerico(pUrlSericio, pNombreCombo, pParametros) {

    var oData;
    if (pParametros === undefined || pParametros === null) {
        oData = {};
    }

    $.ajax({
        url: pUrlSericio,
        data: oData,
        method: 'GET',
        dataType: 'json',
        //contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var objData = jQuery.parseJSON(response);

            if (objData.CodigoError === 0 && objData.CantidadElementos > 0) {
                for (var i = 0; i < objData.Lista.length; i++) {
                    var fila = '<option value="' + objData.Lista[i].Id + '">' + objData.Lista[i].Etiqueta + '</option>';
                    $('#' + pNombreCombo).append(fila);
                }
            }
        },
        failure: function (msg) {
            console.log("FAILURE");
            console.log(msg);
        },
        error: function () {
            console.log("ERROR");
        },
        complete: function () {
            console.log("COMPLETE:");
        }
    });
}

/**
 * / Función que posiciona el tab segun el índice enviado por el botón (paso1, paso2, etc...)
 * @param {any} index Indica en que tab se posicionará y visualizará.
 * @param {any} nroTabs Número de Tabs que contiene el control.
 */
function RestablecerBadges(index, nroTabs) {
    for (var i = 1; i <= nroTabs; i++) {
        $("#badge" + i).removeClass("badge-info");
        $("#badge" + i).addClass("badge-secondary");

        $("#datos" + i + "-tab").removeClass("active");
        $("#datos" + i).removeClass("active");
    }
    $("#badge" + index).addClass("badge-info");

    $("#datos" + index + "-tab").addClass("active");
    $("#datos" + index).addClass("active show");
}

/**
 * /Funcion que permite obtener la fecha actual
 */
function ObtenerFecha() {

    var date = new Date();
    var day = date.getDate();       // yields date
    var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear();  // yields year
    var hour = date.getHours();     // yields hours 
    var minute = date.getMinutes(); // yields minutes
    var second = date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;

    return time;
}

function CurrencyFormat(pInput, pValor) {

    
    var numSoles = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
  
    var monto = numSoles.format(pValor);
    var idValor = "#" + pInput;
    var total = "S/" + monto.substr(1);
    if (total === "S/$0.00") total = "S/0.00";
    $(idValor).val(total);
}

function CurrencyFormatInt(pInput, pValor) {
    var numSoles = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    })

    var monto = numSoles.format(pValor);
    var idValor = "#" + pInput;
    $(idValor).val(monto.substr(1))
}


function CurrencyFormatTabla(pValor) {
    var numSoles = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    })

    var monto = numSoles.format(pValor);
    return "S/" + monto.substr(1)
}


/**
 * / Función que permite dar el formato de moneda
 * @param isValid Valida el parametro
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 * @param inputElm Id del elemento validado
 */
function postValidate(isValid, errMsg, errElm, inputElm) {
    if (!isValid) {
        // Show errMsg on errElm, if provided.
        if (errElm !== undefined && errElm !== null
            && errMsg !== undefined && errMsg !== null) {
            errElm.innerHTML = errMsg;
        }
        // Set focus on Input Element for correcting error, if provided.
        if (inputElm !== undefined && inputElm !== null) {
            inputElm.classList.add("errorBox");
            inputElm.focus();
        }
    } else {
        // Clear previous error message on errElm, if provided.
        if (errElm !== undefined && errElm !== null) {
            errElm.innerHTML = "";
        }
        if (inputElm !== undefined && inputElm !== null) {
            inputElm.classList.remove("errorBox");
        }
    }
}


/**
 * Función que permite validar si esta vacio
 * @param inputElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isNotEmpty(inputElm, errMsg, errElm) {
    var isValid = inputElm.value.trim() !== "";
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar si tiene un cero
 * @param inputElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isNotEmptyInt(inputElm, errMsg, errElm) {
    var isValid = inputElm.value.trim() !== "0";
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar si es numerico
 * @param inputElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isNumeric(inputElm, errMsg, errElm) {
    var isValid = inputElm.value.trim().match(/^\d+$/ !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar si tiene numeros
 * @param inputElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isAlphabetic(inputElm, errMsg, errElm) {
    var isValid = inputElm.value.trim().match(/^[a-zA-Z]+$/) !== null;
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar si tiene letras
 * @param inputElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isAlphanumeric(inputElm, errMsg, errElm) {
    var isValid = inputElm.value.trim().match(/^[0-9a-zA-Z]+$/) !== null;
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar el minimo y maximo del valor
 * @param inputElm Valida el elemento
 * @param minLength Valor minimo en el elemento
 * @param maxLength Valor maximo en el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isLengthMinMax(inputElm, minLength, maxLength, errMsg, errElm) {
    var inputValue = inputElm.value.trim();
    var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar si es email
 * @param inputElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isValidEmail(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim().match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

/**
 * Función que permite validar si esta seleccionado
 * @param selectElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isSelected(selectElm, errMsg, errElm) {

    // You need to set the default value of <select>'s <option> to "".
    var isValid = selectElm.value !== "0";   // value in selected <option>
    postValidate(isValid, errMsg, errElm, selectElm);
    return isValid;
}

/**
 * Función que permite validar si no esta seleccionado
 * @param selectElm Valida el elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isNoSelected(selectElm, errMsg, errElm) {
    var isValid = selectElm.value !== "-1";
    postValidate(isValid, errMsg, errElm, selectElm);
    return isValid;
}

/**
 * Función que permite validar si selecciono el check
 * @param inputName Nombre del elemento
 * @param errMsg Mensaje de error o validez del mismo
 * @param errElm Indica donde sera mostrato el error
 */
function isChecked(inputName, errMsg, errElm) {

    if ($("#" + inputName).is(":checked")) check = true;
    else check = false;

    var isChecked = false;
    isChecked = check
   
    postValidate(isChecked, errMsg, errElm, null);  // no focus element
    return isChecked;
}


/**
 Función que permite limpiar los mensajes de las validaciones
 */
function clearForm() {
    // Remove class "errorBox" from input elements
    var elms = document.querySelectorAll('.errorBox');
    for (var i = 0; i < elms.length; i++) {
        elms[i].classList.remove("errorBox");
    }

    // Remove previous error messages
    elms = document.querySelectorAll('[id$="Error"]');
    for (var i = 0; i < elms.length; i++) {
        elms[i].innerHTML = "";
    }

    // Set initial focus
    document.getElementById("txtName").focus();
}

/**
 * / Función que permite cambiar de estado a los botones segun la accion
 * @param estado Accion del boton
 */
function StateButton(estado) {
    switch (estado) {

        case "cargar":
            $('#btnNuevo').prop("disabled", false);
            $('#btnGuardarVenta').prop("disabled", true);
            $('#btnGenerarVenta').prop("disabled", true);
            $('#btnCancelar').prop("disabled", true);
            $('#btnGuardar').prop("disabled", true);
            break;

        case "nuevo":
            $('#btnNuevo').prop("disabled", true);
            $('#btnGuardarVenta').prop("disabled", false);
            $('#btnGenerarVenta').prop("disabled", false);
            $('#btnCancelar').prop("disabled", false);
            $('#btnGuardar').prop("disabled", false);
            break;

        case "guardar":
            $('#btnNuevo').prop("disabled", false);
            $('#btnGuardar').prop("disabled", true);
            $('#btnCancelar').prop("disabled", true);
            break;

        case "cancelar":
            $('#btnNuevo').prop("disabled", false);
            $('#btnGuardarVenta').prop("disabled", true);
            $('#btnGenerarVenta').prop("disabled", true);
            $('#btnCancelar').prop("disabled", true);
            $('#btnGuardar').prop("disabled", false);
            break;

        case "editar":
            $('#btnNuevo').prop("disabled", true);
            $('#btnGuardar').prop("disabled", false);
            $('#btnCancelar').prop("disabled", false);
            break;

        case "editarVenta":
            $('#btnGuardar').prop("disabled", false);
            $('#btnImprimirVenta').prop("disabled", true);
            $('#btnCancelar').prop("disabled", false);
            break;

        case "consultar":
            $('#btnNuevo').prop("disabled", false);
            $('#btnGuardar').prop("disabled", true);
            $('#btnCancelar').prop("disabled", true);
            break;

        case "cargarVenta":
            $('#btnGuardar').prop("disabled", true);
            $('#btnImprimirVenta').prop("disabled", true);
            $('#btnCancelar').prop("disabled", true);
            break;

        case "consultarVenta":
            $('#btnGuardar').prop("disabled", true);
            $('#btnImprimirVenta').prop("disabled", false);
            $('#btnCancelar').prop("disabled", true);
            break;

        case "datosClick":
            $('#btnGuardar').prop("disabled", true);
            $('#btnImprimirVenta').prop("disabled", true);
            $('#btnCancelar').prop("disabled", true);
            break;

        default:
            break;
    }
}