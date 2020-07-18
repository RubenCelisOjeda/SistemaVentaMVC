using Newtonsoft.Json;
using SistemaVenta_MVC.Models.ConceptoVenta;
using SistemaVenta_MVC.Utils;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Controllers
{
    public class ConceptoVentaController : Controller
    {

        #region Get
        [HttpGet]
        public ActionResult Index()
        {
            SistemaVenta_MVC.Models.ConceptoVenta.Modelo oModel = new SistemaVenta_MVC.Models.ConceptoVenta.Modelo();

            var urlClient = string.Format("/Api/ConceptoVentas/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            oModel.ListaConceptoVentas = responseClient.Lista;
            return View(oModel);
        }
        #endregion

        #region Get /Id
        [HttpGet]
        public JsonResult ObtenerConceptoVentaById(int pId)
        {
            var urlClient = string.Format("/Api/ConceptoVentas/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoConceptoVenta>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Get / Nombre
        [HttpGet]
        public JsonResult ListaConceptoVentaByNombre(string pNombre)
        {
            var urlClient = string.Format("/Api/ConceptoVentas/Filtro/{0}", pNombre);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region Post
        [HttpPost]
        public JsonResult GuardarConceptoVenta(SistemaVenta_MVC.Models.ConceptoVenta.Modelo pEntidad)
        {
            pEntidad.DtoConceptoVenta.UsuarioId = (int)this.Session["IdUser"];
           
            var urlClient = string.Format("/Api/ConceptoVentas");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoConceptoVenta>>(urlClient, pEntidad.DtoConceptoVenta);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Delete
        [HttpPost]
        public JsonResult EliminarConceptoVenta(int pId)
        {
            var urlClient = string.Format("/Api/ConceptoVentas/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.DeleteAsync<Respuesta<DtoConceptoVenta>>(urlClient);

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

        #region ListarComboProducto
        [HttpGet]
        public JsonResult ListarComboProducto()
        {
            Models.Resultado.Respuesta<Models.Resultado.Combo> Combo = null;

            var urlClient = string.Format("/Api/Productos/Combo");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.Producto.DtoCombo>>(urlClient);

            foreach (var item in responseClient.Lista)
            {
                Combo.Lista.Add(new Models.Resultado.Combo { Id = item.Id, Etiqueta = item.Producto });
            }

            Combo = new Models.Resultado.Respuesta<Models.Resultado.Combo>
            {
                CantidadElementos = Combo.Lista.Count,
                CodigoError = 0,
                Mensaje = "Combo de productos."
            };
            return (Json(JsonConvert.SerializeObject(Combo)));
        }
        #endregion
    }
}