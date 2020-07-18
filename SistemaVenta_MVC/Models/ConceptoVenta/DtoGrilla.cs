using System;

namespace SistemaVenta_MVC.Models.ConceptoVenta
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoGrilla
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoGrilla()
        {
            this.Id = 0;
            this.Producto = string.Empty;
            this.Cantidad = 0;
            this.PrecioUnitario = 0;
            this.Importe = 0;
            this.TotalConveptoVenta = 0;
            this.FechaVenta = DateTime.Now;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Producto { get; set; }
        public int? Cantidad { get; set; }
        public decimal? PrecioUnitario { get; set; }
        public decimal? Importe { get; set; }
        public decimal? TotalConveptoVenta { get; set; }
        public DateTime FechaVenta { get; set; }
    }
}