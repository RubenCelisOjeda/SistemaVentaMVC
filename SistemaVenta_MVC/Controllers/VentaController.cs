using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Venta;
using SistemaVenta_MVC.Utils;
using System;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Controllers
{
    public class VentaController : Controller
    {
        #region Get
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region Nueva 
        [HttpGet]  
        public ActionResult Nueva()
        {
            return View();
        }
        #endregion

        #region Listado de ventas
        [HttpGet]
        public JsonResult Get()
        {
            var urlClient = string.Format("/Api/Ventas/");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient).Lista;

            return Json(new { data = responseClient }, JsonRequestBehavior.AllowGet);
        } 
        #endregion

        #region Get Concepto /IdVenta
        [HttpGet]
        public JsonResult ObtenerConceptoVentaById(int pId)
        {
            var urlClient = string.Format("/Api/ConceptoVentas/{0}",pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.ConceptoVenta.DtoConceptoVentaEdit>>(urlClient);

            return Json(JsonConvert.SerializeObject(responseClient),JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Get Concepto Detalle /IdVenta
        [HttpGet]
        public JsonResult ObtenerConceptoDetalleVenta(int pId)
        {
            var urlClient = string.Format("/Api/ConceptoVentas/Detalle/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.ConceptoVenta.DtoConceptoVentaDetails>>(urlClient).Lista;

            return Json(new { data = responseClient }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Get / Nombre
        [HttpGet]
        public JsonResult ListaVentaByNombre(string pNombre)
        {
            var urlClient = string.Format("/Api/Ventas/Filtro/{0}", pNombre);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoGrilla>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }    
        #endregion

        #region Post
        [HttpPost]
        public JsonResult GuardarVenta(SistemaVenta_MVC.Models.Venta.Modelo pEntidad)
        {
            foreach (var item in pEntidad.DtoVenta.DtoConceptoVenta)
            {
                item.UsuarioId = (int)this.Session["IdUser"];
                pEntidad.DtoVenta.Fecha = DateTime.Now;
            }
            var urlClient = string.Format("/Api/Ventas");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoVenta>>(urlClient, pEntidad.DtoVenta);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region PostGenerarVenta
        [HttpPost]
        public JsonResult GuardarGenerarVenta(SistemaVenta_MVC.Models.Venta.Modelo pEntidad)
        {
            foreach (var item in pEntidad.DtoVenta.DtoConceptoVenta)
            {
                item.UsuarioId = (int)this.Session["IdUser"];
                pEntidad.DtoVenta.Fecha = DateTime.Now;
            }
            var urlClient = string.Format("/Api/Ventas");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoVenta>>(urlClient, pEntidad.DtoVenta);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Post
        [HttpPost]
        public JsonResult ActualizarStock(SistemaVenta_MVC.Models.Producto.Modelo pEntidad)
        {
            var urlClient = string.Format("/Api/Productos/ActulizarStock");
            var restClient = new RestService();
            var responseClient = restClient.PostAsync<Respuesta<DtoVenta>>(urlClient, pEntidad.DtoStock);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region Delete
        [HttpPost]
        public JsonResult EliminarVenta(int pId)
        {
            var urlClient = string.Format("/Api/Ventas/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.DeleteAsync<Respuesta<DtoVenta>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient)));
        }
        #endregion

        #region ListarComboProducto
        [HttpGet]
        public JsonResult ListarComboProducto()
        {
            Models.Resultado.Respuesta<Models.Resultado.Combo> Combo = new Models.Resultado.Respuesta<Models.Resultado.Combo>();

            var urlClient = string.Format("/Api/Productos/Combo");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.Producto.DtoCombo>>(urlClient);

            foreach (var item in responseClient.Lista)
            {
                Combo.Lista.Add(new Models.Resultado.Combo { Id = item.Id, Etiqueta = item.Producto });
            }

            Combo.CantidadElementos = Combo.Lista.Count;
            Combo.CodigoError = 0;
            Combo.Mensaje = "Combo productos";

            return (Json(JsonConvert.SerializeObject(Combo), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region ListarComboCliente
        [HttpGet]
        public JsonResult ListarComboCliente()
        {
            Models.Resultado.Respuesta<Models.Resultado.Combo> Combo = new Models.Resultado.Respuesta<Models.Resultado.Combo>();

            var urlClient = string.Format("/Api/Clientes/Combo");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.Cliente.DtoCombo>>(urlClient);

            foreach (var item in responseClient.Lista)
            {
                Combo.Lista.Add(new Models.Resultado.Combo { Id = item.Id, Etiqueta = item.Cliente });
            }

            Combo.CantidadElementos = Combo.Lista.Count;
            Combo.CodigoError = 0;
            Combo.Mensaje = "Combo productos";

            return (Json(JsonConvert.SerializeObject(Combo), JsonRequestBehavior.AllowGet));
        }
        #endregion

        #region GetProductoPrecio
        [HttpGet]
        public JsonResult GetProductoPrecioStock(int pId)
        {
            var urlClient = string.Format("/Api/Productos/PrecioStock/{0}", pId);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.Producto.DtoPrecioStock>>(urlClient);

            return (Json(JsonConvert.SerializeObject(responseClient), JsonRequestBehavior.AllowGet));
        }
        #endregion
    }
}