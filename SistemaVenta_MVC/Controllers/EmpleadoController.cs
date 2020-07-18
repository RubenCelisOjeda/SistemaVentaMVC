using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Empleado;
using SistemaVenta_MVC.Utils;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Controllers
{
    public class EmpleadoController : Controller
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
            var urlClient = string.Format("/Api/Empleados/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista;

            return Json(new { data = responseClient }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Get /Id
        [HttpGet]
        public JsonResult ObtenerEmpleadoById(int pId)
        {
            var urlClient = string.Format("/Api/Empleados/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoEmpleado>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Get / Nombre
        [HttpGet]
        public JsonResult ListaEmpleadoByNombre(string pNombre)
        {
            var urlClient = string.Format("/Api/Empleados/Filtro/{0}", pNombre);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Post
        [HttpPost]
        public JsonResult GuardarEmpleado(SistemaVenta_MVC.Models.Empleado.Modelo pEntidad)
        {
            var urlClient = string.Format("/Api/Empleados");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoEmpleado>>(urlClient, pEntidad.DtoEmpleado);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Delete
        [HttpPost]
        public JsonResult EliminarEmpleado(int pId)
        {
            var urlClient = string.Format("/Api/Empleados/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.DeleteAsync<Respuesta<DtoEmpleado>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region ListarComboEstadoCivil
        [HttpGet]
        public JsonResult ListarComboEstadoCivil()
        {
            Utils.Util util = new Utils.Util();
            var combo = util.ListarComboGenerico(0, Utils.Constantes.GrupoParametros.EstadoCivil, true);
            return (Json(JsonConvert.SerializeObject(combo), JsonRequestBehavior.AllowGet));
        }
        #endregion
    }
}