using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Usuario;
using SistemaVenta_MVC.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SistemaVenta_MVC.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(DtoUsuarioRequest pEntidad)
        {
            var urlClient = string.Format("api/Usuarios/Validar");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<RespuestaLogin<DtoUsuarioResponse>>(urlClient, pEntidad);

            if (responseClient.Count != 0)
            {
                this.Session["IdUser"] = responseClient.Dto.Id;
                this.Session["TokenUser"] = Guid.NewGuid().ToString();
                this.Session["UserName"] = responseClient.Dto.Usuario;
                this.Session["Rol"] = responseClient.Dto.Rol;
                this.Session["Status"] = responseClient.Dto.Status;
                this.Session["Email"] = responseClient.Dto.Email;

                FormsAuthentication.SetAuthCookie(this.Session["TokenUser"].ToString(), true);
            }
            return Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet);
        }
    }
}