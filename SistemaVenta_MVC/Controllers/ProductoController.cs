using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Producto;
using SistemaVenta_MVC.Utils;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Controllers
{
    public class ProductoController : Controller
    {
        #region Get
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region Listado de productos
        [HttpGet]
        public JsonResult Get()
        {
            var urlClient = string.Format("/Api/Productos/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista;

            return Json(new { data = responseClient }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Get /Id
        [HttpGet]
        public JsonResult ObtenerProductoById(int pId)
        {
            var urlClient = string.Format("/Api/Productos/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoProducto>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Get / Nombre
        [HttpGet]
        public JsonResult ListarProductoByNombre(string pNombre)
        {
            var urlClient = string.Format("/Api/Productos/Filtro/{0}", pNombre);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Post
        [HttpPost]
        public JsonResult GuardarProducto(SistemaVenta_MVC.Models.Producto.Modelo pEntidad)
        {
            var urlClient = string.Format("/Api/Productos");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoProducto>>(urlClient, pEntidad.DtoProducto);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Delete
        [HttpPost]
        public JsonResult EliminarProducto(int pId)
        {
            var urlClient = string.Format("/Api/Productos/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.DeleteAsync<Respuesta<DtoProducto>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion
    }
}