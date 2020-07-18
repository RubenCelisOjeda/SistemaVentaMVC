using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Usuario;
using SistemaVenta_MVC.Utils;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Controllers
{
    public class UsuarioController : Controller
    {
        #region Get
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region Listado de usuarios
        [HttpGet]
        public JsonResult Get()
        {
            var urlClient = string.Format("/Api/Usuarios/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista;

            return Json(new { data = responseClient }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Get /Id
        [HttpGet]
        public JsonResult ObtenerUsuarioById(int pId)
        {
            var urlClient = string.Format("/Api/Usuarios/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoUsuario>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient),JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Get / Nombre
        [HttpGet]
        public JsonResult ListaUsuarioByNombre(string pNombre)
        {
            var urlClient = string.Format("/Api/Usuarios/Filtro/{0}", pNombre);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient),JsonRequestBehavior.AllowGet));
        }
        #endregion
        
        #region Post
        [HttpPost]
        public JsonResult GuardarUsuario(SistemaVenta_MVC.Models.Usuario.Modelo pEntidad)
        {
            var urlClient = string.Format("/Api/Usuarios");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoUsuario>>(urlClient, pEntidad.DtoUsuario);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Delete
        [HttpPost]
        public JsonResult EliminarUsuario(int pId)
        {
            var urlClient = string.Format("/Api/Usuarios/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.DeleteAsync<Respuesta<DtoUsuario>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region ListarComboRolUsuario
        [HttpGet]
        public JsonResult ListarComboRolUsuario()
        {
            Utils.Util util = new Utils.Util();
            var combo = util.ListarComboGenerico(0, Utils.Constantes.GrupoParametros.RolUsuario, true);
            return (Json(JsonConvert.SerializeObject(combo), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region ListarComboEmpleado
        [HttpGet]
        public JsonResult ListarComboEmpleado(int pIdCombo = 0, int pIdUsuario = 0)
        {
            Models.Resultado.Respuesta<Models.Resultado.Combo> Combo = new Models.Resultado.Respuesta<Models.Resultado.Combo>();

            var urlClient = string.Format("/Api/Empleados/Combo/{0}/{1}", pIdCombo, pIdUsuario);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.Empleado.DtoCombo>>(urlClient);

            if (responseClient.Lista != null)
            {
                foreach (var item in responseClient.Lista)
                {
                    Combo.Lista.Add(new Models.Resultado.Combo { Id = item.Id, Etiqueta = item.Empleado });
                }

                Combo.CantidadElementos = Combo.Lista.Count;
                Combo.CodigoError = 0;
                Combo.Mensaje = "Combo empleados";
            }

            return (Json(JsonConvert.SerializeObject(Combo), JsonRequestBehavior.AllowGet));
        }
        #endregion
    }
}