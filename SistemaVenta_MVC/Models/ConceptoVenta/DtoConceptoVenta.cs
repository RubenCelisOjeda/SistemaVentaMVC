namespace SistemaVenta_MVC.Models.ConceptoVenta
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoConceptoVenta
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoConceptoVenta()
        {
            this.Id = 0;
            this.VentaId = 0;
            this.ProductoId = 0;
            this.UsuarioId = 0;
            this.Cantidad = 0;
            this.PrecioUnitario = 0.00m;
            this.Importe = 0.00m;
        }

        /// <summary>
        /// Propiedades
        /// </summary>
        public int Id { get; set; }
        public int? VentaId { get; set; }
        public int? ProductoId { get; set; }
        public int? UsuarioId { get; set; }
        public int? Cantidad { get; set; }
        public decimal? PrecioUnitario { get; set; }
        public decimal? Importe { get; set; }
    }
}