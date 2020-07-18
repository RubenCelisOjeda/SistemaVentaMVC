namespace SistemaVenta_MVC.Models.ConceptoVenta
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoConceptoVentaDetails
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoConceptoVentaDetails()
        {
            this.Id = 0;
            this.VentaId = 0;
            this.Producto = string.Empty;
            this.Cliente = string.Empty;
            this.PrecioUnitario = 0.00m;
            this.Cantidad = 0;
            this.Importe = 0.00m;
            this.Total = 0.00m;
        }

        /// <summary>
        /// Propiedades
        /// </summary>
        public int Id { get; set; }
        public int? VentaId { get; set; }
        public string Producto { get; set; }
        public string Cliente { get; set; }
        public decimal? PrecioUnitario { get; set; }
        public int? Cantidad { get; set; }
        public decimal? Importe { get; set; }
        public decimal? Total { get; set; }
    }
}