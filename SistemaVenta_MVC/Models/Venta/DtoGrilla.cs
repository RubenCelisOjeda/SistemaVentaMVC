using SistemaVenta_MVC.Models.ConceptoVenta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Models.Venta
{
    public class DtoGrilla
    {
        public int Id { get; set; }
        public decimal? Total { get; set; }
        public string Fecha { get; set; }
        public string Cliente { get; set; }
        public string Empleado { get; set; }

        public virtual IList<DtoConceptoVenta> DtoConceptoVenta { get;  set; }
    }
}