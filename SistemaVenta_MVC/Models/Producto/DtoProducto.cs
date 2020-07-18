namespace SistemaVenta_MVC.Models.Producto
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoProducto
    {

        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoProducto()
        {
            this.Id = 0;
            this.Nombre = string.Empty;
            this.Precio = 0;
            this.Costo = 0;
            this.Stock = 0;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Nombre { get; set; }
        public decimal? Precio { get; set; }
        public decimal? Costo { get; set; }
        public int? Stock { get; set; }
    }
}