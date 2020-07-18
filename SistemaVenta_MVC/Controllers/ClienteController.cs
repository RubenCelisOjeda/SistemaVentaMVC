using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Cliente;
using SistemaVenta_MVC.Utils;
using System.Web.Mvc;
using System.Web.UI;

namespace SistemaVenta_MVC.Controllers
{
    public class ClienteController : Controller
    {
        #region Get
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region Get
        [HttpGet]
        public ActionResult Get()
        {
            var urlClient = string.Format("/Api/Clientes/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista;

            return Json(new { data = responseClient }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetReniecCliente
        [HttpGet]
        public ActionResult GetReniecCliente(int pDni)
        {
            var restClient = new RestServiceReniec();
            var responseClient = restClient.GetAsync(pDni);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        } 
        #endregion

        #region Get /Id
        [HttpGet]
        public JsonResult ObtenerClienteById(int pId)
        {
            var urlClient = string.Format("/Api/Clientes/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoCliente>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Get / Nombre
        [HttpGet]
        public JsonResult ListarClienteByNombre(string pNombre)
        {
            var urlClient = string.Format("/Api/Clientes/Filtro/{0}", pNombre);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Post
        [HttpPost]
        public JsonResult GuardarCliente(SistemaVenta_MVC.Models.Cliente.Modelo pEntidad)
        {
            var urlClient = string.Format("/Api/Clientes");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoCliente>>(urlClient, pEntidad.DtoCliente);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Delete
        [HttpPost]
        public JsonResult EliminarCliente(int pId)
        {
            var urlClient = string.Format("/Api/Clientes/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.DeleteAsync<Respuesta<DtoCliente>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion
    }
}