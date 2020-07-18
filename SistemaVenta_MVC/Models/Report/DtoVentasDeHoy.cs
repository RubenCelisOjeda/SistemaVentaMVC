using System;

namespace SistemaVenta_MVC.Models.Report
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoVentasDeHoy
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoVentasDeHoy()
        {
            this.Id = 0;
            this.NombreCliente = string.Empty;
            this.ApellidosCliente = string.Empty;
            this.Dni = string.Empty;
            this.Total = 0.00m;
            this.FechaVenta = null;
            this.Producto = string.Empty;
            this.Cantidad = 0;
            this.PrecioUnitario = 0.00m;
            this.Importe = 0.00m;
        }

        /// <summary>
        /// Propiedades
        /// </summary>

        //Cliente
        public int Id { get; set; }
        public string NombreCliente { get; set; }
        public string ApellidosCliente { get; set; }
        public string Dni { get; set; }

        //Venta
        public decimal? Total { get; set; }
        public DateTime? FechaVenta { get; set; }

        //ConceptoVenta
        public string Producto { get; set; }
        public int? Cantidad { get; set; }
        public decimal? PrecioUnitario { get; set; }
        public decimal? Importe { get; set; }
    }
}