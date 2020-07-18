namespace SistemaVenta_MVC.Models.Producto
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoPrecioStock
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoPrecioStock()
        {
            this.Precio = 0;
            this.Stock = 0;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public decimal? Precio { get; set; }
        public int? Stock { get; set; }
    }
}

