using System;

namespace SistemaVenta_MVC.Models.Report
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoFilter
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoFilter()
        {
            this.Text = string.Empty;
            this.DateStart = DateTime.Now;
            this.DateEnd = DateTime.Now;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public string Text { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
    }
}