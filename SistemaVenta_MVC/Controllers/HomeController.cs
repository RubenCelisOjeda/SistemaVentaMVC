using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Usuario;
using SistemaVenta_MVC.Utils;
using System;
using System.Web.Mvc;
using System.Web.Security;

namespace SistemaVenta_MVC.Controllers
{
    public class HomeController : Controller
    {
        #region Get
        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.Usuarios = GetUsuarios();
            ViewBag.Empleados = GetEmpleados();
            ViewBag.Clientes = GetClientes();
            ViewBag.Ventas = GetVentas();

            return View(ViewBag);
        }
        #endregion

        #region Get
        [HttpGet]
        public ActionResult MyAccount()
        {
            return View();
        }
        #endregion

        #region Get
        [HttpGet]
        public ActionResult GetAccount()
        {
            Models.Usuario.DtoMyAccount Dto = new Models.Usuario.DtoMyAccount()
            {
                Id = (int)this.Session["IdUser"],
                UserName = (string)this.Session["UserName"], 
                Rol = (string)this.Session["Rol"],
                Status = (string)this.Session["Status"],
                Email = (string)this.Session["Email"]
            };
            var responseClient = Dto;
            return Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Get
        [HttpPost]
        public ActionResult PutAccount(SistemaVenta_MVC.Models.Usuario.DtoAccountRequest pEntidad)
        {
            pEntidad.Id = (int)this.Session["IdUser"];
            var urlClient = string.Format("/Api/Usuarios/PutAccount");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoUsuarioResponse>>(urlClient, pEntidad);

            this.Session["UserName"] = pEntidad.Usuario;
            this.Session["Email"] = pEntidad.Email;

            return Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetUsuarios
        private int GetUsuarios()
        {
            var urlClient = string.Format("/Api/Usuarios/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista.Count;

            return responseClient;
        }
        #endregion

        #region GetEmpleados
        private int GetEmpleados()
        {
            var urlClient = string.Format("/Api/Empleados/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista.Count;

            return responseClient;
        }
        #endregion

        #region GetClientes
        private int GetClientes()
        {
            var urlClient = string.Format("/Api/Clientes/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista.Count;

            return responseClient;
        }
        #endregion

        #region GetVentas
        private int GetVentas()
        {
            var urlClient = string.Format("/Api/Ventas/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista.Count;

            return responseClient;
        } 
        #endregion

        #region Cerrar Sesion 
        [HttpGet]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            this.Session.Abandon();
            this.Session.Clear();
            return RedirectToAction("Login", "Account");
        } 
        #endregion
    }
}