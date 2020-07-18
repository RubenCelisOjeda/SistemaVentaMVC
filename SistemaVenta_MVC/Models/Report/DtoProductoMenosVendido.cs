namespace SistemaVenta_MVC.Models.Report
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoProductoMenosVendido
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoProductoMenosVendido()
        {
            this.Id = 0;
            this.Producto = string.Empty;
            this.TotalCantidad = 0;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int? Id { get; set; }
        public string Producto { get; set; }
        public int? TotalCantidad { get; set; }
    }
}