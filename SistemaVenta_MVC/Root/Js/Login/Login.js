$(document).ready(function () {
    $('#loadingVenta').hide();
});

$('#btnLogin').click(function () {
    Login();
});

function Login() {

    var usuario = $('#txtUsuario').val().trim();
    var password = $('#txtPassword').val().trim();

    var pData = {
        pEntidad : {
            "Usuario": usuario,
            "Password": password
        }
    }

    if (usuario === null || usuario === "") {
        $('#lblMsg').addClass("alert alert danger").text("Ingrese usuario.");

    } else if (password === null || password === "") {
        $('#lblMsg').addClass("alert alert danger").text("Ingrese contraseña.");

    } else {
        LoginAjax(pData);
    }
}

function LoginAjax(pData) {
    $('#loadingVenta').show();
    $.ajax({
        url: "/Account/Login",
        data: pData,
        method: "POST",
        type: "json",
        async: true,
        success: function (data) {

            var obj = jQuery.parseJSON(data);
            if (obj.Count === 0) {
                $('#lblMsg').addClass("alert alert-danger").text("Usuario y/o contraseña incorrecta.");
                $('#loadingVenta').hide();
            } else {
                $('#loadingVenta').hide();
                window.location.href = "/Home/Index";
            }
        },
        error: function (error) {
            alert("Error,intente más tarde.");
        }
    });
}