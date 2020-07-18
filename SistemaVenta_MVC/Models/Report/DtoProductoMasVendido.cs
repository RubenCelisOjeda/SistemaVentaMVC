namespace SistemaVenta_MVC.Models.Report
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoProductoMasVendido
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoProductoMasVendido()
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