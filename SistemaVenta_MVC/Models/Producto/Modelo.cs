using System.Collections.Generic;

namespace SistemaVenta_MVC.Models.Producto
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class Modelo
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public Modelo()
        {
            this.DtoStock = new DtoStock();
            this.DtoProducto = new DtoProducto();
            this.ListaProductos = new List<DtoGrilla>();
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public DtoStock DtoStock { get; set; }
        public DtoProducto DtoProducto { get; set; }
        public IList<DtoGrilla> ListaProductos { get; set; }
    }
}