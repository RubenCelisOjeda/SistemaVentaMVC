using SistemaVenta_MVC.Models.ConceptoVenta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Models.Venta
{
    public class DtoVenta
    {
        public DtoVenta()
        {
            this.DtoConceptoVenta = new List<DtoConceptoVenta>();
        }

        public int Id { get; set; }
        public decimal? Total { get; set; }
        public DateTime? Fecha { get; set; }
        public int? ClienteId { get; set; }

        public virtual IList<DtoConceptoVenta> DtoConceptoVenta { get; set; }
    }
}