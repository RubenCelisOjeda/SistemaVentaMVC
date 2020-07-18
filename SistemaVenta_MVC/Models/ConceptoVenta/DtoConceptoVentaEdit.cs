namespace SistemaVenta_MVC.Models.ConceptoVenta
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoConceptoVentaEdit
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoConceptoVentaEdit()
        {
            this.Id = 0;
            this.ProductoId = 0;
            this.ClienteId = 0;
            this.PrecioUnitario = 0.00m;
            this.Cantidad = 0;
            this.Importe = 0.00m;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int? Id { get; set; }
        public int? ProductoId { get; set; }
        public int? ClienteId { get; set; }
        public decimal? PrecioUnitario { get; set; }
        public int? Cantidad { get; set; }
        public decimal? Importe { get; set; }
    }
}